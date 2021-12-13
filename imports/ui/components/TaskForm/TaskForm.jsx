import React, { useState } from "react";
import styles from "./taskForm.module.css";
import TasksCollection from "../../../api/TasksCollection";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

const TaskForm = () => {
  const [defaultTask, setDefaultTask] = useState({
    task: "",
  });

  const validate = Yup.object({
    task: Yup.string().min(3, "Minimum: 3 characters"),
  });

  function insertTask(values, resetForm) {
    TasksCollection.insert({
      text: values.task,
      date: new Date().toLocaleString(),
      done: false
    });
    resetForm()
  }

  return (
    <Formik
      initialValues={defaultTask}
      enableReinitialize
      validationSchema={validate}
      onSubmit={(values, {resetForm}) => insertTask(values, resetForm)}
    >
      <Form className={`${styles.taskForm}`}>
        <div className="d-flex mb-4" style={{ gap: 20 }}>
          <div className="w-100 d-flex flex-column">
            <Field
              type="text"
              name="task"
              className={`form-control shadow-none ${styles.input} mb-3`}
              placeholder="Add a task..."
              autoComplete="off"
            />
            <ErrorMessage component="div" name="task" className="text-danger" />
          </div>
          <button type="submit" className={`${styles.submit} btn`}>
            <i
              className="bi-plus-lg"
              style={{ transform: "translateY(1.5px)" }}
            ></i>
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default TaskForm;
