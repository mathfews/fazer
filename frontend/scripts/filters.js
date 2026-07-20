export function applyFilters(tasks, search, status, priority) {
    const filtered_tasks_search = tasks.filter(task => task.title.toLowerCase().includes(search.toLowerCase()))
    const filtered_tasks_status = filterByStatus(status, filtered_tasks_search)
    const filtered_tasks_priority = filterByPriority(priority, filtered_tasks_status)

    return filtered_tasks_priority
}

export function filterByPriority(priority,tasks) {
    if (priority != "all") {
        const filtered_tasks = tasks.filter(task => task.priority.toLowerCase() == priority)
        return filtered_tasks
    }
    return tasks
}

export function filterByStatus(state, tasks) {
    let current_tasks = tasks
    let status = null
    if (state != "all") {
        if (state == "completed") {
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