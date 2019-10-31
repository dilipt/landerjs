import React, { useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Surface } from './surface'

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainCanvas: {
    height: '700px',
    width: '1080px',
    border: '1px solid #F2F2F2',
  },
});

const Lander = () => {
  const classes = useStyles();
  const canvas = useRef();
  const stopBtn = useRef();

  useEffect(() => {
    const surface = Surface(); 
    const { stop } = surface.gravity(canvas.current);
    stopBtn.current.addEventListener('click', stop);
  }, []);

  return (
    <div className={classes.container}>
      <canvas id="lander" ref={canvas} height="800" width="1080" className={classes.mainCanvas} />
      <button type="button" ref={stopBtn}>Stop</button>
    </div>
  );
};

export default Lander;
