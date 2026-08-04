"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";

/* ── simplex noise (GLSL) ─────────────────────────────── */
const noiseChunk = /* glsl */ `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

/* ── state configurations ─────────────────────────────── */
const states = [
  {
    morph: 0.1, compress: 1.0, intensity: 1.0,
    rotate: 0.4, camY: 25, camDist: 85, orbit: 1.0,
  },
  {
    morph: 4.5, compress: 1.15, intensity: 1.4,
    rotate: 1.5, camY: 45, camDist: 95, orbit: 1.8,
  },
  {
    morph: 0.8, compress: 0.38, intensity: 3.5,
    rotate: 5.0, camY: 12, camDist: 55, orbit: 4.5,
  },
];

export function BlackHole() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ── renderer & scene ─────────────────────────────── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(60, 30, 60);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.6;
    container.appendChild(renderer.domElement);

    /* ── controls ──────────────────────────────────────── */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    controls.enableZoom = false;
    controls.enablePan = false;

    /* ── glassmorphic dark cosmic dish texture generators ── */
    function createDishTopTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const cx = 256;
        const cy = 256;
        const r = 230;

        ctx.clearRect(0, 0, 512, 512);

        // 1. Dark Frosted Glass Fill (High contrast backdrop for clean logo readability)
        const glassGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, r);
        glassGrad.addColorStop(0, "rgba(8, 10, 20, 0.75)");
        glassGrad.addColorStop(0.5, "rgba(14, 18, 35, 0.50)");
        glassGrad.addColorStop(0.85, "rgba(22, 28, 50, 0.25)");
        glassGrad.addColorStop(0.96, "rgba(255, 150, 60, 0.35)");
        glassGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = glassGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();

        // 2. Dual Accent Rim Ring (Harmonizes with black hole warm amber & indigo particles)
        const rimGrad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
        rimGrad.addColorStop(0, "rgba(255, 140, 50, 0.45)");
        rimGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.20)");
        rimGrad.addColorStop(1, "rgba(80, 160, 255, 0.45)");

        ctx.strokeStyle = rimGrad;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.94, 0, Math.PI * 2);
        ctx.stroke();

        // 3. Subtle Inner Specular Reflection
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.7, 0, Math.PI * 2);
        ctx.stroke();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    }

    function createUnderGlowTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const cx = 256;
        const cy = 256;
        const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 240);
        grad.addColorStop(0, "rgba(255, 130, 40, 0.35)");
        grad.addColorStop(0.4, "rgba(100, 160, 255, 0.18)");
        grad.addColorStop(0.75, "rgba(40, 60, 120, 0.05)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    }

    /* ── core: black hole + logo + glass dish platform ───────────── */
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Keep dummy auraMat for state transition compatibility
    const auraMat = { uniforms: { uIntensity: { value: 1.0 }, uTime: { value: 0 } } };

    // Load logo texture with crisp alpha filtering
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load("/logo.png");
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    logoTexture.minFilter = THREE.LinearFilter;
    logoTexture.magFilter = THREE.LinearFilter;

    // Premium crisp Logo Sprite (always faces camera, sized prominently)
    const logoMat = new THREE.SpriteMaterial({
      map: logoTexture,
      transparent: true,
      blending: THREE.NormalBlending,
      depthTest: true,
      depthWrite: false,
    });
    const logoSprite = new THREE.Sprite(logoMat);
    logoSprite.scale.set(18, 12.64, 1); // Prominent size (aspect ratio 353:248)
    logoSprite.position.set(0, 0, 0);
    logoSprite.renderOrder = 10;
    coreGroup.add(logoSprite);

    /* ── 3D Glassmorphic Underdish Platform Structure (Centered Dark Cosmic Lens) ── */
    const platformGroup = new THREE.Group();
    platformGroup.position.set(0, 0, 0);
    coreGroup.add(platformGroup);

    // 1. Sleek Dark Glass Core Body
    const dishGeo = new THREE.CylinderGeometry(10, 8.5, 0.4, 64, 1, true);
    const dishMat = new THREE.MeshBasicMaterial({
      color: 0x0c1020,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const dishMesh = new THREE.Mesh(dishGeo, dishMat);
    platformGroup.add(dishMesh);

    // 2. Dish Top Glass Surface Disc
    const dishTopGeo = new THREE.CircleGeometry(10, 64);
    dishTopGeo.rotateX(-Math.PI / 2);
    const dishTopMat = new THREE.MeshBasicMaterial({
      map: createDishTopTexture(),
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const dishTopMesh = new THREE.Mesh(dishTopGeo, dishTopMat);
    dishTopMesh.position.y = 0.2;
    platformGroup.add(dishTopMesh);

    // 3. Top Accent Glass Rim Ring (Soft warm-amber glow matching accretion disk)
    const topRimGeo = new THREE.TorusGeometry(10, 0.12, 16, 64);
    topRimGeo.rotateX(Math.PI / 2);
    const rimMat = new THREE.MeshBasicMaterial({
      color: 0xffa050,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    const topRimMesh = new THREE.Mesh(topRimGeo, rimMat);
    topRimMesh.position.y = 0.2;
    platformGroup.add(topRimMesh);

    // 4. Bottom Base Glass Rim Ring
    const botRimGeo = new THREE.TorusGeometry(8.5, 0.1, 16, 64);
    botRimGeo.rotateX(Math.PI / 2);
    const botRimMesh = new THREE.Mesh(botRimGeo, rimMat);
    botRimMesh.position.y = -0.2;
    platformGroup.add(botRimMesh);

    // 5. Under-Glow Halo Disk
    const glowGeo = new THREE.PlaneGeometry(24, 24);
    glowGeo.rotateX(-Math.PI / 2);
    const glowMat = new THREE.MeshBasicMaterial({
      map: createUnderGlowTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.4,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    glowMesh.position.y = 0;
    platformGroup.add(glowMesh);

    /* ── accretion disk (instanced) ───────────────────── */
    const instanceCount = 5000;
    const streakGeo = new THREE.CylinderGeometry(0.01, 0.12, 2.2, 3);
    streakGeo.rotateX(Math.PI / 2);

    const diskMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 0.1 },
        uCompression: { value: 1.0 },
        uIntensity: { value: 1.0 },
        uOrbitScale: { value: 1.0 },
      },
      vertexShader: /* glsl */ `
        ${noiseChunk}
        uniform float uTime;
        uniform float uMorph;
        uniform float uCompression;
        uniform float uIntensity;
        uniform float uOrbitScale;
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
          vec4 instPos = instanceMatrix * vec4(0.0,0.0,0.0,1.0);
          float rOriginal = length(instPos.xz);
          float r = rOriginal * uCompression;
          float initialAngle = atan(instPos.z, instPos.x);
          float orbitalVelocity = (1.5 / sqrt(rOriginal)) * uOrbitScale;
          float currentAngle = initialAngle + (uTime * orbitalVelocity);
          vec3 morphedWorldPos = vec3(cos(currentAngle)*r, instPos.y, sin(currentAngle)*r);
          float noise = snoise(vec3(morphedWorldPos.x*0.08, morphedWorldPos.z*0.08, uTime*0.3));
          morphedWorldPos.y += noise * uMorph * 4.0;
          vec3 viewDir = normalize(cameraPosition - morphedWorldPos);
          vec3 orbitDir = normalize(vec3(-sin(currentAngle), 0.0, cos(currentAngle)));
          float doppler = dot(orbitDir, viewDir);
          vec3 hot  = vec3(1.0, 0.95, 0.9);
          vec3 warm = vec3(1.0, 0.45, 0.1);
          vec3 cool = vec3(0.1, 0.35, 1.0);
          vec3 color = mix(cool, warm, smoothstep(45.0, 12.0, r));
          color = mix(color, hot, smoothstep(10.0, 4.0, r));
          vColor = color * (1.3 + doppler*0.7) * uIntensity;
          vOpacity = (smoothstep(3.8, 5.5, r) * (1.0 - smoothstep(38.0, 48.0, r))) * 0.8;
          float deltaAngle = currentAngle - initialAngle;
          float c = cos(deltaAngle);
          float s = sin(deltaAngle);
          mat3 rotY = mat3(c,0,s, 0,1,0, -s,0,c);
          vec3 localPos = (instanceMatrix * vec4(position,0.0)).xyz;
          vec3 rotatedLocalPos = rotY * localPos;
          gl_Position = projectionMatrix * viewMatrix * vec4(morphedWorldPos + rotatedLocalPos, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
          gl_FragColor = vec4(vColor, vOpacity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const instancedDisk = new THREE.InstancedMesh(streakGeo, diskMaterial, instanceCount);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < instanceCount; i++) {
      const r = 5 + Math.pow(Math.random(), 1.3) * 40;
      const angle = Math.random() * Math.PI * 2;
      dummy.position.set(
        Math.cos(angle) * r,
        (Math.random() - 0.5) * (8 / r),
        Math.sin(angle) * r,
      );
      dummy.lookAt(
        dummy.position.x + Math.sin(angle),
        dummy.position.y,
        dummy.position.z - Math.cos(angle),
      );
      dummy.updateMatrix();
      instancedDisk.setMatrixAt(i, dummy.matrix);
    }
    scene.add(instancedDisk);

    /* ── state transitions ────────────────────────────── */
    let stateIdx = 0;
    const camControl = { distance: 85 };

    function transition() {
      stateIdx = (stateIdx + 1) % states.length;
      const s = states[stateIdx];
      const tl = gsap.timeline({ defaults: { duration: 4.0, ease: "power2.inOut" } });
      tl.to(diskMaterial.uniforms.uMorph, { value: s.morph }, 0);
      tl.to(diskMaterial.uniforms.uCompression, { value: s.compress }, 0);
      tl.to(diskMaterial.uniforms.uIntensity, { value: s.intensity }, 0);
      tl.to(diskMaterial.uniforms.uOrbitScale, { value: s.orbit }, 0);
      tl.to(auraMat.uniforms.uIntensity, { value: s.intensity }, 0);
      tl.to(controls, { autoRotateSpeed: s.rotate }, 0);
      tl.to(camera.position, { y: s.camY }, 0);
      tl.to(camControl, { distance: s.camDist }, 0);
    }

    const intervalId = setInterval(transition, 10000);

    /* ── animation loop ───────────────────────────────── */
    const clock = new THREE.Clock();
    let animFrameId: number;

    function animate() {
      const time = clock.getElapsedTime();
      diskMaterial.uniforms.uTime.value = time;
      auraMat.uniforms.uTime.value = time;
      instancedDisk.rotation.y += 0.0005;

      // Subtle floating bob & breathing scale for logo & glass dish platform
      const breathe = 1.0 + 0.03 * Math.sin(time * 1.5);
      const floatY = 0.2 * Math.sin(time * 1.2);
      logoSprite.scale.set(18 * breathe, 12.64 * breathe, 1);
      logoSprite.position.y = floatY;

      platformGroup.position.y = floatY;
      platformGroup.scale.set(breathe, 1.0, breathe);
      platformGroup.rotation.y += 0.002;

      const currentDir = new THREE.Vector3()
        .subVectors(camera.position, controls.target)
        .normalize();
      camera.position.x = controls.target.x + currentDir.x * camControl.distance;
      camera.position.z = controls.target.z + currentDir.z * camControl.distance;

      controls.update();
      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(animate);
    }

    animate();

    /* ── resize ────────────────────────────────────────── */
    function onResize() {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    /* ── cleanup ───────────────────────────────────────── */
    return () => {
      clearInterval(intervalId);
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", onResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        background: "radial-gradient(circle at center, #010103 30%, #000 100%)",
        pointerEvents: "none",
      }}
    >
      {/* Vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle, transparent 50%, black 150%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </div>
  );
}
