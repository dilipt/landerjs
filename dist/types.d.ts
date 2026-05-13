export interface Vector {
    x: number;
    y: number;
}
export interface Bounds {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface Segment {
    start: Vector;
    end: Vector;
}
export interface GameState {
    isRunning: boolean;
    isGameOver: boolean;
    isLanded: boolean;
    isCrashed: boolean;
    time: number;
}
export interface LanderState {
    position: Vector;
    velocity: Vector;
    thrust: Vector;
    fuel: number;
    angle: number;
    width: number;
    height: number;
}
export interface TerrainData {
    points: Vector[];
    segments: Segment[];
    landingPad: {
        startIdx: number;
        endIdx: number;
    };
}
//# sourceMappingURL=types.d.ts.map