import { deleteTask,changeTaskState,updateTask } from "./crud.js"
import { getTasks } from "./storage.js"

export let editingTaskId = null

export function createTaskElement(task) {
    
    const element = document.getElementById("task-template").content.cloneNode(true)

    element.querySelector(".task-title").textContent = task.title
    element.querySelector(".task-priority").textContent = task.priority
    element.querySelector(".task-date").textContent = "Today"

    return element
}

export function renderTasks(tasks_position, tasks) {
    tasks_position.innerHTML = ""
    tasks.forEach((task) => {
        const element = createTaskElement(task)

        tasks_position.appendChild(element)
    })
}