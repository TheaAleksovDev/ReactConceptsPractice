import { type Task as TaskType } from "./TaskInterface";
import { useEffect, useState } from "react";
import Task from "./Task";
import "./tasks.css";

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const createItem = (task: string, category: string, priority: string) => {
    let completed = false;

    const markCompleted = () => {
      setTasks((prevTasks) =>
        prevTasks.map((prevTask) =>
          prevTask.task === task ? { ...prevTask, isCompleted: true } : prevTask
        )
      );
    };

    const deleteTask = () => {
      setTasks(tasks.filter((element) => element.task !== task));
    };

    setTasks((prev) => [
      ...prev,
      {
        isCompleted: completed,
        category,
        task,
        priority,
        markCompleted,
        deleteTask,
      },
    ]);
  };

  const displayTasks = tasks.map((task) => {
    return <Task key={task.task} {...task}></Task>;
  });

  return (
    <div className="tasks">
      <button
        onClick={() => {
          createItem("mytask", "mycategory", "urgent");
        }}
        className="green"
      >
        create
      </button>

      <div className="tasks">{tasks && displayTasks}</div>
    </div>
  );
};

export default Tasks;
