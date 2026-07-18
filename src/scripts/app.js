import { applyFilters } from "./filters.js"
import { addTask, saveUpdateTask, updateTask } from "./crud.js"
import { renderTasks } from "./tasks.js"
import { status_filter, priority_filter, update_task_btn, search_box, new_task_add_btn, new_task_name, new_task_priority, tasks_area, add_task_btn, update_task_name, update_task_priority } from "./dom.js"
import { getTasks } from "./storage.js"

function updateScreen() {
    const filtered_tasks = applyFilters(getTasks(), search_box.value, status_filter.value, priority_filter.value)
    renderTasks(tasks_area, filtered_tasks, update_task_name, update_task_priority)
}

status_filter.addEventListener("change", () => updateScreen())

priority_filter.addEventListener("change", () => updateScreen())

search_box.addEventListener("input", () => updateScreen())

add_task_btn.addEventListener("click", () => {
    new_task_name.value = ""
    new_task_priority.value = ""
})

new_task_add_btn.addEventListener("click", () => {
    addTask(new_task_name.value, new_task_priority.value)
    updateScreen()
})

update_task_btn.addEventListener("click", () => {
    saveUpdateTask(update_task_name.value, update_task_priority.value)
    updateScreen()
})

updateScreen()