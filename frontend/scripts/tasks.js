import { deleteTask,changeTaskState,updateTask } from "./crud.js"
import { getTasks } from "./storage.js"

export function createTaskElement(task) {
    
    const element = document.getElementById("task-template").content.cloneNode(true)

    const taskElement = element.firstElementChild

    taskElement.dataset.id = task.id

    const element_priority = element.querySelector(".task-priority")
    const element_title = element.querySelector(".task-title")
    const element_checkbox = element.querySelector(".task-status")
    const id = Number(taskElement.dataset.id)

    element.querySelector(".task-date").textContent = task.date
    element_title.value = task.title
    element_priority.textContent = task.priority


    if (task.completed == true) {
        element_checkbox.checked = true
    }

    element_checkbox.addEventListener("change", async () => {
        await changeTaskState(id)
    })

    if (task.priority == "High") {
        element_priority.classList.toggle("priority-high")
    }

    else if (task.priority == "Medium") {
        element_priority.classList.toggle("priority-medium")
    }

    else if (task.priority == "Low") {
        element_priority.classList.toggle("priority-low")
    }

    return taskElement
}

export function renderTasks(tasks_position, tasks) {
    tasks_position.innerHTML = ""
    tasks.forEach((task) => {
        const element = createTaskElement(task)

        tasks_position.appendChild(element)
    })
}