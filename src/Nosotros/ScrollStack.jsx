import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 150,
  itemScale = 0.03,
  itemStackDistance = 20,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.65,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 2,
  useWindowScroll = true,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  // 🔥 NUEVO: Memorias caché para guardar las posiciones y no saturar al móvil
  const cardPositionsRef = useRef([]);
  const endPositionRef = useRef(0);
  
  const initialHeightRef = useRef(typeof window !== 'undefined' ? window.innerHeight : 800);
  const lastWidthRef = useRef(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    return {
      scrollTop: window.scrollY,
      containerHeight: initialHeightRef.current,
    };
  }, []);

  const getElementOffset = useCallback((element) => {
    let top = 0;
    let el = element;
    while (el) {
      top += el.offsetTop;
      el = el.offsetParent;
    }
    return top;
  }, []);

  // 🔥 LA CLAVE DEL ARREGLO: Calculamos esto UNA SOLA VEZ, no 60 veces por segundo
  const calculatePositions = useCallback(() => {
    if (!scrollerRef.current || !cardsRef.current.length) return;

    const endElement = scrollerRef.current.querySelector('.scroll-stack-end');
    endPositionRef.current = endElement ? getElementOffset(endElement) : 0;

    cardPositionsRef.current = cardsRef.current.map(card => getElementOffset(card));
  }, [getElementOffset]);


  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    // Usamos el valor guardado en la memoria
    const endElementTop = endPositionRef.current;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      // 🔥 Usamos la posición guardada, liberando al procesador del móvil
      const cardTop = cardPositionsRef.current[i] || 0; 
      
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 1.5;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = { translateY, scale };
      const lastTransform = lastTransformsRef.current.get(i);

      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.05 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.0005;

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale})`;
        lastTransformsRef.current.set(i, newTransform);
      }
    });

    isUpdatingRef.current = false;
  }, [itemScale, itemStackDistance, stackPosition, scaleEndPosition, baseScale, calculateProgress, parsePercentage, getScrollData]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true,  
      syncTouch: true,    
      touchMultiplier: 1.5, 
      lerp: 0.1,
    });

    lenis.on('scroll', handleScroll);

    const raf = time => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
  }, [handleScroll]);

  useLayoutEffect(() => {
    if (!scrollerRef.current) return;

    const cards = Array.from(scrollerRef.current.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = cards;
    
    cards.forEach((card) => {
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
    });

    // 1. Calculamos las posiciones al cargar la web
    calculatePositions(); 
    setupLenis();
    
    // 2. Volvemos a calcular por si alguna fuente o imagen ha tardado en cargar
    setTimeout(() => {
        calculatePositions();
        updateCardTransforms();
    }, 200);

    const handleResize = () => {
      // 3. Si el usuario gira el móvil, recalculamos las nuevas alturas
      if (window.innerWidth !== lastWidthRef.current) {
        initialHeightRef.current = window.innerHeight;
        lastWidthRef.current = window.innerWidth;
        calculatePositions(); 
        updateCardTransforms();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (lenisRef.current) lenisRef.current.destroy();
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
    };
  }, [setupLenis, updateCardTransforms, calculatePositions]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" style={{ height: '50px' }} />
      </div>
    </div>
  );
};

export default ScrollStack;