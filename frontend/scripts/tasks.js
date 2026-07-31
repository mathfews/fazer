import { deleteTask,changeTaskState,updateTask } from "./crud.js"
import { getTasks } from "./storage.js"

export let editingTaskId = null

export function createTaskElement(task) {
    
    const element = document.getElementById("task-template").content.cloneNode(true)

    const element_priority = element.querySelector(".task-priority")

    element.querySelector(".task-title").textContent = task.title
    element_priority.textContent = task.priority

    if (task.priority == "High") {
        element_priority.classList.toggle("priority-high")
    }

    else if (task.priority == "Medium") {
        element_priority.classList.toggle("priority-medium")
    }

    else if (task.priority == "Low") {
        element_priority.classList.toggle("priority-low")
    }

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