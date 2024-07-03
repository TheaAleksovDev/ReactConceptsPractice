import { type Task as TaskType } from "./TaskInterface";
import { useEffect, useState } from "react";
import Task from "./Task";
import "./tasks.css";
import CreateTask from "./CreateTask";
import { useContext } from "react";
import { BuddiesContext } from "../BuddiesContext";
import { Buddy } from "../WorkBuddies/BuddyInterface";

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [openCreateTask, setOpenCreateTask] = useState(false);
  const categories = ["work", "life", "school"];
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const { contextData } = useContext(BuddiesContext);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const markCompleted = (task: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((prevTask) =>
        prevTask.task === task ? { ...prevTask, isCompleted: true } : prevTask
      )
    );
  };

  const deleteTask = (task: string) => {
    const filteredTasks = tasks.filter((element) => element.task !== task);
    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const createItem = (task: string, category: string, isUrgent: boolean) => {
    const existingTask = tasks.find((element) => element.task === task);

    if (existingTask) {
      return;
    }

    setTasks((prev) => [
      ...prev,
      {
        isCompleted: false,
        category,
        task,
        isUrgent,
      },
    ]);
  };

  const filterTasks = (isUrgent: boolean) => (category: string) => {
    return tasks.filter(
      (task) => task.isUrgent === isUrgent && task.category === category
    );
  };

  //not the best example of currying, couldn't think of anything better
  const filteredTasks =
    isUrgent && selectedCategory
      ? filterTasks(isUrgent)(selectedCategory)
      : tasks;

  const displayTasks = filteredTasks.map((item) => {
    return (
      <Task
        key={item.task}
        {...item}
        markCompleted={markCompleted}
        deleteTask={deleteTask}
      />
    );
  });

  const displayContext = contextData?.map((buddy: Buddy, index) => {
    return (
      <div className="buddy-smaller" key={index}>
        <img src={buddy.url} alt="buddy-image" />
      </div>
    );
  });

  return (
    <div className="tasks">
      <div className="buddies-smaller">{contextData && displayContext}</div>
      {!openCreateTask && (
        <button
          onClick={() => {
            setOpenCreateTask((prev) => !prev);
            setIsUrgent((prev) => !prev);
            setSelectedCategory("");
          }}
          className="green"
        >
          add
        </button>
      )}
      {openCreateTask && (
        <CreateTask
          categories={categories}
          createItem={createItem}
          close={() => {
            setOpenCreateTask(false);
          }}
        ></CreateTask>
      )}

      {!openCreateTask && (
        <div className="filter">
          <div>
            <p>filter urgent tasks:</p>
            <button
              style={
                isUrgent ? { backgroundColor: "#9e2b2b", color: "white" } : {}
              }
              className="priority"
              onClick={() => {
                setIsUrgent((prev) => !prev);
                setSelectedCategory("");
              }}
            >
              urgent {isUrgent && "X"}
            </button>
          </div>
          {isUrgent && (
            <div className="categories">
              <p>choose category: </p>
              {categories.map((category: string) => {
                return (
                  <button
                    key={category}
                    className="category"
                    style={
                      category === selectedCategory
                        ? { backgroundColor: "#45a049", color: "white" }
                        : {}
                    }
                    onClick={() => {
                      setSelectedCategory(category);
                    }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div className="tasks">{tasks && displayTasks}</div>
    </div>
  );
};

export default Tasks;
