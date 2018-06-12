import Matter from 'matter-js';

const { Engine, Render, World, Bodies } = Matter;

const canvas = document.querySelector('#cv');
const context = canvas.getContext('2d');

const engine = Engine.create();
const render = Render.create({
  element: document.body,
  engine,
});

const boxA = Bodies.rectangle(400, 200, 80, 80);
const boxB = Bodies.rectangle(450, 50, 80, 80);
const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

World.add(engine.world, [boxA, boxB, ground]);
Engine.run(engine);
Render.run(render);
