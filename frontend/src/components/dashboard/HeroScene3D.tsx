import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import type { Mesh } from 'three';

const RotatingShape = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.35;
    meshRef.current.rotation.y += delta * 0.55;
  });

  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial
          color="#274a4e"
          emissive="#4f587e"
          emissiveIntensity={0.45}
          roughness={0.15}
          metalness={0.7}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
};

const HeroScene3D = () => {
  return (
    <div className="h-[280px] w-full overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/40">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 3, 3]} intensity={2.5} />
        <pointLight position={[-3, -2, 2]} intensity={1.8} color="#a78bfa" />
        <pointLight position={[2, -2, 2]} intensity={1.5} color="#22d3ee" />
        <RotatingShape />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
};

export default HeroScene3D;