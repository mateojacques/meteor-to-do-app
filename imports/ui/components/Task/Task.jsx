import React from "react";
import styles from "./task.module.css";
import TasksCollection from "../../../api/TasksCollection";

const Task = ({ task }) => {
  function toggleDoneTask(taskId) {
    if (TasksCollection.findOne({ _id: taskId }).done) {
      TasksCollection.update({ _id: taskId }, { $set: { done: false } });
    } else {
      TasksCollection.update({ _id: taskId }, { $set: { done: true } });
    }
  }

  return (
    <article className={`${styles.task} border-bottom align-items-center py-3`}>
      <input
        type="checkbox"
        onChange={() => toggleDoneTask(task._id)}
        checked={task.done ? "checked" : ""}
      />
      <div className="d-flex flex-column justify-content-center">
        <li className={`mb-2 ${task.done ? styles.done : ""}`}>{task.text}</li>
        <p>{task.date}</p>
      </div>
      <div className="d-flex" style={{ gap: 15 }}>
        <button
          className="btn"
          onClick={() =>
            TasksCollection.update(
              { _id: task._id },
              {
                $set: {
                  text: window.prompt("Enter a new value"),
                },
              }
            )
          }
        >
          <i className="bi-pencil"></i>
        </button>
        <button
          className="btn"
          onClick={() => TasksCollection.remove({ _id: task._id })}
        >
          <i className="bi-trash"></i>
        </button>
      </div>
    </article>
  );
};

export default Task;
