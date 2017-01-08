import * as numeric from 'numeric';

export function centralForce(a, b, f) {
  const dist = numeric.sub(a,b);
  const r = numeric.norm2(dist);
  const force = f(r);
  return [force*dist[0]/r, force*dist[1]/r, force*dist[2]/r];
}

export function inverseSquareForce(a, b) {
    // Force is 1/r² in the r-hat (r̂) direction.
    // Which means the force is (x/r³)x̂+ (y/r³)ŷ
    // where x and y are the compoents in the distance
    // vector between the two vectors a,b
    const dist = numeric.sub(a,b);
    const norm = numeric.norm2(dist);
    const r3 = Math.pow(Math.sqrt(norm), 3);
    return [dist[0]/r3, dist[1]/r3, dist[2]/r3];
}

export function generateForceField(particles) {
  return function(x: number, y: number, z: number) {
    let totalForce = [0, 0, 0];
    for (const particle of particles) {
      totalForce = numeric.add(totalForce, numeric.mul(particle.q,
        inverseSquareForce([x, y, z], particle.pos)));
    }
    return totalForce;
  }
}
