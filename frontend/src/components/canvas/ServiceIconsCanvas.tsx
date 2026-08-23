import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ServiceIconMeshProps {
  type: 'cube' | 'knot' | 'sphere' | 'wireframe' | 'particle';
  hovered?: boolean;
}

function MeshShape({ type, hovered }: ServiceIconMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * (hovered ? 1.2 : 0.4);
      meshRef.current.rotation.y += delta * (hovered ? 1.5 : 0.6);
    }
  });

  const renderGeometry = () => {
    switch (type) {
      case 'knot':
        return <torusKnotGeometry args={[0.7, 0.25, 64, 16]} />;
      case 'sphere':
        return <sphereGeometry args={[0.85, 32, 32]} />;
      case 'wireframe':
        return <octahedronGeometry args={[0.9]} />;
      case 'cube':
      default:
        return <boxGeometry args={[1.2, 1.2, 1.2]} />;
    }
  };

  return (
    <mesh ref={meshRef} scale={hovered ? 1.15 : 1}>
      {renderGeometry()}
      <MeshDistortMaterial
        color={hovered ? '#00F0FF' : '#1E1E2A'}
        emissive={hovered ? '#7000FF' : '#00F0FF'}
        emissiveIntensity={hovered ? 0.6 : 0.2}
        roughness={0.2}
        metalness={0.8}
        distort={hovered ? 0.35 : 0.15}
        speed={hovered ? 4 : 1.5}
        wireframe={type === 'wireframe'}
      />
    </mesh>
  );
}

export default function ServiceIconsCanvas({ type, hovered = false }: ServiceIconMeshProps) {
  return (
    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} color="#00F0FF" intensity={2} />
        <MeshShape type={type} hovered={hovered} />
      </Canvas>
    </div>
  );
}
