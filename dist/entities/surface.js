export class Surface {
    constructor(terrain) {
        this.terrain = terrain;
    }
    render(ctx) {
        ctx.strokeStyle = '#0f0';
        ctx.lineWidth = 2;
        // Draw terrain
        ctx.beginPath();
        ctx.moveTo(this.terrain.points[0].x, this.terrain.points[0].y);
        for (let i = 1; i < this.terrain.points.length; i++) {
            const point = this.terrain.points[i];
            ctx.lineTo(point.x, point.y);
        }
        ctx.stroke();
        // Draw landing pad (highlight)
        const padStart = this.terrain.points[this.terrain.landingPad.startIdx];
        const padEnd = this.terrain.points[this.terrain.landingPad.endIdx];
        ctx.strokeStyle = '#ffff00';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(padStart.x, padStart.y);
        ctx.lineTo(padEnd.x, padEnd.y);
        ctx.stroke();
        // Reset stroke
        ctx.strokeStyle = '#0f0';
        ctx.lineWidth = 2;
    }
}
//# sourceMappingURL=surface.js.map