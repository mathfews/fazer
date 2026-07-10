const new_task_add_btn = document.getElementById("new-task-add-btn")
const new_task_priority = document.getElementById("new-task-priority")
const new_task_name = document.getElementById("new-task-name")
let id = 0
let tasks = []
new_task_add_btn.addEventListener("click", () => {
    console.log(tasks)
    const task = {}
    task["id"] = id += 1
    task["title"] = new_task_name.value
    task["priority"] = new_task_priority.value
    tasks.push(task)
    new_task_name.value = ""
    new_task_priority.value = ""
})