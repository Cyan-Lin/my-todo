import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { editNote, deleteNote } from '../actions/index';
import NoteForm from './NoteForm.js';
import Modal from './Modal.js';
import Overlay from './Overlay.js';

const NoteItem = ({ editNote, deleteNote, note }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [clicked, setClicked] = useState(true);

  const handleOpenForm = e => {
    e.preventDefault();
    setIsHidden(false);
  };

  const renderForm = id => {
    if (!isHidden) {
      return (
        <NoteForm
          initialValues={{
            label: note.label,
            title: note.title,
            description: note.description,
            pin: note.pin,
            completed: note.completed,
          }}
          onSubmit={onSubmitEdit}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          pin={note.pin}
          completed={note.completed}
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
    editNote(note.id, { title: 'No title', ...formValues });
    setIsHidden(true);
  };

  const handleDelete = e => {
    e.stopPropagation();
    deleteNote(note.id);
  };

  const handleEdit = (e, state) => {
    e.stopPropagation();
    editNote(note.id, { [state]: !note[state] });

    // 不知道為啥不用setState這個component就不會rerender...
    // 原本有json server的時候會自己rerender...
    setClicked(!clicked);
  };

  return (
    <>
      <li
        onClick={handleOpenForm}
        className={`notes__item ${note.pin ? 'notes__item--pinned' : ''}`}
      >
        <div className="notes__content">
          <h2 className="notes__title">{note.title}</h2>
          {/* 用<p>很難做到換行,所以後來使用textarea,並改造成<p>的外觀 */}
          <textarea
            className="notes__description"
            value={note.description}
            disabled
          ></textarea>
          <div className="notes__pin">
            <button
              onClick={e => handleEdit(e, 'pin')}
              className={`btn btn--pin ${note.pin ? 'btn--pin--active' : ''}`}
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
              note.completed && 'btn--completed--active'
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
