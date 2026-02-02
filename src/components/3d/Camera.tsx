"use client";
import React, { useRef, useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export default function CameraModel() {
  const { nodes, materials } = useGLTF("/models/camera.glb") as any;
  const group = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    if (!group.current) return;

    // 1. Initial Hero Position: Tucked to the right and slightly back
    group.current.position.set(2.5, -0.8, -2); 
    group.current.rotation.set(0.2, -0.5, 0);
    // Adjusted scale: 1.2 is a safe starting point for large models
    group.current.scale.set(1.2, 1.2, 1.2); 

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // High scrub for a more "viscous," premium feel
      },
    });

    // 2. The Scroll Sequence: Move the film/camera across the screen
    tl.to(group.current.position, { x: -2, y: 0.5, z: 0 }, 0)
      .to(group.current.rotation, { y: Math.PI * 1.2, x: -0.2 }, 0)
      .to(group.current.scale, { x: 1.5, y: 1.5, z: 1.5 }, 0); // Subtle zoom

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [materials]);

  useFrame((state) => {
    if (group.current) {
      // Gentle cinematic float
      group.current.position.y += Math.sin(state.clock.getElapsedTime() * 0.5) * 0.001;
    }
  });

  return (
    <group ref={group}>
       <primitive object={nodes.Scene || nodes.RootNode || Object.values(nodes)[0]} />
    </group>
  );
}

useGLTF.preload("/models/camera.glb");