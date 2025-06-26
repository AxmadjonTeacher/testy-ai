
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const GraduationCap: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const tassleRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
    if (tassleRef.current) {
      tassleRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
      tassleRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.2) * 0.03;
    }
  });

  return (
    <Float
      speed={1}
      rotationIntensity={0.1}
      floatIntensity={0.3}
    >
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Main cap base - more realistic proportions */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.4, 1.6, 0.25, 32]} />
          <meshStandardMaterial 
            color="#0a0a0a" 
            metalness={0.1} 
            roughness={0.8}
            emissive="#000000"
            emissiveIntensity={0.02}
          />
        </mesh>
        
        {/* Inner rim detail */}
        <mesh position={[0, -0.05, 0]} castShadow>
          <cylinderGeometry args={[1.35, 1.55, 0.12, 32]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            metalness={0.05} 
            roughness={0.9}
          />
        </mesh>
        
        {/* Cap top (square board) - more realistic proportions */}
        <mesh position={[0, 0.2, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <boxGeometry args={[2.8, 0.08, 2.8]} />
          <meshStandardMaterial 
            color="#0a0a0a" 
            metalness={0.15} 
            roughness={0.7}
            emissive="#000000"
            emissiveIntensity={0.01}
          />
        </mesh>
        
        {/* Board edge detail */}
        <mesh position={[0, 0.16, 0]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[2.85, 0.04, 2.85]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            metalness={0.2} 
            roughness={0.6}
          />
        </mesh>
        
        {/* Tassle assembly */}
        <group ref={tassleRef} position={[1.4, 0.24, 1.4]}>
          {/* Tassle attachment button */}
          <mesh position={[0, 0, 0]} castShadow>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial 
              color="#d4af37" 
              metalness={0.8} 
              roughness={0.2}
              emissive="#8b7355"
              emissiveIntensity={0.1}
            />
          </mesh>
          
          {/* Tassle string - thinner and more elegant */}
          <mesh position={[0, -0.35, 0]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.7, 8]} />
            <meshStandardMaterial 
              color="#d4af37" 
              metalness={0.6} 
              roughness={0.3}
            />
          </mesh>
          
          {/* Tassle top knot */}
          <mesh position={[0, -0.72, 0]} castShadow>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial 
              color="#d4af37" 
              metalness={0.7} 
              roughness={0.3}
            />
          </mesh>
          
          {/* Tassle strands */}
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const x = Math.cos(angle) * 0.03;
            const z = Math.sin(angle) * 0.03;
            return (
              <mesh key={i} position={[x, -0.85, z]} castShadow>
                <cylinderGeometry args={[0.008, 0.005, 0.15, 6]} />
                <meshStandardMaterial 
                  color="#d4af37" 
                  metalness={0.4} 
                  roughness={0.4}
                />
              </mesh>
            );
          })}
        </group>
        
        {/* Subtle cap band */}
        <mesh position={[0, -0.08, 0]}>
          <cylinderGeometry args={[1.42, 1.58, 0.06, 32]} />
          <meshStandardMaterial 
            color="#2a2a2a" 
            metalness={0.3} 
            roughness={0.5}
          />
        </mesh>
      </group>
    </Float>
  );
};

const GraduationHat3D: React.FC = () => {
  return (
    <div className="w-full h-64 md:h-80">
      <Canvas
        camera={{ position: [4, 3, 4], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        shadows
      >
        {/* Professional lighting setup */}
        <ambientLight intensity={0.4} color="#f8fafc" />
        
        {/* Key light */}
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.2} 
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Fill light */}
        <directionalLight 
          position={[-5, 5, -5]} 
          intensity={0.3} 
          color="#e2e8f0"
        />
        
        {/* Rim light for the tassel */}
        <pointLight 
          position={[3, 4, 3]} 
          intensity={0.8} 
          color="#ffd700"
          distance={10}
          decay={2}
        />
        
        {/* Subtle environment */}
        <pointLight 
          position={[0, -2, 0]} 
          intensity={0.2} 
          color="#cbd5e1"
        />
        
        <GraduationCap />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 4}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};

export default GraduationHat3D;
