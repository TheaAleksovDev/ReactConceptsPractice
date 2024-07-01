export interface Task {
    task:string,
    category:string,
    isCompleted:boolean,
    priority:string,
    markCompleted:()=>void
    deleteTask:()=>void
}