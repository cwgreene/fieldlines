import * as numeric from 'numeric';
import {Particle} from './physicsTypes';

/*
 * Given two vectors and a one dimensional force function f, returns
 * a force in the r̂ direction of magnitude f(|a-b|).
 */
export function centralForce(a: number[],
  b: number[],
  f: (r:number) => number) {
  const dist = numeric.sub(b,a);
  const r = numeric.norm2(dist);
  const force = f(r);
  return [force*dist[0]/r, force*dist[1]/r, force*dist[2]/r];
}

/*
 * Generates forcefield at the point (x,y,z).
 */
export function generateForceField(particles : Particle[]) {
  const isq = (a,b) => centralForce(a,b, (r) => 1/(r*r));
  return function(x: number, y: number, z: number) {
    let totalForce = [0, 0, 0];
    for (const particle of particles) {
      totalForce = numeric.add(totalForce, numeric.mul(particle.q,
        isq([x, y, z], particle.pos)));
    }
    return totalForce;
  }
}
