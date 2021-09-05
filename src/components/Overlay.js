import React from 'react';
import ReactDOM from 'react-dom';

const Overlay = props => {
  const className = props.isHidden ? 'hidden' : '';

  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className={`overlay ${className}`}></div>,
    document.querySelector('#overlay')
  );
};

export default Overlay;
