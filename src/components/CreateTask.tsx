import { useState } from "react";
import "./tasks.css";

const CreateTask = (props: any) => {
  const [selectedCategory, setSelectedCategory] = useState(props.categories[0]);
  const [isUrgent, setIsUrgent] = useState(false);
  const [task, setTask] = useState("");

  const handleTaskChange = (event: any) => {
    setTask(event.target.value);
    console.log(task);
  };

  return (
    <div className="create-task">
      <input type="text" name="task" value={task} onChange={handleTaskChange} />

      <div className="options">
        <div className="categories">
          {props.categories.map((category: string) => {
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
        <button
          style={isUrgent ? { backgroundColor: "#9e2b2b", color: "white" } : {}}
          className="priority"
          onClick={() => {
            setIsUrgent((prev) => !prev);
          }}
        >
          urgent
        </button>
      </div>
      <button
        onClick={() => {
          if (task) {
            props.createItem(task, selectedCategory, isUrgent);
            props.close();
          }
        }}
        className="green"
      >
        add task
      </button>
    </div>
  );
};

export default CreateTask;
