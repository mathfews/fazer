import { applyFilters } from "./filters.js"
import { addTask, updateTask } from "./crud.js"
import { renderTasks, editingTaskId } from "./tasks.js"
import { task_btn_details, task_btn_header, task_btn_area, task_btn_text } from "./dom.js"
import { getTasks } from "./storage.js"

task_btn_header.addEventListener("click", () => {
    task_btn_details.classList.toggle("open")
})

document.addEventListener("click", (event) => {
    if (!task_btn_area.contains(event.target)) {
        task_btn_details.classList.remove("open")
    }
})

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