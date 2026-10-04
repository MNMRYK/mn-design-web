import { useEffect, useRef, useState } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './Grainient.css';
import { puedeUsarEfectoWebGL } from '../utils/capacidadGrafica';

// Rendimiento: el fondo es un degradado suave, así que se dibuja a menos resolución que la
// pantalla (el CSS lo escala) y a 30 fps; el resultado se ve igual y cuesta mucho menos.
const RESOLUCION = 0.5; // píxeles del canvas por píxel CSS (nunca más de 1, aunque la pantalla sea retina)
const FPS = 30;

const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);} 
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);} 
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);

  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;

  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);

  vec3 colLav=uColor1;
  vec3 colOrg=uColor2;
  vec3 colDark=uColor3;
  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  mat2 blendRot=Rot(radians(uBlendAngle));
  float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  float v0=0.5-b+s;
  float v1=-0.3-b-s;
  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));
  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));
  vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));

  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);} 
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;

  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  col=clamp(col,0.0,1.0);

  o=vec4(col,1.0);
}
void main(){
  vec4 o=vec4(0.0);
  mainImage(o,gl_FragCoord.xy);
  fragColor=o;
}
`;

const Grainient = ({
  timeSpeed = 2,
  colorBalance = 0.0,
  warpStrength = 1.0,
  warpFrequency = 5.0,
  warpSpeed = 2.0,
  warpAmplitude = 50.0,
  blendAngle = 0.0,
  blendSoftness = 0.05,
  rotationAmount = 500.0,
  noiseScale = 2.0,
  grainAmount = 0.06,
  grainScale = 2.0,
  grainAnimated = false,
  contrast = 1.5,
  gamma = 1.0,
  saturation = 1.0,
  centerX = 0.0,
  centerY = 0.0,
  zoom = 0.9,
  color1 = '#d7acfa',
  color2 = '#4f2477',
  color3 = '#8a6fe0',
  className = ''
}) => {
  const containerRef = useRef(null);
  // "estatico": solo el degradado CSS del contenedor (Grainient.css), sin WebGL
  const [modo, setModo] = useState(() => (puedeUsarEfectoWebGL(2) ? 'webgl' : 'estatico'));

  useEffect(() => {
    const container = containerRef.current;
    if (!container || modo !== 'webgl') return;

    let renderer = null;
    let gl = null;
    let canvas = null;
    let raf = 0;
    let terminado = false;

    const liberar = () => {
      terminado = true;
      cancelAnimationFrame(raf);
      if (gl) {
        try {
          gl.getExtension('WEBGL_lose_context')?.loseContext();
        } catch {
          // El contexto ya estaba perdido
        }
      }
      if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };

    // Cualquier fallo: degradado estático, sin errores y sin tumbar la página
    const pasarAEstatico = () => {
      liberar();
      setModo('estatico');
    };

    let program;
    let mesh;
    try {
      canvas = document.createElement('canvas');
      renderer = new Renderer({
        canvas,
        webgl: 2,
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
        dpr: Math.min(window.devicePixelRatio || 1, 1) * RESOLUCION
      });
      gl = renderer.gl;
      // ogl recurre a WebGL 1 si no hay WebGL 2, pero este shader necesita WebGL 2
      if (!gl || !renderer.isWebgl2) throw new Error('WebGL 2 no disponible');

      const geometry = new Triangle(gl);
      program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new Float32Array([1, 1]) },
          uTimeSpeed: { value: timeSpeed },
          uColorBalance: { value: colorBalance },
          uWarpStrength: { value: warpStrength },
          uWarpFrequency: { value: warpFrequency },
          uWarpSpeed: { value: warpSpeed },
          uWarpAmplitude: { value: warpAmplitude },
          uBlendAngle: { value: blendAngle },
          uBlendSoftness: { value: blendSoftness },
          uRotationAmount: { value: rotationAmount },
          uNoiseScale: { value: noiseScale },
          // A media resolución el grano del shader saldría grueso: lo pone el CSS (::after), fino
          uGrainAmount: { value: RESOLUCION < 1 ? 0 : grainAmount },
          uGrainScale: { value: grainScale },
          uGrainAnimated: { value: grainAnimated ? 1.0 : 0.0 },
          uContrast: { value: contrast },
          uGamma: { value: gamma },
          uSaturation: { value: saturation },
          uCenterOffset: { value: new Float32Array([centerX, centerY]) },
          uZoom: { value: zoom },
          uColor1: { value: new Float32Array(hexToRgb(color1)) },
          uColor2: { value: new Float32Array(hexToRgb(color2)) },
          uColor3: { value: new Float32Array(hexToRgb(color3)) }
        }
      });
      if (!gl.getProgramParameter(program.program, gl.LINK_STATUS)) {
        throw new Error('El shader no compila en este dispositivo');
      }
      mesh = new Mesh(gl, { geometry, program });
    } catch (error) {
      console.warn('[Grainient] WebGL no disponible, se usa el fondo estático:', error.message);
      pasarAEstatico();
      return;
    }

    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    // Si el navegador retira el contexto (poca memoria, demasiadas pestañas...), degradado
    const alPerderContexto = () => pasarAEstatico();
    canvas.addEventListener('webglcontextlost', alPerderContexto);

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(Math.max(1, Math.floor(rect.width)), Math.max(1, Math.floor(rect.height)));
      const res = program.uniforms.iResolution.value;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;
    };
    const ro = new ResizeObserver(setSize);
    ro.observe(container);
    setSize();

    // Solo se anima si se ve: en pantalla y con la pestaña visible
    let enPantalla = true;
    let tiempo = 0; // segundos de animación acumulados (sin saltos al reanudar)
    let anterior = 0;
    let acumulado = 0;
    const intervalo = 1000 / FPS;

    const frame = t => {
      if (terminado) return;
      raf = requestAnimationFrame(frame);
      const dt = anterior ? Math.min(t - anterior, 100) : 0;
      anterior = t;
      acumulado += dt;
      // Margen de 2 ms: a 60 Hz, dos fotogramas (33,3 ms) bastan para un fotograma a 30 fps
      if (acumulado < intervalo - 2 && dt !== 0) return;
      tiempo += acumulado * 0.001;
      acumulado = 0;
      program.uniforms.iTime.value = tiempo;
      renderer.render({ scene: mesh });
    };

    const actualizar = () => {
      const animar = enPantalla && !document.hidden;
      cancelAnimationFrame(raf);
      raf = 0;
      if (animar && !terminado) {
        anterior = 0;
        raf = requestAnimationFrame(frame);
      }
    };

    const io = new IntersectionObserver(entradas => {
      enPantalla = entradas[0].isIntersecting;
      actualizar();
    });
    io.observe(container);
    document.addEventListener('visibilitychange', actualizar);
    actualizar();

    return () => {
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', actualizar);
      canvas.removeEventListener('webglcontextlost', alPerderContexto);
      liberar();
    };
  }, [
    modo,
    timeSpeed,
    colorBalance,
    warpStrength,
    warpFrequency,
    warpSpeed,
    warpAmplitude,
    blendAngle,
    blendSoftness,
    rotationAmount,
    noiseScale,
    grainAmount,
    grainScale,
    grainAnimated,
    contrast,
    gamma,
    saturation,
    centerX,
    centerY,
    zoom,
    color1,
    color2,
    color3
  ]);

  return (
    <div
      ref={containerRef}
      className={['grainient-container', modo === 'estatico' && 'grainient-estatico', className].filter(Boolean).join(' ')}
      aria-hidden="true"
    />
  );
};

export default Grainient;
