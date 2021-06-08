export default class Task {
  constructor(name, completed, dateCompleted) {
    this.name = name;
    this.completed = completed;
    this.dateCompleted = dateCompleted;
    this.id = Date.now();
  }
}
