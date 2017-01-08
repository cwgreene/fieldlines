import {createScene} from './scene';

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

function setup() {
  const WIDTH = 1024;
  const HEIGHT = 768;

  const VIEW_ANGLE = 45;
  const ASPECT = WIDTH/HEIGHT;
  const NEAR = 0.1;
  const FAR = 10000;

  const container = document.querySelector('#container');
  const scene = new THREE.Scene();

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
  camera.position.z = -20;
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
  createScene(scene);
  const update = updateLoop(controls);
  renderCallback();
};

setup();
