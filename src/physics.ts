import { Vector, LanderState, TerrainData, Segment } from './types.js';

const GRAVITY = 1.62; // lunar gravity m/s^2 (scaled for pixels)
const MAX_VELOCITY = 50;
const CRASH_VELOCITY_THRESHOLD = 5; // max safe landing velocity
const CRASH_ANGLE_THRESHOLD = 15; // max safe angle in degrees

export class PhysicsEngine {
  applyGravity(velocity: Vector, dt: number): Vector {
    return {
      x: velocity.x,
      y: velocity.y + GRAVITY * dt,
    };
  }

  applyThrust(velocity: Vector, thrust: Vector, dt: number): Vector {
    const thrustScale = 0.2; // tune this for feel
    return {
      x: velocity.x + thrust.x * thrustScale * dt,
      y: velocity.y + thrust.y * thrustScale * dt,
    };
  }

  updatePosition(position: Vector, velocity: Vector, dt: number): Vector {
    return {
      x: position.x + velocity.x * dt,
      y: position.y + velocity.y * dt,
    };
  }

  clampVelocity(velocity: Vector): Vector {
    const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
    if (speed > MAX_VELOCITY) {
      const scale = MAX_VELOCITY / speed;
      return {
        x: velocity.x * scale,
        y: velocity.y * scale,
      };
    }
    return velocity;
  }

  detectCollision(landerPosition: Vector, landerSize: number, terrain: TerrainData): boolean {
    // Simple circle-segment collision
    for (const segment of terrain.segments) {
      if (this.circleSegmentCollision(landerPosition, landerSize / 2, segment)) {
        return true;
      }
    }
    return false;
  }

  private circleSegmentCollision(center: Vector, radius: number, segment: Segment): boolean {
    const dx = segment.end.x - segment.start.x;
    const dy = segment.end.y - segment.start.y;
    const len2 = dx * dx + dy * dy;

    if (len2 === 0) {
      const distToPoint = Math.hypot(center.x - segment.start.x, center.y - segment.start.y);
      return distToPoint <= radius;
    }

    let t = ((center.x - segment.start.x) * dx + (center.y - segment.start.y) * dy) / len2;
    t = Math.max(0, Math.min(1, t));

    const closestX = segment.start.x + t * dx;
    const closestY = segment.start.y + t * dy;

    const distance = Math.hypot(center.x - closestX, center.y - closestY);
    return distance <= radius;
  }

  checkLandingCriteria(lander: LanderState, onLandingPad: boolean): { safe: boolean; reason: string } {
    const speed = Math.sqrt(lander.velocity.x ** 2 + lander.velocity.y ** 2);

    if (!onLandingPad) {
      return { safe: false, reason: 'Not on landing pad' };
    }

    if (speed > CRASH_VELOCITY_THRESHOLD) {
      return { safe: false, reason: `Too fast: ${speed.toFixed(1)} m/s` };
    }

    const angle = Math.abs(lander.angle);
    if (angle > CRASH_ANGLE_THRESHOLD) {
      return { safe: false, reason: `Tilted too much: ${angle.toFixed(1)}°` };
    }

    return { safe: true, reason: 'Safe landing!' };
  }
}
