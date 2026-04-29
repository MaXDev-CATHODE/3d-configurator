import { useGLTF, Center } from '@react-three/drei';
import { useMemo, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useConfiguratorStore, OPTIONS } from '../../store/useConfiguratorStore';
import { useFrame } from '@react-three/fiber';

export const UploadedModel = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  const group = useRef<THREE.Group>(null);
  
  const config = useConfiguratorStore((state) => state.config.upload);
  const bodyColor = OPTIONS.upload.body[config.body].hex;
  const materialType = OPTIONS.upload.material[config.material].name;

  // Clone scene so we don't mutate the cached object across hot-reloads
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // create a new physical material for the custom loaded model
        child.material = new THREE.MeshPhysicalMaterial({
          color: bodyColor,
          metalness: materialType === 'Metal' ? 1 : 0,
          roughness: materialType === 'Matowy' ? 0.9 : 0.05,
          clearcoat: materialType === 'Błyszczący Plastik' ? 1 : 0,
          clearcoatRoughness: 0,
          envMapIntensity: 2
        });
      }
    });
  }, [clonedScene, bodyColor, materialType]);

  return (
    <group ref={group}>
      <Center position={[0, -0.5, 0]}>
        <primitive object={clonedScene} />
      </Center>
    </group>
  );
};
