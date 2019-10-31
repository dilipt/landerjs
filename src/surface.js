import Matter from 'matter-js';

const { Engine, Render, Runner, MouseConstraint, Mouse, World, Bodies } = Matter;

export const Surface = () => {
  const gravity = (canvas) => {
    const engine = Engine.create();
    const { world } = engine;

    // create renderer
    const render = Render.create({
      canvas,
      engine,
      options: {
        width: 1080,
        height: 700,
        showVelocity: true,
        showAngleIndicator: true
      }
    });

    Render.run(render);

    // create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    World.add(world, [
      Bodies.rectangle(540, 700, 1080, 50.5, { isStatic: true }),
      Bodies.polygon(540, 350, 3, 15),
    ]);

    // add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 1080, y: 700 }
    });

    // context for MatterTools.Demo
    return {
      engine: engine,
      runner: runner,
      render: render,
      canvas: render.canvas,
      stop: () => {
        Render.stop(render);
        Runner.stop(runner);
      },
    };
  };

  return {
    gravity,
  };
};
