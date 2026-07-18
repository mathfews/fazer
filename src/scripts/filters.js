import { getTasks } from "./storage.js"
import { render_tasks } from "./tasks.js"
import { status_filter, priority_filter, search_box } from "./dom.js"

export function applyFilters() {
    const current_tasks = getTasks()
    const filtered_tasks_input = current_tasks.filter(task => task.title.toLowerCase().includes(search_box.value.toLowerCase()))
    const filtered_tasks_status = filterByStatus(status_filter.value, filtered_tasks_input)
    const filtered_tasks_priority = filterByPriority(priority_filter.value, filtered_tasks_status)
    render_tasks(filtered_tasks_priority) 
}

export function filterByPriority(selected_option,tasks=getTasks()) {
    let current_tasks = tasks
    if (selected_option != "all") {
        const filtered_tasks = tasks.filter(task => task.priority.toLowerCase() == selected_option)
        current_tasks = filtered_tasks
    }
    return current_tasks
}

export function filterByStatus(selected_option, tasks=getTasks()) {
    let current_tasks = tasks
    let status = null
    if (selected_option != "all") {
        if (selected_option == "completed") {
            status = true
        }
        else {
            status = false
        }
        const filtered_tasks = tasks.filter(task => task.completed === status)
        current_tasks = filtered_tasks
    }
    return current_tasks
}