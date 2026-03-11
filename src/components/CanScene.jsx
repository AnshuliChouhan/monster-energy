import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows, Float } from '@react-three/drei'
import * as THREE from 'three'

// Procedural can — no GLB needed
function MonsterCan() {
  const groupRef = useRef(null)
  const glowRef = useRef(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.4
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.05
    }
    if (glowRef.current) {
      glowRef.current.intensity = 2 + Math.sin(t * 2) * 0.5
    }
  })

  // Can body geometry
  const canMat = new THREE.MeshStandardMaterial({
    color: '#111111',
    metalness: 0.95,
    roughness: 0.1,
  })

  // Neon green band material
  const greenMat = new THREE.MeshStandardMaterial({
    color: '#39FF14',
    emissive: '#39FF14',
    emissiveIntensity: 2,
    metalness: 0.3,
    roughness: 0.2,
  })

  return (
    <group ref={groupRef}>
      {/* Main can body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.6, 0.6, 2.2, 64]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.95} roughness={0.08} />
      </mesh>

      {/* Top cap */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.58, 0.6, 0.08, 64]} />
        <meshStandardMaterial color="#222" metalness={1} roughness={0.05} />
      </mesh>

      {/* Rim top */}
      <mesh position={[0, 1.22, 0]}>
        <cylinderGeometry args={[0.38, 0.57, 0.12, 64]} />
        <meshStandardMaterial color="#333" metalness={1} roughness={0.05} />
      </mesh>

      {/* Pull tab */}
      <mesh position={[0.2, 1.32, 0]} rotation={[0, 0, 0.3]}>
        <torusGeometry args={[0.1, 0.02, 8, 32, Math.PI]} />
        <meshStandardMaterial color="#555" metalness={1} roughness={0.1} />
      </mesh>

      {/* Bottom cap */}
      <mesh position={[0, -1.15, 0]}>
        <cylinderGeometry args={[0.6, 0.55, 0.12, 64]} />
        <meshStandardMaterial color="#222" metalness={1} roughness={0.05} />
      </mesh>

      {/* Neon green accent band — top */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.602, 0.602, 0.06, 64]} />
        <meshStandardMaterial color="#39FF14" emissive="#39FF14" emissiveIntensity={3} />
      </mesh>

      {/* Neon green accent band — bottom */}
      <mesh position={[0, -0.85, 0]}>
        <cylinderGeometry args={[0.602, 0.602, 0.06, 64]} />
        <meshStandardMaterial color="#39FF14" emissive="#39FF14" emissiveIntensity={3} />
      </mesh>

      {/* M claw marks — simplified as raised geo */}
      {[-0.15, -0.05, 0.05, 0.15].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.601]} rotation={[0.1 * (i - 1.5), 0, 0]}>
          <boxGeometry args={[0.015, 1.0, 0.01]} />
          <meshStandardMaterial color="#39FF14" emissive="#39FF14" emissiveIntensity={4} />
        </mesh>
      ))}

      {/* Glow point light */}
      <pointLight ref={glowRef} position={[0, 0, 1.5]} color="#39FF14" intensity={2.5} distance={5} />
    </group>
  )
}

export default function CanScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-5, -3, -2]} intensity={0.3} color="#39FF14" />
      <pointLight position={[3, 2, 3]} intensity={1} color="#39FF14" />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <MonsterCan />
      </Float>

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={4}
        blur={2.5}
        color="#39FF14"
      />

      <Environment preset="night" />
    </Canvas>
  )
}