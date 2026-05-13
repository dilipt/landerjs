export class InputManager {
    constructor() {
        this.keys = new Map();
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));
    }
    onKeyDown(event) {
        this.keys.set(event.key.toLowerCase(), true);
    }
    onKeyUp(event) {
        this.keys.set(event.key.toLowerCase(), false);
    }
    getThrustInput() {
        const thrust = { x: 0, y: 0 };
        if (this.keys.get('arrowup')) {
            thrust.y = -1; // thrust up (negative y)
        }
        if (this.keys.get('arrowdown')) {
            thrust.y = 1; // thrust down (positive y)
        }
        if (this.keys.get('arrowleft')) {
            thrust.x = -1; // thrust left (negative x)
        }
        if (this.keys.get('arrowright')) {
            thrust.x = 1; // thrust right (positive x)
        }
        return thrust;
    }
    isKeyPressed(key) {
        return this.keys.get(key.toLowerCase()) ?? false;
    }
}
//# sourceMappingURL=input.js.map