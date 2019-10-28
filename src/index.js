import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { jss, JssProvider } from 'react-jss';

const styles = {
  '@global': {
    body: {
      fontFamily: '"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
      color: '#F2F2F2',
      backgroundColor: '#303030',
    },
    h1: {
      fontSize: '30px',
      margin: '15px 0',
    },
    h2: {
      fontSize: '24px',
      margin: '12px 0',
    },
    h3: {
      fontSize: '20px',
      margin: '10px 0',
    },
    h4: {
      fontSize: '16px',
      margin: '8px 0',
    },
    h5: {
      fontSize: '14px',
      margin: '7px 0',
    },
    h6: {
      fontSize: '12px',
      margin: '6px 0',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 1.1,
      fontWeight: '500',
    },
    p: {
      fontSize: '16px',
      marginBottom: '12px',
      lineHeight: 1.4,
    },
    span: {
      fontSize: '16px',
    },
  },
};

jss.setup();
jss.createStyleSheet(styles).attach();

ReactDOM.render(
  <JssProvider jss={jss}>
    <App />
  </JssProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
