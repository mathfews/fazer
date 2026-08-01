import { applyFilters } from "./filters.js"
import { addTask, updateTask } from "./crud.js"
import { renderTasks, createTaskElement } from "./tasks.js"
import { getTasks } from "./storage.js"
import { setupTaskHandlers } from "./taskHandler.js"

const pages = document.querySelectorAll(".page")

pages.forEach((page) => {
    page.addEventListener("click", () => {
        let parent = page.parentElement.parentElement.parentElement
        parent.querySelectorAll(".page").forEach((_page) => {
            _page.classList.remove("selected")
        })
        page.classList.add("selected")
    })
})


setupTaskHandlers()



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