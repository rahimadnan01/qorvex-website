import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function MorphingCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.Points>(null!);

  const particlesCount = 1500;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const col = new Float32Array(particlesCount * 3);
    const teal = new THREE.Color('#0D98A2');
    const navy = new THREE.Color('#152436');

    for (let i = 0; i < particlesCount; i++) {
      const radius = 3.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = teal.clone().lerp(navy, Math.random() * 0.7);
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.25;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= delta * 0.08;
      particlesRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <group>
      {/* Abstract Fractured Core */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.2}>
        <mesh ref={meshRef} scale={1.8}>
          <icosahedronGeometry args={[1, 6]} />
          <MeshDistortMaterial
            color="#152436"
            emissive="#0D98A2"
            emissiveIntensity={0.4}
            roughness={0.15}
            metalness={0.9}
            distort={0.4}
            speed={2.5}
          />
        </mesh>

        {/* Wireframe Outer Shell */}
        <mesh scale={2.4}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial
            color="#0D98A2"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>

      {/* Orbiting Particle Swarm */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#0D98A2" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#152436" />
        <MorphingCore />
      </Canvas>
    </div>
  );
}
