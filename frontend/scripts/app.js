import { applyFilters } from "./filters.js"
import { addTask, updateTask } from "./crud.js"
import { renderTasks, editingTaskId, createTaskElement } from "./tasks.js"
import { tasks_area, task_btn_details, task_btn_header, task_btn_area, task_btn_text } from "./dom.js"
import { getTasks } from "./storage.js"

const date_text = document.getElementById("task-btn-text-calendar")
const date_input = document.getElementById("task-btn-calendar")

const priority_text = document.getElementById("task-btn-text-priority")
const priority_input = document.getElementById("task-btn-priority")

priority_text.addEventListener("click", () => {
    priority_input.showPicker()
})

priority_input.addEventListener("change", () => {
    priority_text.textContent = "🚩 " + priority_input.value + " Priority"
})

date_text.addEventListener("click", () => {
    date_input.showPicker()
})

date_input.addEventListener("change", () => {
    date_text.textContent = "📅 " + date_input.value
})

task_btn_header.addEventListener("click", () => {
    if (!task_btn_details.classList.contains("open")) {
       task_btn_details.classList.add("open") 
    }
})

document.addEventListener("click", (event) => {
    if (!task_btn_area.contains(event.target)) {
        task_btn_details.classList.remove("open")
    }
})

const task1 = {
    "title": "study back-end",
    "priority": "High"
}

const task2 = {
    "title": "study front-end",
    "priority": "Medium"
}

const tasks = [createTaskElement(task1), createTaskElement(task2)]

tasks_area.appendChild(tasks[0])
tasks_area.appendChild(tasks[1])


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