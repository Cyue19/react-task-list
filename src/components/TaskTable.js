import React, { Component } from 'react'

export default class TaskTable extends Component {

  constructor(props) {
    super(props);
  }

  completeTask(task) {
    task.completed = !task.completed;
    if (task.completed) {
      const currDate = new Date();
      task.dateCompleted = (currDate.getMonth()+1) + "/" + currDate.getDate() + "/" + currDate.getFullYear();
    } else {
      task.dateCompleted = null;
    }

    this.props.updateTask(task);
  }

  removeTask(task) {
    this.props.removeTask(task);
  }

  render() {

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Completed</th>
              <th>Completed On</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.tasks.map(task => 
            <tr key={task.id}>
              <td>{task.name}</td>
              <td onClick={() => this.completeTask(task)}>{task.completed ? 
                <i className="bi bi-circle-fill"></i> : 
                <i className="bi bi-circle"></i>}
              </td>
              <td>{task.dateCompleted}</td>
              <td onClick={() => this.removeTask(task)}><i className="bi bi-trash"></i></td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }
}
