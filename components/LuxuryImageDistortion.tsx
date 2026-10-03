"use client";
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function LuxuryImageDistortion({ src, alt }: { src: string, alt?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2, 32, 32);

    let animationFrameId: number;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(src, (texture) => {
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: texture },
          uTime: { value: 0 },
        },
        vertexShader: `
          varying vec2 vUv;
          uniform float uTime;
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(pos.y * 5.0 + uTime) * 0.05;
            pos.x += cos(pos.y * 5.0 + uTime) * 0.05;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform sampler2D uTexture;
          void main() {
            gl_FragColor = texture2D(uTexture, vUv);
          }
        `,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      let time = 0;
      const animate = () => {
        time += 0.01;
        material.uniforms.uTime.value = time;
        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };
      animate();
    });

    const handleResize = () => {
      if (!containerRef.current) return;
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    const cleanupRef = containerRef.current;
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId !== undefined) {
          cancelAnimationFrame(animationFrameId);
      }
      if (cleanupRef) {
        cleanupRef.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [src]);

  return <div ref={containerRef} className="w-full h-full" aria-label={alt} />;
}
