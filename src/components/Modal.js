import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const FormModal = props => {
  const className = props.isHidden ? 'hidden' : '';

  const keyPress = e => {
    if (e.key === 'Escape' && !props.isHidden) props.onDismiss();
  };

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => {
      document.removeEventListener('keydown', keyPress);
    };
  });

  return ReactDOM.createPortal(
    <div className={`modal ${className}`}>
      <button onClick={props.onDismiss} className="btn btn--close-modal">
        &times;
      </button>
      {props.content()}
    </div>,
    document.querySelector('#modal')
  );
};

export default FormModal;
