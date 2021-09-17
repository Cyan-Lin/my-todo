import React, { useCallback, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';

import { signIn, signOut } from '../actions';

const GoogleAuth = props => {
  // - In the custom hook, I would recommend storing 'auth' in a Ref. This will eliminate an unwanted re-render.
  const auth = useRef('');
  const dispatch = useDispatch();

  // 用useCallback解決warning: missing dependency
  const onAuthChange = useCallback(
    isSignedIn => {
      // auth.current.currentUser.get().getId()將獲得目前使用者之ID
      if (isSignedIn) dispatch(signIn(auth.current.currentUser.get().getId()));
      else dispatch(signOut());
    },
    [dispatch]
  );

  useEffect(() => {
    // load() only allows us to get a signal or notification when the loading process is complete by passing a callback function
    window.gapi.load('client:auth2', async () => {
      // wait for google to initialize our client
      // when calling init() it returns a promise
      await window.gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
        scope: 'email',
      });

      auth.current = window.gapi.auth2.getAuthInstance();
      onAuthChange(auth.current.isSignedIn.get());
      auth.current.isSignedIn.listen(onAuthChange);
    });
  }, [onAuthChange]);

  const onSignIn = e => {
    e.preventDefault();
    auth.current.signIn();
  };

  const onSignOut = e => {
    e.preventDefault();
    auth.current.signOut();
  };

  const renderAuthButton = () => {
    if (props.isSignedIn === null) {
      return null;
    } else if (props.isSignedIn) {
      return (
        <a onClick={onSignOut} href="/#" className="btn btn--login">
          <span className="btn btn--google">&nbsp;</span>
          Sign Out
        </a>
      );
    } else {
      return (
        <a onClick={onSignIn} href="/#" className="btn btn--login">
          <span className="btn btn--google">&nbsp;</span>
          Sign In
        </a>
      );
    }
  };

  return <>{renderAuthButton()}</>;
};

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps)(GoogleAuth);

///////////////////////////////////////////////////
// before using redux

// import React, { useEffect, useRef, useState } from 'react';

// const GoogleAuth = () => {
//   const auth = useRef('');
//   // we initially do not know if user is signed in
//   const [isSignedIn, setIsSignedIn] = useState(null);

//   console.log(auth);

//   useEffect(() => {
//     // load() only allows us to get a signal or notification when the loading process is complete by passing a callback function
//     window.gapi.load('client:auth2', async () => {
//       // wait for google to initialize our client
//       // when calling init() it returns a promise
//       await window.gapi.client.init({
//         clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
//         scope: 'email',
//       });

//       auth.current = window.gapi.auth2.getAuthInstance();
//       setIsSignedIn(auth.current.isSignedIn.get());
//       auth.current.isSignedIn.listen(onAuthChange);
//     });
//   }, []);

//   const onAuthChange = () => {
//     setIsSignedIn(auth.current.isSignedIn.get());
//   };

//   const onSignIn = () => {
//     auth.current.signIn();
//   };

//   const onSignOut = () => {
//     auth.current.signOut();
//   };

//   const renderAuthButton = () => {
//     if (isSignedIn === null) {
//       return null;
//     } else if (isSignedIn) {
//       return (
//         <a onClick={onSignOut} href="/#" className="btn btn--login">
//           <span className="btn btn--google">&nbsp;</span>
//           Sign Out
//         </a>
//       );
//     } else {
//       return (
//         <a onClick={onSignIn} href="/#" className="btn btn--login">
//           <span className="btn btn--google">&nbsp;</span>
//           Sign In
//         </a>
//       );
//     }
//   };

//   return <>{renderAuthButton()}</>;
// };

// export default GoogleAuth;
