import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type PerspectiveMode = 'bird' | 'frog' | 'normal';

interface Housing3DBackgroundProps {
  language?: 'da' | 'en';
}

export const Housing3DBackground: React.FC<Housing3DBackgroundProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // References for animation state - continuous automatic cinematic tour
  const stateRef = useRef({
    currentMode: 'bird' as PerspectiveMode,
    lastSwitchTime: Date.now(),
    cycleInterval: 9000, // Seamlessly switches cinematic perspective every 9 seconds
    time: 0,
    carPositions: [] as number[],
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // SCENE & RENDERER
    const scene = new THREE.Scene();
    // Rich twilight / evening architectural backdrop
    scene.background = new THREE.Color(0x0a1128);
    scene.fog = new THREE.FogExp2(0x0d1b3e, 0.009);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.5, 400);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // VIBRANT LIGHTING FOR MAXIMUM VISIBILITY
    const ambientLight = new THREE.AmbientLight(0x406090, 2.0);
    scene.add(ambientLight);

    // Warm Sun / Golden Hour Directional Light
    const sunLight = new THREE.DirectionalLight(0xffb26b, 3.2);
    sunLight.position.set(60, 80, 50);
    scene.add(sunLight);

    // Cool Sky Fill Light
    const skyLight = new THREE.DirectionalLight(0x60a5fa, 2.2);
    skyLight.position.set(-60, 60, -40);
    scene.add(skyLight);

    // Point lights for street & urban vibrancy
    const centerGlow = new THREE.PointLight(0xffd166, 4.0, 120);
    centerGlow.position.set(0, 15, 0);
    scene.add(centerGlow);

    const blueGlow = new THREE.PointLight(0x38bdf8, 3.5, 110);
    blueGlow.position.set(-20, 22, -15);
    scene.add(blueGlow);

    const magentaGlow = new THREE.PointLight(0xf43f5e, 2.8, 90);
    magentaGlow.position.set(25, 12, 20);
    scene.add(magentaGlow);

    // GROUND & STREET NETWORK
    const groundGeo = new THREE.PlaneGeometry(320, 320);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.8,
      metalness: 0.2,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    scene.add(ground);

    // Main Avenue Grid (Roads)
    const asphaltMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.6,
      metalness: 0.3,
    });
    const roadX = new THREE.Mesh(new THREE.PlaneGeometry(320, 14), asphaltMat);
    roadX.rotation.x = -Math.PI / 2;
    roadX.position.set(0, 0.04, 0);
    scene.add(roadX);

    const roadZ = new THREE.Mesh(new THREE.PlaneGeometry(14, 320), asphaltMat);
    roadZ.rotation.x = -Math.PI / 2;
    roadZ.position.set(0, 0.05, 0);
    scene.add(roadZ);

    // Road Markings (Yellow & White Dashed Lines)
    const stripeMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    for (let i = -140; i < 140; i += 8) {
      const stripeH = new THREE.Mesh(new THREE.PlaneGeometry(4, 0.35), stripeMat);
      stripeH.rotation.x = -Math.PI / 2;
      stripeH.position.set(i, 0.07, 0);
      scene.add(stripeH);

      const stripeV = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 4), stripeMat);
      stripeV.rotation.x = -Math.PI / 2;
      stripeV.position.set(0, 0.07, i);
      scene.add(stripeV);
    }

    // MODERN DANISH RESIDENTIAL APARTMENTS & TOWNHOUSES
    const buildingsGroup = new THREE.Group();
    scene.add(buildingsGroup);

    const boxGeo = new THREE.BoxGeometry(1, 1, 1);

    // Architectural Facade Materials
    const facadeMaterials = [
      new THREE.MeshStandardMaterial({ color: 0xc25b3f, roughness: 0.65, metalness: 0.15 }), // Red Nordic Brick
      new THREE.MeshStandardMaterial({ color: 0xe07a5f, roughness: 0.65, metalness: 0.15 }), // Warm Terracotta
      new THREE.MeshStandardMaterial({ color: 0x243042, roughness: 0.5, metalness: 0.4 }),  // Deep Anthracite Slate
      new THREE.MeshStandardMaterial({ color: 0x3d4b60, roughness: 0.55, metalness: 0.35 }), // Modern Blue-Grey
      new THREE.MeshStandardMaterial({ color: 0x8c7866, roughness: 0.7, metalness: 0.2 }),  // Danish Sandstone Brick
      new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4, metalness: 0.2 }),  // Clean White Render
      new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.75, metalness: 0.1 }), // Warm Timber Cladding
    ];

    // Ultra-bright Glowing Windows
    const windowMatWarm = new THREE.MeshStandardMaterial({
      color: 0xfffbeb,
      emissive: 0xfbbf24,
      emissiveIntensity: 2.5,
      roughness: 0.2,
    });
    const windowMatCool = new THREE.MeshStandardMaterial({
      color: 0xf0fdf4,
      emissive: 0x38bdf8,
      emissiveIntensity: 2.0,
      roughness: 0.2,
    });
    const windowMatAmber = new THREE.MeshStandardMaterial({
      color: 0xffedd5,
      emissive: 0xf97316,
      emissiveIntensity: 2.2,
      roughness: 0.2,
    });
    const windowMats = [windowMatWarm, windowMatCool, windowMatAmber];

    // Modern Balconies
    const balconyMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.3,
      metalness: 0.7,
    });
    const glassRailMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.75,
    });

    // Generate City Blocks along both sides of avenues
    interface BuildingInfo {
      x: number;
      z: number;
      w: number;
      d: number;
      floors: number;
      colorIdx: number;
      hasPitchedRoof: boolean;
      hasBalconies: boolean;
    }

    const buildings: BuildingInfo[] = [];

    // 4 Quadrants of Buildings
    const quadrants = [
      { startX: 16, stepX: 18, startZ: 16, stepZ: 18 },
      { startX: -16, stepX: -18, startZ: 16, stepZ: 18 },
      { startX: 16, stepX: 18, startZ: -16, stepZ: -18 },
      { startX: -16, stepX: -18, startZ: -16, stepZ: -18 },
    ];

    quadrants.forEach((q) => {
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          const x = q.startX + c * q.stepX + (Math.sin(r * 2.1 + c) * 2);
          const z = q.startZ + r * q.stepZ + (Math.cos(r + c * 1.5) * 2);
          const floors = 4 + Math.floor(Math.random() * 8); // 4 to 11 floors
          buildings.push({
            x,
            z,
            w: 10 + Math.random() * 3,
            d: 10 + Math.random() * 3,
            floors,
            colorIdx: Math.floor(Math.random() * facadeMaterials.length),
            hasPitchedRoof: Math.random() > 0.5,
            hasBalconies: true,
          });
        }
      }
    });

    // Create 3D meshes for buildings
    buildings.forEach((b) => {
      const height = b.floors * 3.4;

      // Building main body
      const body = new THREE.Mesh(boxGeo, facadeMaterials[b.colorIdx]);
      body.scale.set(b.w, height, b.d);
      body.position.set(b.x, height / 2, b.z);
      buildingsGroup.add(body);

      // Roof style
      if (b.hasPitchedRoof) {
        const roofGeo = new THREE.ConeGeometry(b.w * 0.72, 3.6, 4);
        const roofMat = new THREE.MeshStandardMaterial({
          color: 0x1e293b,
          roughness: 0.5,
          metalness: 0.3,
        });
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.rotation.y = Math.PI / 4;
        roof.position.set(b.x, height + 1.8, b.z);
        roof.scale.set(1, 1, b.d / b.w);
        buildingsGroup.add(roof);
      } else {
        // Penthouse / Rooftop Garden
        const penthouse = new THREE.Mesh(
          boxGeo,
          new THREE.MeshStandardMaterial({
            color: 0x0f172a,
            roughness: 0.3,
            metalness: 0.8,
          })
        );
        penthouse.scale.set(b.w * 0.75, 2.4, b.d * 0.75);
        penthouse.position.set(b.x, height + 1.2, b.z);
        buildingsGroup.add(penthouse);

        // Glowing rooftop edge light
        const roofLight = new THREE.Mesh(
          boxGeo,
          new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
        );
        roofLight.scale.set(b.w * 0.76, 0.2, b.d * 0.76);
        roofLight.position.set(b.x, height + 2.45, b.z);
        buildingsGroup.add(roofLight);
      }

      // Windows and Balconies
      const windowCols = 4;
      for (let f = 1; f < b.floors; f++) {
        const floorY = f * 3.4 + 1.0;
        for (let col = 0; col < windowCols; col++) {
          const colX = b.x - b.w / 2 + 1.6 + col * ((b.w - 3.2) / (windowCols - 1));
          const wMat = windowMats[(f + col + b.colorIdx) % windowMats.length];

          // Front windows
          const winFront = new THREE.Mesh(boxGeo, wMat);
          winFront.scale.set(1.4, 1.8, 0.18);
          winFront.position.set(colX, floorY, b.z + b.d / 2 + 0.1);
          buildingsGroup.add(winFront);

          // Back windows
          const winBack = new THREE.Mesh(boxGeo, wMat);
          winBack.scale.set(1.4, 1.8, 0.18);
          winBack.position.set(colX, floorY, b.z - b.d / 2 - 0.1);
          buildingsGroup.add(winBack);

          // Side windows (facing the avenues)
          const winSide = new THREE.Mesh(boxGeo, wMat);
          winSide.scale.set(0.18, 1.8, 1.4);
          winSide.position.set(b.x + b.w / 2 + 0.1, floorY, b.z - b.d / 2 + 1.6 + col * ((b.d - 3.2) / (windowCols - 1)));
          buildingsGroup.add(winSide);

          // Modern Nordic Balconies
          if (b.hasBalconies && f % 2 === 1 && (col === 1 || col === 2)) {
            const balconyFloor = new THREE.Mesh(boxGeo, balconyMat);
            balconyFloor.scale.set(2.4, 0.25, 1.6);
            balconyFloor.position.set(colX, floorY - 0.7, b.z + b.d / 2 + 0.8);
            buildingsGroup.add(balconyFloor);

            const glassRailing = new THREE.Mesh(boxGeo, glassRailMat);
            glassRailing.scale.set(2.4, 1.0, 0.1);
            glassRailing.position.set(colX, floorY - 0.2, b.z + b.d / 2 + 1.6);
            buildingsGroup.add(glassRailing);
          }
        }
      }
    });

    // STREETLIGHTS ALONG MAIN STREETS
    const lampPostGeo = new THREE.CylinderGeometry(0.1, 0.12, 6, 8);
    const lampPostMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
    const lampBulbGeo = new THREE.SphereGeometry(0.35, 12, 12);
    const lampBulbMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });

    for (let pos = -120; pos <= 120; pos += 24) {
      if (Math.abs(pos) < 8) continue;

      // Along Avenue X
      [-8, 8].forEach((offsetZ) => {
        const post = new THREE.Mesh(lampPostGeo, lampPostMat);
        post.position.set(pos, 3, offsetZ);
        buildingsGroup.add(post);

        const bulb = new THREE.Mesh(lampBulbGeo, lampBulbMat);
        bulb.position.set(pos, 6, offsetZ);
        buildingsGroup.add(bulb);

        const light = new THREE.PointLight(0xfef08a, 1.5, 20);
        light.position.set(pos, 5.8, offsetZ);
        buildingsGroup.add(light);
      });
    }

    // ANIMATED MOVING CARS WITH GLOWING HEADLIGHTS & TAILLIGHTS
    const carGroup = new THREE.Group();
    scene.add(carGroup);

    interface Car {
      mesh: THREE.Group;
      axis: 'x' | 'z';
      dir: number;
      lane: number;
      speed: number;
      length: number;
    }

    const cars: Car[] = [];
    const carColors = [0xef4444, 0x3b82f6, 0xffffff, 0x10b981, 0xf59e0b, 0x64748b];
    const headlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const taillightMat = new THREE.MeshBasicMaterial({ color: 0xff2222 });

    for (let i = 0; i < 24; i++) {
      const isX = i % 2 === 0;
      const dir = i % 4 < 2 ? 1 : -1;
      const lane = dir > 0 ? 3.2 : -3.2;
      const carMesh = new THREE.Group();

      const carBody = new THREE.Mesh(
        boxGeo,
        new THREE.MeshStandardMaterial({
          color: carColors[i % carColors.length],
          roughness: 0.3,
          metalness: 0.7,
        })
      );
      carBody.scale.set(isX ? 3.5 : 1.7, 1.1, isX ? 1.7 : 3.5);
      carBody.position.y = 0.6;
      carMesh.add(carBody);

      // Headlights
      const hl1 = new THREE.Mesh(boxGeo, headlightMat);
      const hl2 = new THREE.Mesh(boxGeo, headlightMat);
      const tl1 = new THREE.Mesh(boxGeo, taillightMat);
      const tl2 = new THREE.Mesh(boxGeo, taillightMat);

      if (isX) {
        hl1.scale.set(0.1, 0.3, 0.4);
        hl2.scale.set(0.1, 0.3, 0.4);
        tl1.scale.set(0.1, 0.3, 0.4);
        tl2.scale.set(0.1, 0.3, 0.4);

        hl1.position.set(dir * 1.8, 0.6, 0.5);
        hl2.position.set(dir * 1.8, 0.6, -0.5);
        tl1.position.set(-dir * 1.8, 0.6, 0.5);
        tl2.position.set(-dir * 1.8, 0.6, -0.5);
      } else {
        hl1.scale.set(0.4, 0.3, 0.1);
        hl2.scale.set(0.4, 0.3, 0.1);
        tl1.scale.set(0.4, 0.3, 0.1);
        tl2.scale.set(0.4, 0.3, 0.1);

        hl1.position.set(0.5, 0.6, dir * 1.8);
        hl2.position.set(-0.5, 0.6, dir * 1.8);
        tl1.position.set(0.5, 0.6, -dir * 1.8);
        tl2.position.set(-0.5, 0.6, -dir * 1.8);
      }

      carMesh.add(hl1, hl2, tl1, tl2);

      const startPos = (Math.random() - 0.5) * 260;
      if (isX) {
        carMesh.position.set(startPos, 0, lane);
      } else {
        carMesh.position.set(lane, 0, startPos);
      }

      carGroup.add(carMesh);

      cars.push({
        mesh: carMesh,
        axis: isX ? 'x' : 'z',
        dir,
        lane,
        speed: 18 + Math.random() * 14,
        length: 280,
      });
    }

    // ANIMATED FLOATING LIGHT PARTICLES
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 200;
      particlePositions[i + 1] = Math.random() * 60 + 2;
      particlePositions[i + 2] = (Math.random() - 0.5) * 200;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.8,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // CONTINUOUS DYNAMIC CAMERA FLIGHT CONTROLLER
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const currentTarget = new THREE.Vector3(0, 8, 0);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      stateRef.current.time += delta;
      const t = stateRef.current.time;

      // Move all cars continuously along streets
      cars.forEach((car) => {
        if (car.axis === 'x') {
          car.mesh.position.x += car.dir * car.speed * delta;
          if (car.dir > 0 && car.mesh.position.x > 140) car.mesh.position.x = -140;
          if (car.dir < 0 && car.mesh.position.x < -140) car.mesh.position.x = 140;
        } else {
          car.mesh.position.z += car.dir * car.speed * delta;
          if (car.dir > 0 && car.mesh.position.z > 140) car.mesh.position.z = -140;
          if (car.dir < 0 && car.mesh.position.z < -140) car.mesh.position.z = 140;
        }
      });

      // Float particles
      const posArr = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        posArr[i] += delta * 1.5;
        if (posArr[i] > 60) posArr[i] = 2;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Auto-switch between cinematic perspectives continuously every cycleInterval
      const now = Date.now();
      if (now - stateRef.current.lastSwitchTime > stateRef.current.cycleInterval) {
        stateRef.current.lastSwitchTime = now;
        const modes: PerspectiveMode[] = ['bird', 'frog', 'normal'];
        const curIdx = modes.indexOf(stateRef.current.currentMode);
        stateRef.current.currentMode = modes[(curIdx + 1) % modes.length];
      }

      // CALCULATE ACTIVE PERSPECTIVE CAMERA PATH ("KØRENDE")
      let desiredCamPos = new THREE.Vector3();
      let desiredTarget = new THREE.Vector3();
      let targetFov = 50;

      if (stateRef.current.currentMode === 'bird') {
        // 🦅 FUGLEPERSPEKTIV: High-altitude sweeping 360° circular drone orbit
        // Continuously rotates around the city blocks showing the whole skyline, roofs, and traffic
        const orbitSpeed = 0.14; // radians per sec
        const radius = 68;
        const height = 55 + Math.sin(t * 0.25) * 8;
        desiredCamPos.set(
          Math.cos(t * orbitSpeed) * radius,
          height,
          Math.sin(t * orbitSpeed) * radius
        );
        desiredTarget.set(0, 8 + Math.sin(t * 0.2) * 3, 0);
        targetFov = 52;
      } else if (stateRef.current.currentMode === 'frog') {
        // 🐸 FRØPERSPEKTIV: Low ground angle driving along the avenue looking up
        // Camera stays at y = 1.8 (ground), moves continuously down the street looking up at high-rise facades
        const driveSpeed = 10.0;
        const streetPos = ((t * driveSpeed) % 180) - 90;
        desiredCamPos.set(4.5, 1.8, streetPos);
        // Looking up at the building tops at a 60° tilt angle
        desiredTarget.set(16, 32, streetPos + 18);
        targetFov = 68;
      } else {
        // 🚶 NORMALT PERSPEKTIV: Eye-level (y = 3.2) gliding forward through the residential streets
        // Smoothly cruises forward through the tree-lined avenues with apartments on both sides
        const driveSpeed = 8.5;
        const streetPos = ((t * driveSpeed) % 180) - 90;
        desiredCamPos.set(-2.8, 3.2, streetPos);
        desiredTarget.set(-2.0, 3.8, streetPos + 35);
        targetFov = 55;
      }

      // Smooth camera interpolation
      camera.position.lerp(desiredCamPos, 0.04);
      currentTarget.lerp(desiredTarget, 0.05);
      camera.lookAt(currentTarget);

      if (Math.abs(camera.fov - targetFov) > 0.1) {
        camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.04);
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none z-0">
      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* Light subtle cinematic overlay (lets the 3D buildings shine through brightly!) */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/40 pointer-events-none" />
    </div>
  );
};
