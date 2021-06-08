import { Component } from 'react';

import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import Task from './models/task';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    };
  }

  onTaskCreated(taskName) {
    const task = new Task(taskName, false, null);

    this.state.tasks.push(task);
    this.setState({
      tasks: this.state.tasks
    });
  }

  onTaskUpdated(task) {
    const updatedTasks = this.state.tasks.map(x => x.id === task.id ? task : x);
    this.setState({
      tasks: updatedTasks
    });
  }

  onTaskRemoved(task) {
    const updatedTasks = this.state.tasks.filter(x => x.id !== task.id);
    this.setState({
      tasks: updatedTasks
    });
  }

  render() {
    return (
      <div className="container mt-3">
        <div className="card card-body">

          <h1 className="text-center">Todo List</h1>

          <hr />

          <p className="text-center">Our simple TODO list</p>

          <TaskForm createTask={(taskName) => this.onTaskCreated(taskName)} />

          <TaskTable removeTask={(task) => this.onTaskRemoved(task)} updateTask={(task) => this.onTaskUpdated(task)} tasks={this.state.tasks} />

        </div>
      </div>
    );
  }
}

export default App;
