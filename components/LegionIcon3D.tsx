import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

// Acquisition - Globe with network
function GlobeIcon({ color = '#00d4ff' }: { color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  const wireframeGeometry = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(1.2, 2)
    return geometry
  }, [])

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        {/* Main sphere */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color={color}
            distort={0.2}
            speed={2}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
        
        {/* Wireframe overlay */}
        <lineSegments ref={linesRef}>
          <edgesGeometry args={[wireframeGeometry]} />
          <lineBasicMaterial color={color} opacity={0.4} transparent />
        </lineSegments>
        
        {/* Orbiting nodes */}
        {[0, 1, 2, 3].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i * Math.PI) / 2) * 1.8,
              Math.sin((i * Math.PI) / 2) * 0.5,
              Math.sin((i * Math.PI) / 2) * 1.5
            ]}
          >
            <sphereGeometry args={[0.15]} />
            <meshBasicMaterial color={color} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

// Capital - Rotating coin with glow
function CoinIcon({ color = '#22c55e' }: { color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.8
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = state.clock.elapsedTime * 0.8
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group>
        {/* Glow effect */}
        <mesh ref={glowRef} scale={1.3}>
          <cylinderGeometry args={[0.9, 0.9, 0.15, 32]} />
          <meshBasicMaterial color={color} opacity={0.2} transparent />
        </mesh>
        
        {/* Main coin */}
        <mesh ref={meshRef}>
          <cylinderGeometry args={[0.8, 0.8, 0.2, 32]} />
          <meshStandardMaterial 
            color={color} 
            metalness={1} 
            roughness={0.15}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Inner detail */}
        <mesh position={[0, 0.11, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.02, 32]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
        </mesh>
        
        <mesh position={[0, -0.11, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.02, 32]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </Float>
  )
}

// Development - Building complex
function BuildingIcon({ color = '#f59e0b' }: { color?: string }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.08
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={groupRef}>
        {/* Main tower */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.6, 1.2, 0.6]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
        </mesh>
        
        {/* Side building 1 */}
        <mesh position={[-0.5, 0, 0.3]}>
          <boxGeometry args={[0.4, 0.8, 0.4]} />
          <meshStandardMaterial color={color} opacity={0.8} transparent metalness={0.5} />
        </mesh>
        
        {/* Side building 2 */}
        <mesh position={[0.5, -0.1, -0.2]}>
          <boxGeometry args={[0.5, 1, 0.5]} />
          <meshStandardMaterial color={color} opacity={0.7} transparent metalness={0.5} />
        </mesh>
        
        {/* Windows glow */}
        {[-0.15, 0, 0.15].map((x, i) => (
          <mesh key={i} position={[x, 0.5, 0.31]}>
            <planeGeometry args={[0.08, 0.15]} />
            <meshBasicMaterial color="#ffeb3b" opacity={0.6} transparent />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

// Exit - Target with rings
function TargetIcon({ color = '#ec4899' }: { color?: string }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.4}>
      <group ref={groupRef}>
        {/* Outer ring */}
        <mesh>
          <torusGeometry args={[1.2, 0.08, 16, 64]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
        </mesh>
        
        {/* Middle ring */}
        <mesh rotation={[0, 0, Math.PI / 6]}>
          <torusGeometry args={[0.85, 0.06, 16, 48]} />
          <meshStandardMaterial color={color} opacity={0.7} transparent />
        </mesh>
        
        {/* Inner ring */}
        <mesh rotation={[0, 0, -Math.PI / 6]}>
          <torusGeometry args={[0.5, 0.05, 16, 32]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
        </mesh>
        
        {/* Center dot */}
        <mesh>
          <sphereGeometry args={[0.2]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
        </mesh>
      </group>
    </Float>
  )
}

// Counter-Intel - Eye
function EyeIcon({ color = '#ef4444' }: { color?: string }) {
  const eyeRef = useRef<THREE.Group>(null)
  const pupilRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (eyeRef.current) {
      eyeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
    if (pupilRef.current) {
      pupilRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.15
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={eyeRef}>
        {/* Eye shape */}
        <mesh scale={[1.5, 0.8, 0.5]}>
          <sphereGeometry args={[1, 32, 16]} />
          <meshStandardMaterial 
            color={color} 
            opacity={0.3} 
            transparent 
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Iris */}
        <mesh position={[0, 0, 0.3]}>
          <circleGeometry args={[0.5, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
        
        {/* Pupil */}
        <mesh ref={pupilRef} position={[0, 0, 0.35]}>
          <circleGeometry args={[0.25, 32]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        
        {/* Eyelid outline */}
        <mesh scale={[1.6, 0.9, 0.6]}>
          <torusGeometry args={[0.9, 0.03, 8, 64]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
    </Float>
  )
}

// Tokenization - Crystal
function TokenIcon({ color = '#8b5cf6' }: { color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.6
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group>
        {/* Main crystal */}
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.9} 
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Wireframe edges */}
        <lineSegments>
          <edgesGeometry args={[new THREE.OctahedronGeometry(1.1, 0)]} />
          <lineBasicMaterial color="#ffffff" opacity={0.5} transparent />
        </lineSegments>
        
        {/* Inner glow */}
        <mesh scale={0.5}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#ffffff" opacity={0.3} transparent />
        </mesh>
      </group>
    </Float>
  )
}

// Meta - Brain/Neural
function BrainIcon({ color = '#06b6d4' }: { color?: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const nodesRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
    if (nodesRef.current) {
      nodesRef.current.rotation.y = -state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Central core */}
        <mesh>
          <icosahedronGeometry args={[0.7, 1]} />
          <MeshDistortMaterial color={color} distort={0.3} speed={3} />
        </mesh>
        
        {/* Orbiting nodes */}
        <group ref={nodesRef}>
          {[...Array(6)].map((_, i) => {
            const angle = (i / 6) * Math.PI * 2
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * 1.3,
                  Math.sin(angle * 2) * 0.4,
                  Math.sin(angle) * 1.3
                ]}
              >
                <sphereGeometry args={[0.12]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
              </mesh>
            )
          })}
        </group>
        
        {/* Connection lines */}
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2
          const points = [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(
              Math.cos(angle) * 1.3,
              Math.sin(angle * 2) * 0.4,
              Math.sin(angle) * 1.3
            )
          ]
          return (
            <line key={i}>
              <bufferGeometry>
                <primitive object={new THREE.BufferGeometry().setFromPoints(points)} attach="geometry" />
              </bufferGeometry>
              <lineBasicMaterial color={color} opacity={0.3} transparent />
            </line>
          )
        })}
      </group>
    </Float>
  )
}

const iconComponents: Record<string, React.FC<{color?: string}>> = {
  acquisition: GlobeIcon,
  capital: CoinIcon,
  development: BuildingIcon,
  exit: TargetIcon,
  counterintel: EyeIcon,
  tokenization: TokenIcon,
  meta: BrainIcon,
}

interface LegionIcon3DProps {
  legionId: string
  color: string
  size?: number
}

export function LegionIcon3D({ legionId, color, size = 80 }: LegionIcon3DProps) {
  const IconComponent = iconComponents[legionId] || GlobeIcon
  
  return (
    <div 
      className="canvas-3d"
      style={{ width: size, height: size }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color={color} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
        <IconComponent color={color} />
      </Canvas>
    </div>
  )
}

export default LegionIcon3D
