import { Task as TaskType} from "./TaskInterface";
import "./tasks.css";

const Task = (props: TaskType) => {
  return (
    <div className="task">
      <div className="task-content">
        <p className={`task-name ${props.isCompleted && "completed"}`}>{props.task}</p>
        {!props.isCompleted &&  <div className="info">
          <p className="priority">{props.priority}</p>
          <p className="category">{props.category}</p>
        </div>}
      </div>
      <div>
        <div className="actions">
        {!props.isCompleted && <button className="action green" onClick={props.markCompleted}>complete</button>}
          <button className="action red" onClick={props.deleteTask}>delete</button>
        </div>
      </div>
    </div>
  );
};

export default Task;
