import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Center, Environment, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

// Floating 3D Product Box Component
function ProductBox({ position, color, scale = 1, rotationSpeed = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(time * rotationSpeed) * 0.3;
    meshRef.current.rotation.y = Math.cos(time * rotationSpeed) * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + position[0]) * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.2}
          envMapIntensity={0.5}
        />
        {/* Wireframe overlay for style */}
        <lineSegments>
          <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(1, 1, 1)]} />
          <lineBasicMaterial attach="material" color="#ffffff" opacity={0.2} transparent />
        </lineSegments>
      </mesh>
    </Float>
  );
}

// Floating Sphere (representing branded products like mugs, balls)
function BrandedSphere({ position, color }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y += 0.01;
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>
    </Float>
  );
}

// Delivery Truck 3D Model (simplified)
function Truck3D({ position }) {
  const groupRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    groupRef.current.position.x = Math.sin(time * 0.3) * 3;
    groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Truck body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="#1E90FF" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Truck cabin */}
      <mesh position={[-1.2, 0.3, 0]}>
        <boxGeometry args={[0.6, 0.8, 0.9]} />
        <meshStandardMaterial color="#0B1F3F" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Wheels */}
      {[-0.7, 0.7].map((x, i) => (
        <mesh key={i} position={[x, -0.6, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      ))}
      {[-0.7, 0.7].map((x, i) => (
        <mesh key={i + 2} position={[x, -0.6, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      ))}
    </group>
  );
}

// Particles/Stars Background
function ParticleField() {
  const points = useRef();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return positions;
  }, []);

  useFrame((state) => {
    points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#1E90FF" transparent opacity={0.6} />
    </points>
  );
}

// Main 3D Scene
function Scene3D() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#1E90FF" />

      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Particle Background */}
      <ParticleField />

      {/* Floating Products - Brand Management */}
      <ProductBox position={[-3, 2, -2]} color="#E91E63" scale={0.8} rotationSpeed={0.8} />
      <ProductBox position={[3, 1, -3]} color="#9C27B0" scale={0.6} rotationSpeed={1.2} />
      <ProductBox position={[-2, -1, -1]} color="#FF9800" scale={0.7} rotationSpeed={0.9} />

      {/* Branded Spheres - Products */}
      <BrandedSphere position={[2, -2, -2]} color="#1E90FF" />
      <BrandedSphere position={[-1, 2, -4]} color="#00BCD4" />
      <BrandedSphere position={[4, 0, -1]} color="#4CAF50" />

      {/* 3D Truck - Logistics */}
      <Truck3D position={[0, -1, -5]} />

      {/* Ground plane with gradient */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#0B1F3F"
          metalness={0.8}
          roughness={0.2}
          opacity={0.3}
          transparent
        />
      </mesh>

      {/* Camera Controls - Subtle auto-rotation */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

// Main 3D Hero Component
const Hero3D = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#0B1F3F] via-[#1E90FF] to-[#0B1F3F]">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        className="absolute inset-0"
        gl={{ alpha: true, antialias: true }}
      >
        <Scene3D />
      </Canvas>

      {/* Text Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 pointer-events-auto">
            <span className="bg-white/10 backdrop-blur-md text-blue-100 px-6 py-3 rounded-full text-sm font-medium border border-white/20 shadow-2xl">
              🏆 Nigeria's Trusted Partner
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-white drop-shadow-2xl">
            Elevating Brands,
            <span className="block bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent animate-pulse">
              Delivering Excellence
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 text-blue-100 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            Experience the future of branding. From procurement to logistics,
            we provide comprehensive 3D solutions that transform businesses.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pointer-events-auto">
            <Link
              to="/request-quote"
              className="group relative bg-white text-[#0B1F3F] px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 shadow-2xl overflow-hidden"
            >
              <span className="relative z-10">Get Started →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/services"
              className="group bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-2xl"
            >
              Explore 3D Experience
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-8 justify-center mt-12 text-sm">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-xl">
                ✓
              </div>
              <span className="text-blue-100 font-semibold">500+ Projects</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-xl">
                ⭐
              </div>
              <span className="text-blue-100 font-semibold">98% Satisfaction</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-xl">
                🏅
              </div>
              <span className="text-blue-100 font-semibold">10+ Years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
        <p className="text-white text-sm mt-2 text-center">Scroll to explore</p>
      </div>

      {/* Curved Bottom Shape */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 0L60 8C120 16 240 32 360 42.7C480 53 600 59 720 56C840 53 960 43 1080 42.7C1200 43 1320 53 1380 58.7L1440 64V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#f9fafb"/>
        </svg>
      </div>
    </div>
  );
};

export default Hero3D;
