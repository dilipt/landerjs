const component = () => {
  const elm = document.createElement('div');
  elm.innerHTML = 'Hello, from webpack!';
  return elm;
};

document.body.appendChild(component());
