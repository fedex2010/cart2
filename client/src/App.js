
import React, { Component } from 'react';
import { connect } from 'react-redux';


import Alert from './components/alert/alert';

import './App.scss';



class App extends Component {
 


  render() {
  return (
   <div className="App">
      <Alert/>
   </div>
  );
 }
}
export default App;


