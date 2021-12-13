import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import TasksCollection from "../api/TasksCollection";
import { Task, TaskForm } from "./components";
import logo from "./assets/logo.png"


import "./app.css";

export const App = () => {
  const tasks = useTracker(() => {
    return TasksCollection.find({}).fetch();
  });

  return (
    <div className="App w-100 mx-auto">
      <div className="container p-3 mx-auto d-flex flex-column align-items-center" style={{maxWidth: 500}}>

        <a href="/" className="logo mt-3 mb-5"><img src={logo} alt="Meteor To-Do" /></a>

        <TaskForm />

        <ul className="container-fluid p-0 d-flex flex-column" style={{ gap: 10 }}>
          {tasks.length > 0 ? (
            tasks.map((task) => <Task key={task._id} task={task} />)
          ) : (
            <p className="p-2 mx-auto">
              No tasks added yet. Add a task to start!
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};
