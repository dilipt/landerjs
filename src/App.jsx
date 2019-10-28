import React from 'react';
import { createUseStyles } from 'react-jss';
import Lander from './Lander';

const useStyles = createUseStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px auto',
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <header>
        <h1>Land the Lunar Module!</h1>
      </header>
      <section>
        <Lander />
      </section>
      <footer>
        A Dilip Thomas production.
      </footer>
    </main>
  );
}

export default App;
