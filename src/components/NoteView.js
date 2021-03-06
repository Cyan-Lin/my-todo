import React from 'react';
import { connect } from 'react-redux';

import NoteItem from './NoteItem.js';

const NoteView = ({ notes, auth }) => {
  const renderList = () => {
    if (auth.isSignedIn)
      return notes
        .filter(note => note.userId === auth.userId)
        .map((note, i) => <NoteItem note={note} key={i} />);
    else return null;
  };

  return (
    <div className="note-view">
      <div className="notes">
        <ul className="notes__list">
          {/* noteItem component */}
          {/* <NoteItem /> */}
          {renderList()}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  // console.log(state);
  // 要用Object.values把裡面的array取出來
  // 先取出符合的tab的note
  if (state.tab === 'all') {
    const notes = Object.values(state.notes).filter(note => {
      return !note.completed;
    });
    return { notes: notes, auth: state.auth };
    //
  } else if (state.tab === 'completed') {
    const notes = Object.values(state.notes).filter(note => {
      return note.completed;
    });
    return { notes: notes, auth: state.auth };
    //
  } else {
    const notes = Object.values(state.notes).filter(note => {
      return note.label === state.tab && !note.completed;
    });
    return { notes: notes, auth: state.auth };
  }
};

export default connect(mapStateToProps)(NoteView);
