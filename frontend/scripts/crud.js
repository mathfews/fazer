import { getTasks, saveTasks } from "./storage.js"

let editingTask = null

export function addTask(title, priority) {
    let current_tasks = getTasks()
    if (localStorage.getItem("id") === null) {
        localStorage.setItem("id", 0)
    }
    const task_info = {
        id: Number(localStorage.getItem("id")) + 1,
        title: title,
        priority: priority,
        completed: false,
    }
    localStorage.setItem("id", task_info.id)

    current_tasks.push(task_info)
    saveTasks(current_tasks)
}

export function changeTaskState(id) {
    const current_tasks = getTasks()
    const selected_task = selectTask(id, current_tasks)
    selected_task.completed = !selected_task.completed
    saveTasks(current_tasks)
}

export function updateTask(id) {
    editingTask = selectTask(id)

    return editingTask
}

export function saveUpdateTask(title, priority) {
    if (!editingTask) return

    const current_tasks = getTasks()
    const selected_task = selectTask(editingTask.id, current_tasks)
    selected_task.title = title
    selected_task.priority = priority

    saveTasks(current_tasks)
}

export function deleteTask(id) {
    const current_tasks = getTasks()
    const selected_task = selectTask(id, current_tasks)
    const task_index = current_tasks.indexOf(selected_task)
    current_tasks.splice(task_index,1)
    saveTasks(current_tasks)
    return current_tasks
}

export function selectTask(id, array=getTasks()) {
    return array.find(task => task.id === id)
}