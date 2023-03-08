import { useEffect } from 'react';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import seedrandom from 'seedrandom';

export default function ThreeScene() {
  const hash = '3c8d0919882fb3f659a3a4523bb3c10c7b62e15c3d51e20849b8d676790f994c';

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const random = new Math.seedrandom(hash);

    function animate() {
      const duration = random() * 5;
      const x = random() * 10 - 5;
      const y = random() * 10 - 5;
      const z = random() * 10 - 5;
      const color = new THREE.Color(random() * 0xffffff);

      new TWEEN.Tween(mesh.position)
        .to({ x, y, z }, duration * 1000)
        .start();

      new TWEEN.Tween(material.color)
        .to(color, duration * 1000)
        .start();

      new TWEEN.Tween(this)
        .to({}, duration * 1000)
        .onComplete(animate)
        .start();

      TWEEN.update();
      renderer.render(scene, camera);
    }

    animate();

    document.body.appendChild(renderer.domElement);

    return () => {
      renderer.domElement.remove();
    };
  }, []);

  return null;
}
