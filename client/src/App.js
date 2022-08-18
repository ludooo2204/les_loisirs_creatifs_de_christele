import React from 'react';

import logo from './logo.svg';
import './App.css';
// Import FirebaseAuth and firebase.
import Home from './components/Home'
// import SignInScreen from './components/SignIn'
import { Provider } from "react-redux";
import store from './store/store';


function App() {
  return (
    <Provider store={store}>
      <Home />
      {/* <SignInScreen /> */}
    </Provider>
  );
}

export default App
