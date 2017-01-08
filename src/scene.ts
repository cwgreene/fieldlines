import {generateForceField} from './force';
import {Particle} from './physicsTypes';

interface Arrow3 {
  direction : THREE.Vector3;
  pos : THREE.Vector3;
  length : number;
};

const GRID_DIM = 12;
let grid : Arrow3[][][];

function addArrows(scene : THREE.Scene, f) {
  for (var i = 0; i < GRID_DIM; i++) {
    for (var j = 0; j < GRID_DIM; j++) {
      for (var k = 0; k < GRID_DIM; k++) {
        const vector = f(i,j,k);
        const force = new THREE.Vector3(vector[0],vector[1],vector[2]);
        scene.add(new THREE.ArrowHelper(
          force.normalize(),
          new THREE.Vector3(i,j,k),
          force.length()/2));
      }
    }
  }
}

function setupForceField(particles: Particle[]) {
  return generateForceField(particles);
}

function addSphericalCharges(scene : THREE.Scene, particles: Particle[]) {
  const colors = new Map([
    [true, 0xff0000],
    [false, 0x0000ff]
  ]);
  for (const particle of particles) {
    console.log(particle);
    const geometry = new THREE.SphereGeometry(.25, 32, 32);
    const material = new THREE.MeshBasicMaterial({color: colors.get(particle.q>0)});
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = particle.pos[0];
    sphere.position.y = particle.pos[1];
    sphere.position.z = particle.pos[2];
    scene.add(sphere);
  }
}

export function createScene(scene: THREE.Scene) {
  const particles : Particle[] = [
    {pos:[5,2.5,0], q: -1},
    {pos:[5,7.5,0], q: 1},
  ];
  const forceField = setupForceField(particles);
  addArrows(scene, forceField);
  addSphericalCharges(scene, particles);
}
