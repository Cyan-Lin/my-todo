import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { toggleTab } from '../actions';

const Navbar = props => {
  const [openList, setOpenList] = useState(false);

  const closeList = e => {
    if (!e.target.closest('.nav__list')) {
      setOpenList(false);
    }
  };
  useEffect(() => {
    document.body.addEventListener('click', closeList);
    return () => {
      document.body.removeEventListener('click', closeList);
    };
  }, []);

  const btnOpenListOnClick = e => {
    e.preventDefault();
    setOpenList(true);
  };

  const handleToggleTab = (e, tab) => {
    e.preventDefault();
    props.toggleTab(tab);
    setOpenList(false);
  };

  return (
    <div className="navbar">
      <div className="nav">
        <ul className="nav__list" id={`${openList ? 'nav__list--active' : ''}`}>
          <a
            onClick={btnOpenListOnClick}
            href="/#"
            className="btn btn--open-radio-box"
          >
            openList
          </a>
          <li className="nav__item">
            <a
              onClick={e => handleToggleTab(e, 'all')}
              href="/#"
              className={`nav__link ${
                props.tab === 'all' ? 'nav__link--active' : ''
              }`}
            >
              All
            </a>
          </li>
          <li className="nav__item">
            <a
              onClick={e => handleToggleTab(e, 'do-first')}
              href="/#"
              className={`nav__link ${
                props.tab === 'do-first' ? 'nav__link--active' : ''
              }`}
            >
              Do First
            </a>
          </li>
          <li className="nav__item">
            <a
              onClick={e => handleToggleTab(e, 'schedule')}
              href="/#"
              className={`nav__link ${
                props.tab === 'schedule' ? 'nav__link--active' : ''
              }`}
            >
              Schedule
            </a>
          </li>
          <li className="nav__item">
            <a
              onClick={e => handleToggleTab(e, 'delegate')}
              href="/#"
              className={`nav__link ${
                props.tab === 'delegate' ? 'nav__link--active' : ''
              }`}
            >
              Delegate
            </a>
          </li>
          <li className="nav__item">
            <a
              onClick={e => handleToggleTab(e, 'delete')}
              href="/#"
              className={`nav__link ${
                props.tab === 'delete' ? 'nav__link--active' : ''
              }`}
            >
              Delete
            </a>
          </li>
          <li className="nav__item">
            <a
              onClick={e => handleToggleTab(e, 'completed')}
              href="/#"
              className={`nav__link ${
                props.tab === 'completed' ? 'nav__link--active' : ''
              }`}
            >
              Completed
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { tab: state.tab };
};

export default connect(mapStateToProps, { toggleTab })(Navbar);
