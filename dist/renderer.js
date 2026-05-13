export class Renderer {
    constructor(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            throw new Error(`Canvas with id "${canvasId}" not found`);
        }
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        // Resize canvas to window size
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    clear() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    renderGame(lander, surface, gameState) {
        this.clear();
        // Draw surface
        surface.render(this.ctx);
        // Draw lander
        lander.render(this.ctx);
        // Draw HUD
        this.renderHUD(lander, gameState);
    }
    renderHUD(lander, gameState) {
        const hudDiv = document.getElementById('status');
        if (!hudDiv)
            return;
        let statusText = '';
        if (gameState.isGameOver && gameState.isCrashed) {
            statusText = '💥 CRASHED';
        }
        else if (gameState.isGameOver && gameState.isLanded) {
            statusText = '✓ LANDED SAFELY';
        }
        else {
            const speed = Math.sqrt(lander.velocity.x ** 2 + lander.velocity.y ** 2).toFixed(1);
            const fuel = Math.round(lander.fuel);
            statusText = `Speed: ${speed} | Fuel: ${fuel}`;
        }
        hudDiv.textContent = statusText;
    }
    getCanvas() {
        return this.canvas;
    }
    getContext() {
        return this.ctx;
    }
}
//# sourceMappingURL=renderer.js.map