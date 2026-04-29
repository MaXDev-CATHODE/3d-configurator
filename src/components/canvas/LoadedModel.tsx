// @ts-nocheck
import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useConfiguratorStore, OPTIONS } from '../../store/useConfiguratorStore'

export function LoadedModel(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null)
  const modelUrl = import.meta.env.BASE_URL + 'model.glb';
  const { nodes } = useGLTF(modelUrl) as any
  
  const config = useConfiguratorStore((state) => state.config.custom)
  
  const bodyColor = OPTIONS.custom.body[config.body].hex
  const materialType = OPTIONS.custom.material[config.material].name

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={group} {...props} dispose={null} scale={1.5}>
      <mesh geometry={nodes.Mesh_0.geometry} castShadow receiveShadow>
        <meshPhysicalMaterial 
          color={bodyColor} 
          metalness={materialType === 'Metal' ? 1 : 0} 
          roughness={materialType === 'Matowy' ? 0.9 : 0.05}
          clearcoat={materialType === 'Błyszczący Plastik' ? 1 : 0}
          clearcoatRoughness={0}
          envMapIntensity={2}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload(import.meta.env.BASE_URL + 'model.glb')
