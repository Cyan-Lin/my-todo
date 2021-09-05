import React, { useState } from 'react';
import { connect } from 'react-redux';

import { editNote, deleteNote } from '../actions/index';
import NoteForm from './NoteForm.js';
import Modal from './Modal.js';
import Overlay from './Overlay.js';

const NoteItem = props => {
  // console.log(props);

  const [isHidden, setIsHidden] = useState(true);

  const handleOpenForm = e => {
    e.preventDefault();
    setIsHidden(false);
  };

  const renderForm = id => {
    if (!isHidden) {
      return (
        <NoteForm
          initialValues={{
            label: props.note.label,
            title: props.note.title,
            description: props.note.description,
            pin: props.note.pin,
            completed: props.note.completed,
          }}
          onSubmit={onSubmitEdit}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          pin={props.note.pin}
          completed={props.note.completed}
          showControl={true}
        />
      );
    }
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

  const onSubmitEdit = formValues => {
    props.editNote(props.note.id, { title: 'No title', ...formValues });
    setIsHidden(true);
  };

  const handleDelete = e => {
    e.stopPropagation();
    props.deleteNote(props.note.id);
  };

  const handleEdit = (e, state) => {
    e.stopPropagation();
    props.editNote(props.note.id, { [state]: !props.note[state] });
  };

  return (
    <>
      <li
        onClick={handleOpenForm}
        className={`notes__item ${props.note.pin ? 'notes__item--pinned' : ''}`}
      >
        <div className="notes__content">
          <h2 className="notes__title">{props.note.title}</h2>
          {/* 用<p>很難做到換行,所以後來使用textarea,並改造成<p>的外觀 */}
          <textarea
            className="notes__description"
            value={props.note.description}
            disabled
          ></textarea>
          <div className="notes__pin">
            <button
              onClick={e => handleEdit(e, 'pin')}
              className={`btn btn--pin ${
                props.note.pin ? 'btn--pin--active' : ''
              }`}
            >
              &nbsp;
            </button>
          </div>
        </div>
        <div className="notes__control">
          <button className="btn btn--edit">&nbsp;</button>
          <button
            onClick={e => handleEdit(e, 'completed')}
            className={`btn btn--completed ${
              props.note.completed && 'btn--completed--active'
            }`}
          >
            &nbsp;
          </button>
          <button onClick={e => handleDelete(e)} className="btn btn--delete">
            &nbsp;
          </button>
        </div>
      </li>
      {renderModal()}
      <Overlay isHidden={isHidden} onDismiss={() => setIsHidden(true)} />
    </>
  );
};

export default connect(null, { editNote, deleteNote })(NoteItem);
