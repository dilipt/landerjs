export class TerrainGenerator {
    generateSurface(width, height, segmentCount = 20) {
        const points = [];
        const baselineY = height * 0.75; // terrain starts 3/4 down
        const roughness = height * 0.1;
        for (let i = 0; i <= segmentCount; i++) {
            const x = (i / segmentCount) * width;
            const randomOffset = (Math.random() - 0.5) * roughness;
            const y = baselineY + randomOffset;
            points.push({ x, y });
        }
        // Ensure points stay within bounds
        points.forEach(p => {
            p.y = Math.min(p.y, height - 20);
        });
        const segments = this.pointsToSegments(points);
        const landingPad = this.createLandingPad(points);
        return {
            points,
            segments,
            landingPad,
        };
    }
    pointsToSegments(points) {
        const segments = [];
        for (let i = 0; i < points.length - 1; i++) {
            segments.push({
                start: points[i],
                end: points[i + 1],
            });
        }
        return segments;
    }
    createLandingPad(points) {
        // Find a relatively flat section
        let bestIdx = 0;
        let bestFlatness = Infinity;
        const windowSize = 3;
        for (let i = 0; i < points.length - windowSize; i++) {
            const slopeVariance = this.calculateVariance(points, i, i + windowSize);
            if (slopeVariance < bestFlatness) {
                bestFlatness = slopeVariance;
                bestIdx = i;
            }
        }
        return {
            startIdx: bestIdx,
            endIdx: Math.min(bestIdx + 3, points.length - 1),
        };
    }
    calculateVariance(points, startIdx, endIdx) {
        const slopes = [];
        for (let i = startIdx; i < endIdx; i++) {
            const dy = points[i + 1].y - points[i].y;
            slopes.push(dy);
        }
        const mean = slopes.reduce((a, b) => a + b, 0) / slopes.length;
        const variance = slopes.reduce((acc, s) => acc + (s - mean) ** 2, 0) / slopes.length;
        return variance;
    }
    getTerrainHeightAt(x, terrain) {
        if (x < terrain.points[0].x)
            return terrain.points[0].y;
        if (x > terrain.points[terrain.points.length - 1].x) {
            return terrain.points[terrain.points.length - 1].y;
        }
        // Linear interpolation between points
        for (let i = 0; i < terrain.points.length - 1; i++) {
            const p1 = terrain.points[i];
            const p2 = terrain.points[i + 1];
            if (x >= p1.x && x <= p2.x) {
                const t = (x - p1.x) / (p2.x - p1.x);
                return p1.y + t * (p2.y - p1.y);
            }
        }
        return terrain.points[terrain.points.length - 1].y;
    }
    isOnLandingPad(x, terrain) {
        const padStart = terrain.points[terrain.landingPad.startIdx];
        const padEnd = terrain.points[terrain.landingPad.endIdx];
        return x >= padStart.x && x <= padEnd.x;
    }
}
//# sourceMappingURL=terrain.js.map