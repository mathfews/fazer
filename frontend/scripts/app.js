import { applyFilters } from "./filters.js"
import { addTask, updateTask, deleteTask } from "./crud.js"
import { renderTasks, createTaskElement, editingTaskId, priorityLabels } from "./tasks.js"
import { getTasks } from "./storage.js"
import { setupTaskHandlers } from "./taskHandler.js"
import {
    task_add_btn, date_input, priority_input, task_btn_text, tasks_area, delete_task_btn, edit_task_btn, menu_context, filter_priority, filter_status, filter_date, pages
} from "./dom.js"

let renderedTasks = null

setupTaskHandlers()
updateScreen()

pages.forEach((page) => {
    page.addEventListener("click", () => {
        updateScreen()
    })
})

function getFilters() {
    return {
        "date": filter_date.value,
        "priority": filter_priority.value,
        "status": filter_status.value
    }
}

async function updateScreen(date, priority, status) {
    const filters = getFilters()

    const date_now = new Date(Date.now()).toISOString().split("T")[0]
    const date_7days_later = new Date()
    date_7days_later.setDate(date_7days_later.getDate() + 7)

    const next_7_days = date_7days_later.toISOString().split("T")[0]

    const all_tasks = await getTasks()
    const filteredByDate = []
    const filteredByPriority = []
    const filteredByStatus = []

    all_tasks.forEach((task) => {
        if (filters["date"] === "today") {
            if (task["due_date"] === date_now) {
                filteredByDate.push(task)
            }
        }
        else if (filters["date"] === "7days") {
            if (task["due_date"] >= date_now && task["due_date"] < next_7_days) {
               filteredByDate.push(task)
            }
        }
        else {
            filteredByDate.push(task)
        }
    })

    filteredByDate.forEach((task) => {
        if (filters["priority"] === "High") {
            if(task["priority"] === "High") {
                filteredByPriority.push(task)
            }
        }
        else if (filters["priority"] === "Medium") {
            if(task["priority"] === "Medium") {
                filteredByPriority.push(task)
            }
        }
        else if (filters["priority"] === "Low") {
            if (task["priority"] === "Low") {
                filteredByPriority.push(task)
            }
        }
        else if (filters["priority"] === "All") {
            filteredByPriority.push(task)
        }
    })

    console.log(filters)
    console.log(filteredByPriority)

    filteredByPriority.forEach((task) => {
        if (filters["status"] === "uncompleted") {
            if (task["completed"] === 0) {
                filteredByStatus.push(task)
            }
        }
        else if (filters["status"] === "completed") {
            if (task["completed"] === 1) {
                filteredByStatus.push(task)
            }
        }
        else {
            filteredByStatus.push(task)
        }
    })

    renderTasks(tasks_area, filteredByStatus)
    renderedTasks = document.querySelectorAll(".task-template")
}

delete_task_btn.addEventListener("click", async () => {
    await deleteTask(editingTaskId)
    updateScreen()
    menu_context.classList.remove("open")
})

edit_task_btn.addEventListener("click", async () => {
    menu_context.classList.remove("open")
    let selectedTask = null
    renderedTasks.forEach((task) => {
        let confirm_btn = task.querySelector(".confirm-btn")
        task.classList.remove("editing")
        task.inert = true
        confirm_btn.classList.remove("open")
        if (task.dataset.id == editingTaskId) {
            task.inert = false
            selectedTask = task
            confirm_btn.classList.add("open")
            task.classList.add("editing")
        }
    })
    const task_title = selectedTask.querySelector(".task-title")
    const task_priority = selectedTask.querySelector(".task-priority")

    const task_priority_input = selectedTask.querySelector(".task-priority-input")
    const task_date_input = selectedTask.querySelector(".task-date-input")

    const task_due_date = selectedTask.querySelector(".task-date")

    const task_confirm_btn = selectedTask.querySelector(".confirm-btn")

    task_priority_input.style.display = "flex"
    task_date_input.style.display = "flex"
    task_title.readOnly = false

    task_confirm_btn.addEventListener("click", async () => {
        renderedTasks.forEach((task) => {
            task.inert = false
        })

        task_priority_input.style.display = "none"
        task_date_input.style.display = "none"

        task_title.readOnly = true

        selectedTask.classList.remove("editing")
        task_confirm_btn.classList.remove("open")

        await updateTask(editingTaskId, task_title.value, task_priority.textContent, task_due_date.textContent)
        await updateScreen()
    })

    task_priority.addEventListener("click", () => {
        task_priority_input.showPicker()
    })

    task_due_date.addEventListener("click", () => {
        task_date_input.showPicker()
    })
    task_date_input.addEventListener("change", () => {
        task_due_date.textContent = task_date_input.value
    })

    task_priority_input.addEventListener("change", () => {
      task_priority.textContent = task_priority_input.value
      task_priority.className = ""
      task_priority.className = "task-priority metadata"
      task_priority.classList.add(priorityLabels(task_priority, task_priority_input.value))
    })
})

task_add_btn.addEventListener("click", () => {
    addTask(task_btn_text.value, priority_input.value, date_input.value)
    updateScreen()
})

/* task_add_btn.addEventListener("click", () => {
    const task = {
        "title": task_btn_text.value,
        "date": date_input.value,
        "priority": priority_input.value
    }
    const taskElement = createTaskElement(task)
    tasks_area.appendChild(taskElement)
})*/



/* async function updateScreen() {
    const filtered_tasks = applyFilters(await getTasks(), search_box.value, status_filter.value, priority_filter.value)
    renderTasks(tasks_area, filtered_tasks, update_task_name, update_task_priority)
}

status_filter.addEventListener("change", () => updateScreen())

priority_filter.addEventListener("change", () => updateScreen())

search_box.addEventListener("input", () => updateScreen())

add_task_btn.addEventListener("click", () => {
    new_task_name.value = ""
    new_task_priority.value = ""
})

confirm_update_task_btn.addEventListener("click", () => {
    updateTask(editingTaskId, update_task_name.value, update_task_priority.value)
    updateScreen()
})

new_task_add_btn.addEventListener("click", () => {
    addTask(new_task_name.value, new_task_priority.value)
    updateScreen()
})

updateScreen() */
