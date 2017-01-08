import * as numeric from 'numeric';
import {generateForceField} from './force';

interface Arrow3 {
  direction : THREE.Vector3;
  pos : THREE.Vector3;
  length : number;
};

const GRID_DIM = 12;
let grid : Arrow3[][][];

function addArrows(f, scene : THREE.Scene) {
  for (var i = 0; i < GRID_DIM; i++) {
    for (var j = 0; j < GRID_DIM; j++) {
      for (var k = 0; k < GRID_DIM; k++) {
        const vector = f(i,j,k);
        const force = new THREE.Vector3(vector[0],vector[1],vector[2]);
        scene.add(new THREE.ArrowHelper(
          force.normalize(),
          new THREE.Vector3(i,j,-k)));
      }
    }
  }
}

function updateLoop(controls) {
  function update() {
    window.requestAnimationFrame(update);
    controls.update();
  }
  window.requestAnimationFrame(update);

  return update;
}

function createControls(camera: THREE.Camera, update) {
  const controls = new THREE.TrackballControls(camera);
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;
  controls.keys = [ 65, 83, 68 ];
  controls.addEventListener( 'change', update );

  return controls;
}

function setupForceField() {
  const particles = [{pos:[5,2.5,0], q: -1},{pos:[5,7.5,0], q: 1}];
  return generateForceField(particles);
  //return function (x,y,z) { return [x, x*x, 1] }
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
  function renderCallback() {
    renderer.render(scene, camera);
  }
  const controls = createControls(camera, renderCallback);
  camera.position.z = 20;
  camera.position.x = 6;
  camera.position.y = 6;
  // The controls control where the camera is pointing,
  // called the target. It's best to have the controls have
  // sole ownership of this, so we change the target of the
  // controls, rather than the orientation of the camera.
  controls.target = new THREE.Vector3(6,6,0);
  scene.add(camera);
  renderer.setSize(WIDTH, HEIGHT);
  container.appendChild(renderer.domElement);
  const forceField = setupForceField();
  addArrows(forceField, scene);
  const update = updateLoop(controls);
  renderCallback();
};

console.log("hi");
setup();
