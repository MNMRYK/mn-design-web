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
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const cardOffsetsRef = useRef([]); // 🔥 Caché para las posiciones originales
  const lastTransformsRef = useRef(new Map());

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

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length) return;

    const scrollTop = window.scrollY;
    const containerHeight = window.innerHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = document.querySelector('.scroll-stack-end');
    const endElementTop = endElement ? endElement.getBoundingClientRect().top + scrollTop : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      // 🔥 Usamos el offset guardado en el render inicial para evitar la vibración
      const cardTop = cardOffsetsRef.current[i]; 
      
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

      const transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      card.style.transform = transform;
      
      // Aplicar blur solo si es necesario para rendimiento
      if (blurAmount > 0) {
        const blur = scrollTop > triggerStart ? Math.min(blurAmount, (scrollTop - triggerStart) / 100) : 0;
        card.style.filter = blur > 0.1 ? `blur(${blur}px)` : 'none';
      }
    });
  }, [baseScale, itemScale, itemStackDistance, stackPosition, scaleEndPosition, blurAmount, calculateProgress, parsePercentage]);

  useLayoutEffect(() => {
    const cards = Array.from(document.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = cards;
    
    // 🔥 Guardamos la posición REAL inicial de cada carta antes de animar
    cardOffsetsRef.current = cards.map(card => card.getBoundingClientRect().top + window.scrollY);

    const handleScroll = () => {
      animationFrameRef.current = requestAnimationFrame(updateCardTransforms);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateCardTransforms();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [updateCardTransforms]);

  return (
    <div className={`scroll-stack-scroller ${className}`} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" style={{ height: '50px' }} />
      </div>
    </div>
  );
};

export default ScrollStack;