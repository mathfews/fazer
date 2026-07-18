import { getTasks, saveTasks } from "./storage.js"
import { applyFilters } from "./filters.js"
import { new_task_name, new_task_priority, update_task_name, update_task_priority } from "./dom.js"

let editingTask = null

export function addTask() {
    let current_tasks = getTasks()
    if (localStorage.getItem("id") === null) {
        localStorage.setItem("id", 0)
    }
    const task_info = {
        id: Number(localStorage.getItem("id")) + 1,
        title: new_task_name.value,
        priority: new_task_priority.value,
        completed: false,
    }
    localStorage.setItem("id", task_info.id)
    new_task_name.value = ""
    new_task_priority.value = ""
    current_tasks.push(task_info)
    saveTasks(current_tasks)
    applyFilters()
}

export function changeTaskState(id) {
    const current_tasks = getTasks()
    const selected_task = selectTask(id, current_tasks)
    selected_task.completed = !selected_task.completed
    saveTasks(current_tasks)
    applyFilters()
}

export function updateTask(id) {
    editingTask = selectTask(id)
    update_task_name.value = ""
    update_task_priority.value = ""
    update_task_name.value = editingTask.title
    update_task_priority.value = editingTask.priority
}

export function deleteTask(id) {
    const current_tasks = getTasks()
    const selected_task = selectTask(id, current_tasks)
    const task_index = current_tasks.indexOf(selected_task)
    const task_name = selected_task.title
    current_tasks.splice(task_index,1)
    saveTasks(current_tasks)
    applyFilters()
}

export function selectTask(id, array=getTasks()) {
    return array.find(task => task.id === id)
}