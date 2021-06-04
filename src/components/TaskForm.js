import React, { Component } from 'react'

import './TaskForm.css';

export default class TaskForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };
  }

  addTask() {
    // TODO: name to parent through props
    this.props.createTask(this.state.name);
  }

  inputHandler = (event) => {
    this.setState({
      name: event.target.value
    });
  }

  render() {
    return (
      <div className="task-form">
        <form>
          
          <div className="input-group mb-3">
            <input onChange={this.inputHandler} type="text" className="form-control" placeholder="Task" />
            <button onClick={() => this.addTask()} className="btn btn-outline-secondary" type="submit">
              +
            </button>
          </div>

        </form>
      </div>
    )
  }
}
