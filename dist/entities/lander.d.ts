import { Vector, LanderState } from '../types.js';
export declare class Lander {
    position: Vector;
    velocity: Vector;
    thrust: Vector;
    fuel: number;
    angle: number;
    width: number;
    height: number;
    private maxFuel;
    constructor(startX: number, startY: number);
    update(dt: number): void;
    render(ctx: CanvasRenderingContext2D): void;
    applyThrust(direction: Vector): void;
    getState(): LanderState;
}
//# sourceMappingURL=lander.d.ts.map