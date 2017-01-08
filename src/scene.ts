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

function setupForceField() {
  const particles = [{pos:[5,2.5,0], q: -1},{pos:[5,7.5,0], q: 1}];
  return generateForceField(particles);
  //return function (x,y,z) { return [x, x*x, 1] }
}


export function createScene(scene: THREE.Scene) {
  const forceField = setupForceField();
  addArrows(forceField, scene);
}
