import { applyFilters } from "./filters.js"
import { addTask, saveUpdateTask, updateTask } from "./crud.js"
import { render_tasks } from "./tasks.js"
import { status_filter, priority_filter, update_task_btn, search_box, new_task_add_btn, new_task_name, new_task_priority, tasks_area, add_task_btn, update_task_name, update_task_priority } from "./dom.js"
import { getTasks } from "./storage.js"

let editingTask = null

status_filter.addEventListener("change", () => {
    const status_task_filtered = applyFilters(getTasks(), search_box.value, status_filter.value, priority_filter.value)
    render_tasks(tasks_area, status_task_filtered)
})

priority_filter.addEventListener("change", () => {
    const priority_tasks_filtered = applyFilters(getTasks(), search_box.value, status_filter.value, priority_filter.value)
    render_tasks(tasks_area, priority_tasks_filtered)
})

search_box.addEventListener("input", () => applyFilters(getTasks(), search_box.value, status_filter.value, priority_filter.value))

add_task_btn.addEventListener("click", () => {
    new_task_name.value = ""
    new_task_priority.value = ""
})

new_task_add_btn.addEventListener("click", () => {
    addTask(new_task_name.value, new_task_priority.value)
    const filtered_tasks = applyFilters(getTasks(), search_box.value, status_filter.value, priority_filter.value)
    render_tasks(tasks_area, filtered_tasks, update_task_name, update_task_priority)
})

update_task_btn.addEventListener("click", () => {
    saveUpdateTask(update_task_name.value, update_task_priority.value)
    render_tasks(tasks_area, getTasks(), update_task_name, update_task_priority)
})

render_tasks(tasks_area, getTasks(), update_task_name, update_task_priority)