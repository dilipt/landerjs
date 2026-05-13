import { Vector } from './types.js';

export class InputManager {
  private keys: Map<string, boolean> = new Map();

  constructor() {
    window.addEventListener('keydown', (e) => this.onKeyDown(e));
    window.addEventListener('keyup', (e) => this.onKeyUp(e));
  }

  private onKeyDown(event: KeyboardEvent) {
    this.keys.set(event.key.toLowerCase(), true);
  }

  private onKeyUp(event: KeyboardEvent) {
    this.keys.set(event.key.toLowerCase(), false);
  }

  getThrustInput(): Vector {
    const thrust: Vector = { x: 0, y: 0 };

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

  isKeyPressed(key: string): boolean {
    return this.keys.get(key.toLowerCase()) ?? false;
  }
}
