import {  render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Task from "./Task";
import Tasks from "./Tasks";
import App from "../../App";

describe("CreateTask", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  //change

  it("should add a new task", async () => {
    render(<Tasks></Tasks>);

    await userEvent.click(screen.getByRole("button", { name: /add/i }));
    await userEvent.type(screen.getByRole("textbox"), "new task");
    await userEvent.click(screen.getByRole("button", { name: /school/i }));
    await userEvent.click(screen.getByRole("button", { name: /urgent/i }));
    await userEvent.click(screen.getByRole("button", { name: /add task/i }));

    expect(screen.getByText(/new task/i)).toBeInTheDocument();
  });

  it("should delete a task", async () => {
    render(<Tasks></Tasks>);

    expect(screen.getByText(/new task/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(screen.queryByText(/new task/i)).not.toBeInTheDocument();
  });

  it("should complete task when clicked on complete", async () => {
    const taskData = {
      task: "new task",
      category: "work",
      isCompleted: false,
      isUrgent: false,
    };

    const markCompletedMock = jest.fn();
    const deleteTaskMock = jest.fn();

    render(
      <Task
        key={taskData.task}
        {...taskData}
        markCompleted={markCompletedMock}
        deleteTask={deleteTaskMock}
      />
    );

    const task = screen.getByText("new task");
    expect(task).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /complete/i }));
    expect(markCompletedMock).toBeCalledWith(taskData.task);
  });

  it("should disable form", async () => {
    render(<App />);
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByRole("textbox")).toBeEnabled();
    expect(screen.getByRole("button", { name: /add task/i })).toBeEnabled();
    const disableBtn = screen.getByRole("button", { name: /disable form/i });

    expect(disableBtn).toBeInTheDocument();

    await userEvent.click(disableBtn);

    expect(await screen.findByRole("textbox")).toBeInTheDocument();

    expect(await screen.findByRole("textbox")).toBeDisabled();
    expect(screen.getByRole("button", { name: /add task/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /work/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /life/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /school/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /urgent/i })).toBeDisabled();
    expect(disableBtn.textContent).toBe("enable form");
  });

  it("should enable form", async () => {
    render(<App />);
    //disabling
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByRole("textbox")).toBeEnabled();
    expect(screen.getByRole("button", { name: /add task/i })).toBeEnabled();
    const disableBtn = screen.getByRole("button", { name: /disable form/i });

    expect(disableBtn).toBeInTheDocument();

    await userEvent.click(disableBtn);

    expect(await screen.findByRole("textbox")).toBeInTheDocument();

    expect(await screen.findByRole("textbox")).toBeDisabled();

    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    //enabling
    expect(screen.getByRole("button", { name: /add task/i })).toBeDisabled();
    const enableBtn = screen.getByRole("button", { name: /enable form/i });

    expect(enableBtn).toBeInTheDocument();

    await userEvent.click(enableBtn);

    expect(await screen.findByRole("textbox")).toBeInTheDocument();

    expect(await screen.findByRole("textbox")).toBeEnabled();
    expect(screen.getByRole("button", { name: /add task/i })).toBeEnabled();
    expect(screen.getByRole("button", { name: /work/i })).toBeEnabled();
    expect(screen.getByRole("button", { name: /life/i })).toBeEnabled();
    expect(screen.getByRole("button", { name: /school/i })).toBeEnabled();
    expect(screen.getByRole("button", { name: /urgent/i })).toBeEnabled();
    expect(enableBtn.textContent).toBe("disable form");
  });
});

export {};
