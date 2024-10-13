"use client";

import { FC, useRef } from "react";
import * as THREE from "three";
import { sinPalette } from "./shared/palletes";
import { blobFragment, blobVertex } from "./shared/shaders";
import { Canvas, useFrame } from "@react-three/fiber";
import { cn } from "@/shared/utils/cn";

const DitherMaterial: FC = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime() * 1000;
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={blobVertex}
      fragmentShader={blobFragment}
      transparent
      depthWrite={false}
      depthTest={false}
      uniforms={{
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uTime: new THREE.Uniform(0),
        uVisibility: { value: 1 },
        uMouseSize: { value: 0.1 },
        uAspect: { value: new THREE.Vector2(1, 1) },
        c0: { value: sinPalette.c0 },
        c1: { value: sinPalette.c1 },
        c2: { value: sinPalette.c2 },
        c3: { value: sinPalette.c3 },
      }}
    />
  );
};

const Blob: FC = () => {
  return (
    <>
      <ambientLight />
      <mesh position={[1.5, 0, 0]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshNormalMaterial />
        <DitherMaterial />
      </mesh>
    </>
  );
};

type BlobDemoProps = {
  className?: string;
};
const BlobDemo: FC<BlobDemoProps> = (props) => {
  return (
    <div className={cn("", props.className)}>
      <Canvas>
        <Blob />
      </Canvas>
    </div>
  );
};

export default BlobDemo;
