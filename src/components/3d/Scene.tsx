"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, ContactShadows, PresentationControls } from "@react-three/drei";
import CameraModel from "./Camera"; // We'll create this next

export default function Scene() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-10 ">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />
        
        <Suspense fallback={null}>
          <PresentationControls
            global
            snap={true}
            rotation={[0, 0.5, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
             <CameraModel />
          </PresentationControls>
          <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}