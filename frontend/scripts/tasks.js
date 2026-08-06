import { deleteTask,changeTaskState,updateTask } from "./crud.js"
import { menu_context, delete_task_btn, edit_task_btn } from "./dom.js"
import { getTasks } from "./storage.js"
import { updateScreen } from "./app.js"

export let editingTaskId = null

export function priorityLabels(element, priority) {
    if (priority === "High") {
        return "priority-high"
    }

    else if (priority === "Medium") {
        return "priority-medium"
    }

    else if (priority === "Low") {
        return "priority-low"
    }
}

export function createTaskElement(task) {

    const element = document.getElementById("task-template").content.cloneNode(true)

    const taskElement = element.firstElementChild

    taskElement.dataset.id = task.id

    const element_priority = element.querySelector(".task-priority")
    const element_title = element.querySelector(".task-title")
    const element_checkbox = element.querySelector(".task-status")
    const task_priority_input = element.querySelector(".task-priority-input")
    const task_date_input = element.querySelector(".task-date-input")

    task_date_input.value = task.due_date
    task_priority_input.value = task.priority

    const id = Number(taskElement.dataset.id)

    element.querySelector(".task-date").textContent = task.due_date
    element_title.value = task.title
    element_priority.textContent = task.priority

    if (task.completed == true) {
        element_checkbox.checked = true
    }

    element_checkbox.addEventListener("change", async () => {
        await changeTaskState(id)
        await updateScreen()
    })

    element_priority.classList.add(priorityLabels(element_priority, task.priority))

    taskElement.addEventListener("contextmenu", (event) => {
        event.preventDefault()
        menu_context.style.top = `${event.clientY}px`
        menu_context.style.left = `${event.clientX}px`
        menu_context.classList.add("open")
        editingTaskId = taskElement.dataset.id
    })

    return taskElement
}

export function renderTasks(tasks_position, tasks) {
    tasks_position.innerHTML = ""
    tasks.forEach((task) => {
        const element = createTaskElement(task)

        tasks_position.appendChild(element)
    })
}
