/*
 src/App.js
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.scss';
import { simpleAction } from './actions/simpleAction'

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
     <h1 className="App-title">Welcome to React</h1>
     <button onClick={this.simpleAction}>Test redux action</button>
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


/*import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

class App extends Component {
  
  state = { users: [] }

  componentDidMount() {
    fetch('/users')
    .then( res => res.json())
    .then( users => this.setState({ users}))
  }
  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <h1>Users</h1>
        <ul>
          {this.state.users.map(user =>
            <li key={user.id}>{user.username}</li>  
          )}
        </ul>
      </div>
    );
  }
}

export default App;
*/