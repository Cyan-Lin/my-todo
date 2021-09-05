import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createNote } from '../actions';
import NoteForm from './NoteForm.js';
import Modal from './Modal.js';
import Overlay from './Overlay.js';
import GoogleAuth from './GoogleAuth.js';

const Header = props => {
  const [isHidden, setIsHidden] = useState(true);

  const handleOpenForm = e => {
    e.preventDefault();
    if (props.isSignedIn) {
      setIsHidden(false);
    }
  };

  const renderForm = () => {
    return (
      <NoteForm
        initialValues={{
          label: 'no-label',
          description: '',
          pin: false,
          completed: false,
        }}
        onSubmit={onSubmit}
      />
    );
  };

  const renderModal = () => {
    if (!isHidden) {
      return (
        <>
          <Modal
            content={renderForm}
            isHidden={isHidden}
            onDismiss={() => setIsHidden(true)}
          />
        </>
      );
    }
  };

  const onSubmit = formValues => {
    props.createNote({ title: 'No title', ...formValues });
    setIsHidden(true);
  };

  return (
    <div className="header">
      <div className="logo">CyNote</div>
      <a
        onClick={handleOpenForm}
        href="/#"
        className={props.isSignedIn ? 'btn btn--open-modal-icon' : 'hidden'}
      >
        &nbsp;
      </a>
      <a onClick={handleOpenForm} href="/#" className="btn btn--open-modal">
        {props.isSignedIn ? 'Create note' : 'Sign in to Create note'}
      </a>

      <GoogleAuth />
      {renderModal()}
      <Overlay isHidden={isHidden} onDismiss={() => setIsHidden(true)} />
    </div>
  );
};

const mapStateToProps = state => {
  return { note: state.note, isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { createNote })(Header);

/*
original form

const [title, setTitle] = useState('');
  const [description, setdescription] = useState('');

  const handleClick = () => {
    props.createNote([title, description]);
    setTitle('');
    setdescription('');
  };

<div className="header">
      <div className="logo">CyNote</div>
      <div className="form">
        <div className="form__input-container">
          <input
            className="form__input-title"
            type="text"
            placeholder="Title"
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            className="form__input-description"
            name="note"
            id="note"
            cols="30"
            rows="1"
            placeholder="Put your note here!"
            onChange={e => setdescription(e.target.value)}
            value={description}
          ></textarea>
          <div className="message-container">
            <p className="message message--error">
              You must enter a description
            </p>
          </div>
        </div>
        <button onClick={handleClick} className="btn btn--submit">
          &nbsp;
        </button>
      </div>
    </div>


*/
