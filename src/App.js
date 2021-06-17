import { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import TaskList from "./components/TaskList";
import Task from './models/task';

import GuardedRoute from "./components/GuardedRoute";

import Firebase from "./firebase/firebase";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.db = Firebase.getInstance().db;
    this.auth = Firebase.getInstance().auth;

    this.state = {
      tasks: [],
      user: null,
      loading: true
    };
  }

  componentDidMount() {
    this.auth.onAuthStateChanged((user) => {
      this.setState({ 
        user: user, 
        loading: false 
      });
    });
  }

  render() {
    console.log(!(this.state.user));
    console.log(this.state.user);
    return (
      this.state.loading ?
      <div>Loading</div>
      :
      <BrowserRouter>
        <Route path="/" exact component={Home}/>
        <GuardedRoute path="/register" auth={!(this.state.user)} redirect="/" component={Register}/>
        <GuardedRoute path="/login" auth={!(this.state.user)} redirect="/" component={Login}/>
        <GuardedRoute path="/tasklist" redirect="/login" auth={this.state.user} component={TaskList}/>
      </BrowserRouter>
    );
  }
}

export default App;
