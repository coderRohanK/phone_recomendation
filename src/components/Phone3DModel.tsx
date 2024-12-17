import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import { Phone } from '../types/phone';
import * as THREE from 'three';

interface Phone3DModelProps {
  phone: Phone;
}

function PhoneModel() {
  const phoneRef = useRef<THREE.Group>();
  const screenRef = useRef<THREE.Mesh>();

  useFrame((state) => {
    if (phoneRef.current) {
      phoneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
    if (screenRef.current) {
      screenRef.current.material.emissive.setRGB(
        0.1,
        0.1,
        0.2 + Math.sin(state.clock.elapsedTime) * 0.1
      );
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0}
      floatIntensity={1}
      floatingRange={[0, 0.2]}
    >
      <group ref={phoneRef}>
        {/* Phone body */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.7, 1.4, 0.06]} />
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Screen */}
        <mesh ref={screenRef} position={[0, 0, 0.031]}>
          <boxGeometry args={[0.65, 1.35, 0.001]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#000033"
            emissiveIntensity={1}
          />
        </mesh>

        {/* Camera module */}
        <group position={[-0.2, 0.5, 0.035]}>
          {/* Main camera */}
          <mesh>
            <cylinderGeometry args={[0.05, 0.05, 0.01, 32]} />
            <meshPhysicalMaterial
              color="#333333"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          {/* Camera lens */}
          <mesh position={[0, 0, 0.005]}>
            <cylinderGeometry args={[0.03, 0.03, 0.005, 32]} />
            <meshPhysicalMaterial
              color="#111111"
              metalness={1}
              roughness={0}
            />
          </mesh>
        </group>

        {/* Flash */}
        <mesh position={[-0.2, 0.6, 0.035]}>
          <cylinderGeometry args={[0.02, 0.02, 0.01, 32]} />
          <meshPhysicalMaterial
            color="#ffff99"
            emissive="#ffff99"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
    </Float>
  );
}

export const Phone3DModel: React.FC<Phone3DModelProps> = () => {
  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 2]} />
        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <spotLight
          position={[0, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={0.8}
          castShadow
        />
        <PhoneModel />
      </Canvas>
    </div>
  );
};