import { Vector, LanderState, TerrainData } from './types.js';
export declare class PhysicsEngine {
    applyGravity(velocity: Vector, dt: number): Vector;
    applyThrust(velocity: Vector, thrust: Vector, dt: number): Vector;
    updatePosition(position: Vector, velocity: Vector, dt: number): Vector;
    clampVelocity(velocity: Vector): Vector;
    detectCollision(landerPosition: Vector, landerSize: number, terrain: TerrainData): boolean;
    private circleSegmentCollision;
    checkLandingCriteria(lander: LanderState, onLandingPad: boolean): {
        safe: boolean;
        reason: string;
    };
}
//# sourceMappingURL=physics.d.ts.map