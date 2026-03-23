import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

const vertexShader = `
  varying vec2 vUv;
  varying float vDistortion;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHover;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Distance from mouse in UV space
    float dist = distance(uv, uMouse);
    
    // Ambient wave (subtle digital pulse) - Now tied to uHover
    float ambient = sin(pos.x * 4.0 + uTime * 0.4) * cos(pos.y * 4.0 + uTime * 0.4) * 0.015 * uHover;
    
    // Mouse distortion (soft membrane feel)
    float influence = smoothstep(0.45, 0.0, dist);
    float mouseWave = influence * uHover * 0.12;
    
    // Apply vertical displacement
    pos.z += ambient + mouseWave;
    
    // Horizontal irregularity (not perfectly straight) - Now tied to uHover
    pos.x += sin(pos.y * 12.0 + uTime * 0.15) * 0.003 * uHover;
    pos.y += cos(pos.x * 12.0 + uTime * 0.15) * 0.003 * uHover;
    
    vDistortion = mouseWave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying float vDistortion;
  uniform float uHover;
  uniform vec3 uColor;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    // Technical Grid Logic
    float gridSize = 20.0;
    vec2 uv = vUv * gridSize;
    
    // Anti-aliased lines using fwidth
    vec2 grid = abs(fract(uv - 0.5) - 0.5) / (fwidth(uv) + 0.001);
    float line = min(grid.x, grid.y);
    float gridPattern = 1.0 - smoothstep(0.0, 1.2, line);
    
    // Dark Navy Base (#050515ish)
    vec3 bgColor = vec3(0.02, 0.02, 0.06);
    
    // Subtle Noise Texture
    float noise = (hash(vUv * 1024.0) - 0.5) * 0.04;
    vec3 finalColor = bgColor + noise;
    
    // Base Opacity
    float baseOpacity = 0.12;
    float pulseIntensity = baseOpacity + (vDistortion * 2.5);
    
    // Apply grid
    finalColor = mix(finalColor, uColor, gridPattern * pulseIntensity);
    
    // Peak Distortion Glow
    finalColor += uColor * vDistortion * 0.4;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function InteractiveGrid() {
    const { accentColor } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0.5, y: 0.5, hover: 0 });

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        const container = containerRef.current;
        const canvas = canvasRef.current;

        // Scene Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 1.2;

        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Geometry
        const geometry = new THREE.PlaneGeometry(2, 2, 64, 64);

        // Material
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0.5, 0.5) },
                uHover: { value: 0 },
                uColor: { value: new THREE.Color(accentColor) }
            },
            transparent: true,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Resize Handler
        const handleResize = () => {
            const { width, height } = container.getBoundingClientRect();
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(container);
        handleResize();

        // Mouse Interaction
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1.0 - (e.clientY - rect.top) / rect.height;

            mouseRef.current.x = x;
            mouseRef.current.y = y;
        };

        const handleMouseEnter = () => {
            mouseRef.current.hover = 1;
        };

        const handleMouseLeave = () => {
            mouseRef.current.hover = 0;
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        // Animation Loop
        let animationFrameId: number;
        let currentHover = 0;

        const animate = (time: number) => {
            material.uniforms.uTime.value = time * 0.001;

            // Smoothly interpolate hover state for elasticity
            currentHover += (mouseRef.current.hover - currentHover) * 0.08;
            material.uniforms.uHover.value = currentHover;

            // Interpolate mouse for lag-less but smooth feel
            material.uniforms.uMouse.value.x += (mouseRef.current.x - material.uniforms.uMouse.value.x) * 0.15;
            material.uniforms.uMouse.value.y += (mouseRef.current.y - material.uniforms.uMouse.value.y) * 0.15;
            material.uniforms.uColor.value.set(accentColor);

            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        // Cleanup
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', handleResize);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [accentColor]);

    return (
        <div
            ref={containerRef}
            className="w-full h-full relative overflow-hidden bg-[#020208]/40 rounded-lg border"
            style={{
                aspectRatio: '1/1',
                maxWidth: '100%',
                opacity: 0.25,
                borderColor: 'rgba(var(--color-accent-rgb), 0.1)'
            }}
        >
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* HUD Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l border-t m-2" style={{ borderColor: 'rgba(var(--color-accent-rgb), 0.3)' }} />
            <div className="absolute top-0 right-0 w-4 h-4 border-r border-t m-2" style={{ borderColor: 'rgba(var(--color-accent-rgb), 0.3)' }} />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b m-2" style={{ borderColor: 'rgba(var(--color-accent-rgb), 0.3)' }} />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b m-2" style={{ borderColor: 'rgba(var(--color-accent-rgb), 0.3)' }} />
        </div>
    );
}
