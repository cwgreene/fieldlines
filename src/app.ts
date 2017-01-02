import * as THREE from "three";

interface Arrow3 {
  direction : THREE.Vector3;
  pos : THREE.Vector3;
  length : number;
};

const GRID_DIM = 12;
let grid : Arrow3[][][];

function addArrows(scene : THREE.Scene) {
  for (var i = 0; i < GRID_DIM; i++) {
    for (var j = 0; j < GRID_DIM; j++) {
      for (var k = 0; k < GRID_DIM; k++) {
        console.log("doom2");
        scene.add(new THREE.ArrowHelper(
          new THREE.Vector3(-i,-j,k).normalize(),
          new THREE.Vector3(i,j,-k)));
      }
    }
  }
}

function updateLoop(renderer : THREE.Renderer,
  scene : THREE.Scene,
  camera : THREE.Camera) {
  console.log("hey");
  renderer.render(scene, camera);
  function update() {
    renderer.render(scene, camera);
  }
  console.log("hey");
  window.requestAnimationFrame(update);
}

function setup() {
  const WIDTH = 1024;
  const HEIGHT = 768;

  const VIEW_ANGLE = 45;
  const ASPECT = WIDTH/HEIGHT;
  const NEAR = 0.1;
  const FAR = 10000;

  const container = document.querySelector('#container');
  const scene = new THREE.Scene();
  console.log("doom");
  const renderer = new THREE.WebGLRenderer();
  const camera = new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR);
  camera.position.z = 20;
  camera.position.x = 6;
  camera.position.y = 6;
  camera.lookAt(new THREE.Vector3(6,6,0));
  scene.add(camera);
  renderer.setSize(WIDTH, HEIGHT);
  container.appendChild(renderer.domElement);
  addArrows(scene);
  updateLoop(renderer, scene, camera);
};

console.log("hi");
setup();
