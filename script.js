const new_task_add_btn = document.getElementById("new-task-add-btn")
const new_task_priority = document.getElementById("new-task-priority")
const new_task_name = document.getElementById("new-task-name")
let id = 0

new_task_add_btn.addEventListener("click", () => {
    const task = {}
    task["id"] = id += 1
    task["title"] = new_task_name.value
    task["priority"] = new_task_priority.value
    console.log(task)
})