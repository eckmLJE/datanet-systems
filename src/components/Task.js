import React, { Component } from "react";
import "./Task.css";

class Task extends Component {
  renderPromoteButtons = () => {
    const bucketId = this.props.task.bucketId;
    if (bucketId === 1) {
      return (
        <span className="promote">
          <button onClick={this.handlePromoteClick}>{">"}</button>
        </span>
      );
    } else if (bucketId > 1 && bucketId < 4) {
      return (
        <span className="promote">
          <button onClick={this.handleDemoteClick}>{"<"}</button>
          <button onClick={this.handlePromoteClick}>{">"}</button>
        </span>
      );
    } else {
      return (
        <span className="promote">
          <button onClick={this.handleDemoteClick}>{"<"}</button>
        </span>
      );
    }
  };

  handlePromoteClick = e => {
    e.preventDefault();
    this.props.promoteTask(this.props.task);
  };

  handleDemoteClick = e => {
    e.preventDefault();
    this.props.demoteTask(this.props.task);
  };

  render() {
    return (
      <li className="task">
        <span>{this.props.task.taskName}</span>
        {this.renderPromoteButtons()}
      </li>
    );
  }
}
export default Task;
