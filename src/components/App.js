import React from 'react';

import '../main.scss';
import Header from './Header.js';
import Navbar from './Navbar.js';
import NoteView from './NoteView.js';

const App = () => {
  return (
    <div className="container">
      <Header />
      <Navbar />
      <NoteView />
    </div>
  );
};

export default App;
