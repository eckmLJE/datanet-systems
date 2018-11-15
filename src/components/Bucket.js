import React, { Component } from "react";
import "./Bucket.css";

import Task from "./Task";

class Bucket extends Component {
  state = { showNewTask: false, taskName: "" };

  renderTasks = () =>
    this.props.tasks.map(task => (
      <Task
        task={task}
        key={task.id}
        demoteTask={this.props.demoteTask}
        promoteTask={this.props.promoteTask}
      />
    ));

  handleNewTaskButton = e => {
    e.preventDefault();
    this.setState({ showNewTask: !this.state.showNewTask });
  };

  handleNewTaskName = e => {
    this.setState({ taskName: e.target.value });
  };

  handleSubmitTaskButton = e => {
    e.preventDefault();
    const task = {
      bucketId: this.props.bucket.id,
      taskName: this.state.taskName
    };
    this.props.newTask(task);
    this.setState({ showNewTask: false, taskName: "" });
  };

  newTaskForm = () => {
    return (
      <form className="newTaskForm">
        <input
          name="taskName"
          onChange={this.handleNewTaskName}
          value={this.state.taskName}
        />
        <button onClick={this.handleSubmitTaskButton}>Create Task </button>
      </form>
    );
  };

  render() {
    return (
      <div className="bucket">
        <div className="bucket-inner">
          <h1>{this.props.bucket.title}</h1>
          <ul>{this.renderTasks()}</ul>
          {this.state.showNewTask ? (
            this.newTaskForm()
          ) : (
            <button onClick={this.handleNewTaskButton}>New Task</button>
          )}
        </div>
      </div>
    );
  }
}

export default Bucket;
