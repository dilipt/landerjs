import { TerrainData } from './types.js';
export declare class TerrainGenerator {
    generateSurface(width: number, height: number, segmentCount?: number): TerrainData;
    private pointsToSegments;
    private createLandingPad;
    private calculateVariance;
    getTerrainHeightAt(x: number, terrain: TerrainData): number;
    isOnLandingPad(x: number, terrain: TerrainData): boolean;
}
//# sourceMappingURL=terrain.d.ts.map