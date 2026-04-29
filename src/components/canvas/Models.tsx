import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useConfiguratorStore, OPTIONS } from '../../store/useConfiguratorStore';
import * as THREE from 'three';

// --- PLACEHOLDER MODELS ---
// In a real scenario, these would be loaded via useGLTF('/model.glb')

export const WatchModel = () => {
  const group = useRef<THREE.Group>(null);
  const config = useConfiguratorStore((state) => state.config.watch);
  
  const caseColor = OPTIONS.watch.case[config.case].hex;
  const strapColor = OPTIONS.watch.strap[config.strap].hex;

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={group} scale={1.5}>
      {/* Case */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 0.4, 32]} />
        <meshStandardMaterial color={caseColor} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Strap */}
      <mesh castShadow receiveShadow position={[0, 0, -1.5]}>
        <boxGeometry args={[0.8, 0.2, 3]} />
        <meshStandardMaterial color={strapColor} metalness={0.1} roughness={0.8} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0, 1.5]}>
        <boxGeometry args={[0.8, 0.2, 3]} />
        <meshStandardMaterial color={strapColor} metalness={0.1} roughness={0.8} />
      </mesh>
      {/* Dial */}
      <mesh position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.05, 32]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
};

export const CarModel = () => {
  const group = useRef<THREE.Group>(null);
  const config = useConfiguratorStore((state) => state.config.car);
  
  const bodyColor = OPTIONS.car.body[config.body].hex;
  const wheelsColor = OPTIONS.car.wheels[config.wheels].hex;

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y -= 0.002;
    }
  });

  return (
    <group ref={group} scale={0.8} position={[0, -0.5, 0]}>
      {/* Body */}
      <mesh castShadow receiveShadow position={[0, 1, 0]}>
        <boxGeometry args={[2, 0.8, 4]} />
        <meshPhysicalMaterial 
          color={bodyColor} 
          metalness={0.6} 
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      {/* Cabin */}
      <mesh castShadow receiveShadow position={[0, 1.6, -0.2]}>
        <boxGeometry args={[1.8, 0.6, 2]} />
        <meshStandardMaterial color="#000" metalness={0.9} roughness={0.1} transparent opacity={0.8} />
      </mesh>
      {/* Wheels */}
      {[[-1.1, 0.4, 1.5], [1.1, 0.4, 1.5], [-1.1, 0.4, -1.5], [1.1, 0.4, -1.5]].map((pos, i) => (
        <mesh key={i} castShadow receiveShadow position={pos as [number, number, number]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial color={wheelsColor} metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
};

export const BikeModel = () => {
  const group = useRef<THREE.Group>(null);
  const config = useConfiguratorStore((state) => state.config.bike);
  
  const frameColor = OPTIONS.bike.frame[config.frame].hex;
  const saddleColor = OPTIONS.bike.saddle[config.saddle].hex;

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  const frameMaterial = <meshStandardMaterial color={frameColor} metalness={0.5} roughness={0.4} />;

  return (
    <group ref={group} scale={1.2} position={[0, -1, 0]}>
      {/* Top Tube */}
      <mesh castShadow receiveShadow position={[0, 2.2, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.7, 16]} />
        {frameMaterial}
      </mesh>

      {/* Down Tube */}
      <mesh castShadow receiveShadow position={[0, 1.5, 0.5]} rotation={[Math.PI / 4, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 1.98, 16]} />
        {frameMaterial}
      </mesh>

      {/* Seat Tube */}
      <mesh castShadow receiveShadow position={[0, 1.5, -0.35]} rotation={[-0.21, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.43, 16]} />
        {frameMaterial}
      </mesh>

      {/* Chain Stays (Bottom to Rear Wheel) */}
      <mesh castShadow receiveShadow position={[0, 0.8, -0.85]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.3, 16]} />
        {frameMaterial}
      </mesh>

      {/* Seat Stays (Saddle to Rear Wheel) */}
      <mesh castShadow receiveShadow position={[0, 1.5, -1.0]} rotation={[0.62, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.72, 16]} />
        {frameMaterial}
      </mesh>

      {/* Front Fork */}
      <mesh castShadow receiveShadow position={[0, 1.5, 1.35]} rotation={[-0.21, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.43, 16]} />
        {frameMaterial}
      </mesh>

      {/* Handlebars */}
      <mesh castShadow receiveShadow position={[0, 2.25, 1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 16]} />
        <meshStandardMaterial color="#111" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Saddle */}
      <mesh castShadow receiveShadow position={[0, 2.3, -0.5]}>
        <boxGeometry args={[0.3, 0.1, 0.8]} />
        <meshStandardMaterial color={saddleColor} metalness={0.1} roughness={0.9} />
      </mesh>

      {/* Wheels */}
      {[[0, 0.8, 1.5], [0, 0.8, -1.5]].map((pos, i) => (
        <mesh key={i} castShadow receiveShadow position={pos as [number, number, number]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.8, 0.05, 16, 100]} />
          <meshStandardMaterial color="#222" metalness={0.2} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
};
