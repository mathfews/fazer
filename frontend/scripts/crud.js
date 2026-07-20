import { getTasks, saveTasks } from "./storage.js"

let editingTask = null

export function addTask(title, priority) {
    saveTasks(title, priority)

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