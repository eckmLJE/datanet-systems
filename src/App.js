import React, { Component } from "react";
import "./App.css";

import Bucket from "./components/Bucket";

class App extends Component {
  state = {
    buckets: [
      {
        title: "Planning",
        id: 1,
        tasks: [
          { id: 1, bucketId: 1, taskName: "task1" },
          { id: 2, bucketId: 1, taskName: "task2" }
        ]
      },
      {
        title: "Design",
        id: 2,
        tasks: [
          { id: 3, bucketId: 2, taskName: "task3" },
          { id: 4, bucketId: 2, taskName: "task4" }
        ]
      },
      {
        title: "Development",
        id: 3,
        tasks: [
          { id: 5, bucketId: 3, taskName: "task5" },
          { id: 6, bucketId: 3, taskName: "task6" }
        ]
      },
      {
        title: "Deployment",
        id: 4,
        tasks: [
          { id: 7, bucketId: 4, taskName: "task7" },
          { id: 8, bucketId: 4, taskName: "task8" }
        ]
      }
    ]
  };

  taskIdCounter = 9;

  filterTasks = (tasks, bucketId) =>
    tasks.filter(task => task.bucketId === bucketId);

  newTask = task => {
    task.id = this.taskIdCounter++;
    let oldState = this.state;
    let bucket = oldState.buckets.find(bucket => bucket.id === task.bucketId);
    bucket.tasks.push(task);
    this.setState(oldState);
  };

  promoteTask = task => {
    let oldState = this.state;
    let bucket = oldState.buckets.find(bucket => bucket.id === task.bucketId);
    bucket.tasks = bucket.tasks.filter(oldtask => oldtask.id !== task.id);
    let newBucket = oldState.buckets.find(
      bucket => bucket.id === task.bucketId + 1
    );
    task.bucketId = task.bucketId + 1;
    newBucket.tasks.push(task);
    this.setState({ oldState });
  };

  demoteTask = task => {
    let oldState = this.state;
    let bucket = oldState.buckets.find(bucket => bucket.id === task.bucketId);
    bucket.tasks = bucket.tasks.filter(oldtask => oldtask.id !== task.id);
    let newBucket = oldState.buckets.find(
      bucket => bucket.id === task.bucketId - 1
    );
    task.bucketId = task.bucketId - 1;
    newBucket.tasks.push(task);
    this.setState({ oldState });
  };

  render() {
    return (
      <div className="App">
        <section className="kanban">
          {this.state.buckets.map(bucket => (
            <Bucket
              key={bucket.id}
              bucket={bucket}
              tasks={bucket.tasks}
              promoteTask={this.promoteTask}
              demoteTask={this.demoteTask}
              newTask={this.newTask}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
