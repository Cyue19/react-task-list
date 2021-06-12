import { Component } from 'react';

import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import Task from './models/task';

import firebase from "./firebase/firebase";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.db = firebase.firestore();
    this.auth = firebase.auth();

    this.fetchTasksFromFireStore();

    this.state = {
      tasks: []
    };
  }

  async fetchTasksFromFireStore() {
    try {
      const tasks = [];

      const snapShot = await this.db.collection("tasks").get();
      for (let doc of snapShot.docs) {
        const task = new Task(doc.data().title, doc.data().description, doc.data().completed, doc.data().dateCompleted, doc.id)
        tasks.push(task);
      }

      this.setState({
        tasks: tasks
      });
    } catch(err) {
      console.log(err);
    }
  }

  async onTaskCreated(taskTitle, taskDescription) {
    const task = new Task(taskTitle, taskDescription, false, null);

    try {
      const docRef = await this.db.collection("tasks").add({
      title: task.title,
      description: task.description,
      completed: task.completed,
      dateCompleted: task.dateCompleted
      });
    task.id = docRef.id;

    this.state.tasks.push(task);
    this.setState({
      tasks: this.state.tasks
    });

    } catch(err) {
      console.log(err);
    }
  }

  async onTaskUpdated(task) {
    try {
      await this.db.collection("tasks").doc(task.id).update({
        title: task.title,
        description: task.description,
        completed: task.completed,
        dateCompleted: task.dateCompleted
      });

      const updatedTasks = this.state.tasks.map(x => x.id === task.id ? task : x);
      this.setState({
        tasks: updatedTasks
      });
    } catch(err) {
      console.log(err);
    }
  }

  async onTaskRemoved(task) {
    try {
      await this.db.collection("tasks").doc(task.id).delete();

      const updatedTasks = this.state.tasks.filter(x => x.id !== task.id);
      this.setState({
        tasks: updatedTasks
      });
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="container mt-3">
        <div className="card card-body">

          <h1 className="text-center">Todo List</h1>

          <hr />

          <p className="text-center">Our simple TODO list</p>

          <TaskForm createTask={(taskTitle, taskDescription) => this.onTaskCreated(taskTitle, taskDescription)} />

          <TaskTable removeTask={(task) => this.onTaskRemoved(task)} updateTask={(task) => this.onTaskUpdated(task)} tasks={this.state.tasks} />

        </div>
      </div>
    );
  }
}

export default App;
