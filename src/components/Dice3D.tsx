import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface DiceProps {
  value: number;
  isRolling: boolean;
  position: [number, number, number];
}

const DiceDots = ({ value, position }: { value: number; position: [number, number, number] }) => {
  const dotPositions: { [key: number]: [number, number, number][] } = {
    1: [[0, 0, 0]],
    2: [[-0.15, 0.15, 0], [0.15, -0.15, 0]],
    3: [[-0.15, 0.15, 0], [0, 0, 0], [0.15, -0.15, 0]],
    4: [[-0.15, 0.15, 0], [0.15, 0.15, 0], [-0.15, -0.15, 0], [0.15, -0.15, 0]],
    5: [[-0.15, 0.15, 0], [0.15, 0.15, 0], [0, 0, 0], [-0.15, -0.15, 0], [0.15, -0.15, 0]],
    6: [[-0.15, 0.15, 0], [0.15, 0.15, 0], [-0.15, 0, 0], [0.15, 0, 0], [-0.15, -0.15, 0], [0.15, -0.15, 0]],
  };

  const dots = dotPositions[value] || [];

  return (
    <group position={position}>
      {dots.map((dotPos, idx) => (
        <Sphere key={idx} args={[0.08, 16, 16]} position={dotPos}>
          <meshStandardMaterial color="#1a1a1a" />
        </Sphere>
      ))}
    </group>
  );
};

const Dice = ({ value, isRolling, position }: DiceProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    if (isRolling) {
      // Random initial rotation for rolling effect
      setRotation([
        Math.random() * Math.PI * 4,
        Math.random() * Math.PI * 4,
        Math.random() * Math.PI * 4,
      ]);
    } else {
      // Set final rotation based on dice value
      const rotations: { [key: number]: [number, number, number] } = {
        1: [0, 0, 0],
        2: [0, Math.PI / 2, 0],
        3: [0, Math.PI, 0],
        4: [0, -Math.PI / 2, 0],
        5: [Math.PI / 2, 0, 0],
        6: [-Math.PI / 2, 0, 0],
      };
      setRotation(rotations[value] || [0, 0, 0]);
    }
  }, [value, isRolling]);

  useFrame(() => {
    if (meshRef.current && isRolling) {
      meshRef.current.rotation.x += 0.1;
      meshRef.current.rotation.y += 0.15;
      meshRef.current.rotation.z += 0.05;
    } else if (meshRef.current) {
      // Smoothly interpolate to final rotation
      meshRef.current.rotation.x += (rotation[0] - meshRef.current.rotation.x) * 0.1;
      meshRef.current.rotation.y += (rotation[1] - meshRef.current.rotation.y) * 0.1;
      meshRef.current.rotation.z += (rotation[2] - meshRef.current.rotation.z) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <RoundedBox args={[1, 1, 1]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color="#f5f5f5" />
      </RoundedBox>

      {/* Face 1 - Front */}
      <DiceDots value={1} position={[0, 0, 0.51]} />

      {/* Face 2 - Right */}
      <group rotation={[0, Math.PI / 2, 0]}>
        <DiceDots value={2} position={[0, 0, 0.51]} />
      </group>

      {/* Face 3 - Back */}
      <group rotation={[0, Math.PI, 0]}>
        <DiceDots value={3} position={[0, 0, 0.51]} />
      </group>

      {/* Face 4 - Left */}
      <group rotation={[0, -Math.PI / 2, 0]}>
        <DiceDots value={4} position={[0, 0, 0.51]} />
      </group>

      {/* Face 5 - Top */}
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <DiceDots value={5} position={[0, 0, 0.51]} />
      </group>

      {/* Face 6 - Bottom */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <DiceDots value={6} position={[0, 0, 0.51]} />
      </group>
    </group>
  );
};

interface Dice3DProps {
  dice1: number;
  dice2: number;
  isRolling: boolean;
}

export const Dice3D = ({ dice1, dice2, isRolling }: Dice3DProps) => {
  return (
    <div className="w-full h-64 md:h-80">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 5, 5]} intensity={0.5} />

        <Dice value={dice1} isRolling={isRolling} position={[-1.2, 0, 0]} />
        <Dice value={dice2} isRolling={isRolling} position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  );
};
