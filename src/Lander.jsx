import React, { useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  mainCanvas: {
    height: '800px',
    width: '1080px',
    border: '1px solid #F2F2F2'
  },
});

const Lander = () => {
  const classes = useStyles();
  const canvas = useRef();

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    ctx.beginPath();
    ctx.arc(400, 400, 40, 0, 2 * Math.PI);
    ctx.stroke(); 
  }, []);

  return (
    <canvas id="lander" ref={canvas} height="800" width="1080" className={classes.mainCanvas} />
  );
};

export default Lander;
