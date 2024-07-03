import { useState } from "react";
import "./tasks.css";

type CreateTaskProps = {
  categories: string[]; 
  createItem: (task: string, category: string, isUrgent: boolean) => void; 
  close: () => void; 
}

const CreateTask = (props: CreateTaskProps) => {
  const [selectedCategory, setSelectedCategory] = useState(props.categories[0]);
  const [isUrgent, setIsUrgent] = useState(false);
  const [task, setTask] = useState("");

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
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
