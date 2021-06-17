export default class Task {
  constructor(title, description, completed, dateCompleted, id, userId) {
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.dateCompleted = dateCompleted;
    this.id = id;
    this.userId = userId;
  }
}
