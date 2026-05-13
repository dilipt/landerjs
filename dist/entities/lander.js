export class Lander {
    constructor(startX, startY) {
        this.maxFuel = 1000;
        this.position = { x: startX, y: startY };
        this.velocity = { x: 0, y: 0 };
        this.thrust = { x: 0, y: 0 };
        this.fuel = this.maxFuel;
        this.angle = 0;
        this.width = 20;
        this.height = 30;
    }
    update(dt) {
        // Position is updated by physics engine
        // This can be used for animation or state updates
    }
    render(ctx) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate((this.angle * Math.PI) / 180);
        // Draw lander body
        ctx.strokeStyle = '#0f0';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -this.height / 2);
        ctx.lineTo(-this.width / 2, this.height / 2);
        ctx.lineTo(this.width / 2, this.height / 2);
        ctx.closePath();
        ctx.stroke();
        // Draw landing legs
        ctx.beginPath();
        ctx.moveTo(-this.width / 2, this.height / 2);
        ctx.lineTo(-this.width / 2 - 10, this.height / 2 + 15);
        ctx.moveTo(this.width / 2, this.height / 2);
        ctx.lineTo(this.width / 2 + 10, this.height / 2 + 15);
        ctx.stroke();
        // Draw thrust flame if burning
        if (this.thrust.x !== 0 || this.thrust.y !== 0) {
            ctx.fillStyle = '#ff8800';
            ctx.globalAlpha = 0.7;
            ctx.fillRect(-3, this.height / 2, 6, 15);
            ctx.globalAlpha = 1;
        }
        ctx.restore();
    }
    applyThrust(direction) {
        const thrustMagnitude = 200; // pixels per second squared
        this.thrust = {
            x: direction.x * thrustMagnitude,
            y: direction.y * thrustMagnitude,
        };
        // Consume fuel (simplified)
        if (direction.x !== 0 || direction.y !== 0) {
            this.fuel = Math.max(0, this.fuel - 1);
        }
    }
    getState() {
        return {
            position: { ...this.position },
            velocity: { ...this.velocity },
            thrust: { ...this.thrust },
            fuel: this.fuel,
            angle: this.angle,
            width: this.width,
            height: this.height,
        };
    }
}
//# sourceMappingURL=lander.js.map