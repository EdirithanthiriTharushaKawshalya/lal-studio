"use client";
import React, { useRef, useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

export default function CameraModel() {
  const { scene } = useGLTF("/models/camera.glb");
  const group = useRef<THREE.Group>(null);
  const pathname = usePathname();
  const scrollTriggerInstance = useRef<any>(null);

  useLayoutEffect(() => {
    if (!group.current) return;

    // 1. HOME PAGE ANIMATION (GSAP)
    if (pathname === "/") {
      // Set initial Hero position
      group.current.position.set(2.5, -0.9, -3);
      group.current.rotation.set(0.3, 0.4, 0);
      group.current.scale.set(3.0, 3.0, 3.0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "main",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5, // High scrub for a more "viscous," premium feel
        },
      });

      tl.to(group.current.position, { x: -2, y: 0.5, z: 0 }, 0)
        .to(group.current.rotation, { y: Math.PI * 1.2, x: -0.2 }, 0)
        .to(group.current.scale, { x: 6, y: 6, z: 6 }, 0);
      
      scrollTriggerInstance.current = tl.scrollTrigger;
    } 
    // 2. OTHER PAGES (RESET GSAP)
    else {
      if (scrollTriggerInstance.current) {
        scrollTriggerInstance.current.kill();
      }
    }

    return () => {
      if (scrollTriggerInstance.current) scrollTriggerInstance.current.kill();
    };
  }, [pathname]);

  useFrame((state) => {
    if (!group.current) return;

    if (pathname === "/") {
      // Gentle cinematic float for home page
      group.current.position.y += Math.sin(state.clock.getElapsedTime() * 0.5) * 0.001;
    } else {
      // Use about page positioning for ALL other pages
      const aboutPagePos: [number, number, number] = [-3, 0, -2];
      const aboutPageRot: [number, number, number] = [0, Math.PI / 2, 0];

      // Smoothly transition to about page fixed position (Lerp)
      group.current.position.lerp(new THREE.Vector3(...aboutPagePos), 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, aboutPageRot[0], 0.05);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, aboutPageRot[1], 0.05);
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, aboutPageRot[2], 0.05);
    }
  });

  return (
    <group ref={group}>
       <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/camera.glb");