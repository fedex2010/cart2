/*
 src/App.js
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import { simpleAction } from './actions/simpleAction'
import './App.scss';
import Test from './components/Test/Test'

const mapStateToProps = state => ({
  ...state
 })

 const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
 })

class App extends Component {
 
  simpleAction = (event) => {
    this.props.simpleAction();
  }

  render() {
  return (
   <div className="App">
    <header className="App-header">
     <img src={logo} className="App-logo" alt="logo" />
     <Test />
     <h1 className="App-title">Welcome to React</h1>
     <button onClick={this.simpleAction} className='jerry'>Test redux action</button>
     <pre>
 {
  JSON.stringify(this.props)
 }
</pre>
    </header>
    <p className="App-intro">
     To get started, edit <code>src/App.js</code> and save to reload
    </p>
   </div>
  );
 }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);