import { Task as TaskType } from "./TaskInterface";
import "./tasks.css";
import classNames from "classnames";

export interface TaskProps extends TaskType {
  markCompleted: (task: string) => void;
  deleteTask: (task: string) => void;
}

const Task = (props: TaskProps) => {
  return (
    <div className="task">
      <div className="task-content">
        <p
          className={classNames("task-name", { completed: props.isCompleted })}
        >
          {props.task}
        </p>
        {!props.isCompleted && (
          <div className="info">
            <p className="category">{props.category}</p>
            {props.isUrgent && <p className="priority"> urgent</p>}
          </div>
        )}
      </div>
      <div>
        <div className="actions">
          {!props.isCompleted && (
            <button
              className="action green"
              onClick={() => {
                props.markCompleted(props.task);
              }}
            >
              complete
            </button>
          )}
          <button
            className="action red"
            onClick={() => {
              props.deleteTask(props.task);
            }}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
