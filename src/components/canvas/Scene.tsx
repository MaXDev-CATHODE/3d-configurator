import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { WatchModel, CarModel, BikeModel } from './Models';
import { LoadedModel } from './LoadedModel';
import { UploadedModel } from './UploadedModel';
import { Suspense } from 'react';

export const Scene = () => {
  const activeModel = useConfiguratorStore((state) => state.activeModel);
  const uploadedModelUrl = useConfiguratorStore((state) => state.uploadedModelUrl);

  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        
        {/* Environment & Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Environment preset="studio" />

        {/* Models */}
        <Suspense fallback={null}>
          {activeModel === 'custom' && <LoadedModel />}
          {activeModel === 'watch' && <WatchModel />}
          {activeModel === 'car' && <CarModel />}
          {activeModel === 'bike' && <BikeModel />}
          {activeModel === 'upload' && uploadedModelUrl && <UploadedModel url={uploadedModelUrl} />}
        </Suspense>

        {/* Shadows and Controls */}
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        <OrbitControls 
          enablePan={false}
          minDistance={2}
          maxDistance={8}
          maxPolarAngle={Math.PI / 2 + 0.1}
        />
      </Canvas>
    </div>
  );
};
