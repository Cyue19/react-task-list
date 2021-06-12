import React, { Component } from 'react'

import './TaskForm.css';

export default class TaskForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: "",
    };
  }

  addTask(e) {
    e.preventDefault(); //prevent page reload each time we submit
    this.props.createTask(this.state.title, this.state.description);

    this.setState({
      title: "",
      description: ""
    })
  }

  onTitleChanged(e) {
    e.preventDefault();
    this.setState({
      title: e.target.value
    });
  }

  onDescriptionChanged(e) {
    e.preventDefault();
    this.setState({
      description: e.target.value
    })
  }

  render() {
    return (
      <div className="task-form">
        <form onSubmit={(e) => this.addTask(e)}>
          
          <div className="input-group mb-3">
            <input onChange={(e)=>this.onTitleChanged(e)} value={this.state.title} type="text" className="form-control" placeholder="Title" />
            <input onChange={(e)=>this.onDescriptionChanged(e)} value={this.state.description} type="text" className="form-control" placeholder="Description" />
            <button className="btn btn-outline-secondary" type="submit">
              +
            </button>
          </div>

        </form>
      </div>
    )
  }
}
