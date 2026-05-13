import { Lander } from './entities/lander.js';
import { Surface } from './entities/surface.js';
import { GameState } from './types.js';
export declare class Renderer {
    private canvas;
    private ctx;
    constructor(canvasId: string);
    private resize;
    clear(): void;
    renderGame(lander: Lander, surface: Surface, gameState: GameState): void;
    private renderHUD;
    getCanvas(): HTMLCanvasElement;
    getContext(): CanvasRenderingContext2D;
}
//# sourceMappingURL=renderer.d.ts.map