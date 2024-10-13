"use client";

import React, { FC, useEffect, useRef } from "react";
// import { gsap } from "gsap";
import * as THREE from "three";
import { palette as colorPallete, sinPalette } from "./shared/palletes";
import { Rendering } from "./shared/rendering";
import { blobFragment, blobVertex } from "./shared/shaders";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from "gsap";

type BlobDemoProps = {
  className?: string;
};
const BlobDemo: FC<BlobDemoProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const demoRef = useRef<Demo | null>(null);

  useEffect(() => {
    class Demo {
      constructor(canvas: HTMLCanvasElement | null, palette: typeof colorPallete) {
        if (!canvas) return;

        this.rendering = new Rendering(canvas, palette);
        // this.controls = new OrbitControls(this.rendering.camera, this.rendering.canvas);

        this.mouseSizeTarget = 0.1;
        this.uResolution = {
          value: [
            this.rendering.vp.canvas.width * this.rendering.vp.canvas.dpr,
            this.rendering.vp.canvas.height * this.rendering.vp.canvas.dpr,
          ],
        };
        this.uTime = new THREE.Uniform(0);
        this.uMouseSize = new THREE.Uniform(0.1);
        this.uClickTime = new THREE.Uniform(0);
        this.uVisibility = new THREE.Uniform(1);
        this.uAspect = new THREE.Uniform(new THREE.Vector2(1, 1));
        this.init();
      }
      init() {
        let sphere = new THREE.SphereGeometry(1, 64, 64);
        let blobMaterial = new THREE.ShaderMaterial({
          vertexShader: blobVertex,
          fragmentShader: blobFragment,
          transparent: true,
          depthWrite: false,
          depthTest: false,
          uniforms: {
            uResolution: this.uResolution,
            uTime: this.uTime,
            uVisibility: this.uVisibility,
            uMouseSize: this.uMouseSize,
            uAspect: this.uAspect,
            c0: { value: sinPalette.c0 },
            c1: { value: sinPalette.c1 },
            c2: { value: sinPalette.c2 },
            c3: { value: sinPalette.c3 },
          },
        });
        let mesh = new THREE.Mesh(sphere, blobMaterial);
        this.rendering.scene.add(mesh);
        this.addEvents();
      }
      setAspectRatio(uAspect) {
        let screen = this.rendering.vp.screen;
        let width = Math.max(screen.width, screen.height);
        let height = width;

        let sizeRatioX = width / height;
        let texRatioX = screen.width / screen.height;
        let ratioX = Math.min(sizeRatioX / texRatioX, 1);

        let sizeRatioY = height / width;
        let texRatioY = screen.height / screen.width;
        let ratioY = Math.min(sizeRatioY / texRatioY, 1);

        uAspect.value = [1 / ratioY, 1 / ratioX];
      }
      onResize = () => {
        this.setAspectRatio(this.uAspect);
      };
      onClick = () => {
        this.uClickTime.value = this.uTime.value;
      };
      addEvents() {
        gsap.ticker.add(this.tick);
        window.addEventListener("mousemove", this.onMouseMove);
        // window.addEventListener("resize", this.onResize);
        window.addEventListener("click", this.onClick);
      }
      public tick = (_, delta: number) => {
        this.uTime.value += delta;
        const camera = this.rendering.camera;
        camera.lookAt(-1, 0, 0);
        this.rendering.render();
      };

      public dispose() {
        window.removeEventListener("mousemove", this.onMouseMove);
        // window.removeEventListener("resize", this.onResize);
        window.removeEventListener("click", this.onClick);
      }
    }

    demoRef.current = new Demo(canvasRef.current, colorPallete);
    return () => {
      if (!demoRef.current) return;
      demoRef.current.dispose(); // Clean up on component unmount
    };
  }, []);

  return <canvas ref={canvasRef} className={props.className} />;
};

export default BlobDemo;
