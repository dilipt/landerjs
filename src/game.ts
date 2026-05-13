import { Lander } from './entities/lander.js';
import { Surface } from './entities/surface.js';
import { Renderer } from './renderer.js';
import { InputManager } from './input.js';
import { PhysicsEngine } from './physics.js';
import { TerrainGenerator } from './terrain.js';
import { GameState } from './types.js';

export class Game {
  private lander: Lander;
  private surface: Surface;
  private renderer: Renderer;
  private input: InputManager;
  private physics: PhysicsEngine;
  private gameState: GameState;
  private lastTime: number = 0;

  constructor() {
    this.renderer = new Renderer('game-canvas');
    this.input = new InputManager();
    this.physics = new PhysicsEngine();

    // Generate terrain
    const terrainGenerator = new TerrainGenerator();
    const canvas = this.renderer.getCanvas();
    const terrain = terrainGenerator.generateSurface(canvas.width, canvas.height);
    this.surface = new Surface(terrain);

    // Spawn lander
    this.lander = new Lander(canvas.width / 2, 50);

    this.gameState = {
      isRunning: true,
      isGameOver: false,
      isLanded: false,
      isCrashed: false,
      time: 0,
    };
  }

  start() {
    this.lastTime = performance.now();
    this.gameLoop(this.lastTime);
  }

  private gameLoop = (currentTime: number) => {
    const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.016); // 16ms max frame
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame(this.gameLoop);
  };

  private update(dt: number) {
    if (!this.gameState.isRunning) return;

    // Get input
    const thrustInput = this.input.getThrustInput();
    this.lander.applyThrust(thrustInput);

    // Apply physics
    this.lander.velocity = this.physics.applyGravity(this.lander.velocity, dt);
    this.lander.velocity = this.physics.applyThrust(this.lander.velocity, this.lander.thrust, dt);
    this.lander.velocity = this.physics.clampVelocity(this.lander.velocity);

    // Update position
    this.lander.position = this.physics.updatePosition(this.lander.position, this.lander.velocity, dt);

    // Update angle based on velocity direction
    if (this.lander.velocity.x !== 0 || this.lander.velocity.y !== 0) {
      this.lander.angle = (Math.atan2(this.lander.velocity.x, -this.lander.velocity.y) * 180) / Math.PI;
    }

    // Check collisions
    if (this.physics.detectCollision(this.lander.position, this.lander.width, this.surface.terrain)) {
      const terrainGenerator = new TerrainGenerator();
      const onPad = terrainGenerator.isOnLandingPad(this.lander.position.x, this.surface.terrain);
      const landing = this.physics.checkLandingCriteria(this.lander.getState(), onPad);

      if (landing.safe) {
        this.gameState.isLanded = true;
        this.gameState.isGameOver = true;
        this.gameState.isRunning = false;
      } else {
        this.gameState.isCrashed = true;
        this.gameState.isGameOver = true;
        this.gameState.isRunning = false;
      }
    }

    // Keep lander in bounds
    const canvas = this.renderer.getCanvas();
    if (this.lander.position.x < 0) this.lander.position.x = 0;
    if (this.lander.position.x > canvas.width) this.lander.position.x = canvas.width;
    if (this.lander.position.y > canvas.height) {
      this.gameState.isCrashed = true;
      this.gameState.isGameOver = true;
      this.gameState.isRunning = false;
    }

    this.gameState.time += dt;
    this.lander.update(dt);
  }

  private render() {
    this.renderer.renderGame(this.lander, this.surface, this.gameState);
  }
}
