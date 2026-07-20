export function getTasks() {
    let current_tasks = JSON.parse(localStorage.getItem("tasks"))
    if (current_tasks === null) {
        current_tasks = []
    }
    return current_tasks
}

export function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}