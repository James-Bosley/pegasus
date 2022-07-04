import { useEffect, useRef } from "react";
import { GLTFLoader } from "../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import model from "../../assets/ShuttlecockModelFiddle.glb";
import * as THREE from "three";
import "./shuttleAnimation.scss";

const ShuttleAnimation = () => {
  const hook = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    // Get container to determine sizing.
    const dimensions = hook.current.getBoundingClientRect();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(6, dimensions.width / dimensions.height, 1, 10);

    camera.position.z = 1.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(dimensions.width, dimensions.height);

    // Load shuttlecock model.
    const loader = new GLTFLoader();

    loader.load(model, gltf => {
      const root = gltf.scene;
      root.scale.set(2, 2, 2);
      root.position.x = 0; //Position (x = right+ left-)
      root.position.y = 0; //Position (y = up+, down-)
      root.position.z = 0; //Position (z = front +, back-)
      scene.add(root);
    });

    // Load lighting.
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xefefff, 2);
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(directionalLight);

    // Capture mouse position.
    let mouseX = 0;
    let mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    window.addEventListener("mousemove", e => {
      mouseX = (e.clientX - windowHalfX) / 200;
      mouseY = (e.clientY - windowHalfY) / 200;
    });

    // Set up and initiate animation loop.
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      camera.position.x += (-mouseX - camera.position.x) * 1.5;
      camera.position.y += (mouseY - camera.position.y) * 1.5;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    hook.current.appendChild(renderer.domElement);
    animate();

    // Returns a function to clean up the animation and prevent memory leakage.
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return <div className="shuttle" ref={hook}></div>;
};

export default ShuttleAnimation;
