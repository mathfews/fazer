import { applyFilters } from "./filters.js"
import { addTask, saveUpdateTask, updateTask } from "./crud.js"
import { render_tasks } from "./tasks.js"
import { status_filter, priority_filter, update_task_btn, search_box, new_task_add_btn } from "./dom.js"

let editingTask = null

status_filter.addEventListener("change", applyFilters)

priority_filter.addEventListener("change", applyFilters)

search_box.addEventListener("input", applyFilters)

new_task_add_btn.addEventListener("click", () => addTask())

update_task_btn.addEventListener("click", saveUpdateTask)

render_tasks()