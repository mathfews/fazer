import { applyFilters } from "./filters.js"
import { addTask, updateTask } from "./crud.js"
import { renderTasks, createTaskElement } from "./tasks.js"
import { getTasks } from "./storage.js"
import { setupTaskHandlers } from "./taskHandler.js"
import { task_add_btn, date_input, priority_input, task_btn_text, tasks_area } from "./dom.js"

setupTaskHandlers() 
renderTasks(tasks_area, await getTasks())

task_add_btn.addEventListener("click", async () => {
    await addTask(task_btn_text.value, priority_input.value, date_input.value)
    await renderTasks(tasks_area, await getTasks())
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