
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const GraduationCap: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const tassleRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (tassleRef.current) {
      tassleRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Main cap base */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.3, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.4} />
        </mesh>
        
        {/* Cap top (square board) */}
        <mesh position={[0, 0.3, 0]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[2.2, 0.1, 2.2]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.4} />
        </mesh>
        
        {/* Tassle string */}
        <group ref={tassleRef} position={[1.1, 0.35, 1.1]}>
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
            <meshStandardMaterial color="#ffd700" metalness={0.5} roughness={0.3} />
          </mesh>
          
          {/* Tassle top */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#ffd700" metalness={0.5} roughness={0.3} />
          </mesh>
          
          {/* Tassle bottom */}
          <mesh position={[0, -0.7, 0]}>
            <coneGeometry args={[0.1, 0.2, 8]} />
            <meshStandardMaterial color="#ffd700" metalness={0.5} roughness={0.3} />
          </mesh>
        </group>
        
        {/* Inner cap detail */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[1.0, 1.0, 0.15, 32]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.2} roughness={0.6} />
        </mesh>
      </group>
    </Float>
  );
};

const GraduationHat3D: React.FC = () => {
  return (
    <div className="w-full h-64 md:h-80">
      <Canvas
        camera={{ position: [3, 2, 3], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-3, 3, -3]} intensity={0.5} color="#ffd700" />
        
        <GraduationCap />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default GraduationHat3D;
