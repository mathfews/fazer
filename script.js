const new_task_add_btn = document.getElementById("new-task-add-btn")
const new_task_priority = document.getElementById("new-task-priority")
const new_task_name = document.getElementById("new-task-name")
const tasks_area = document.getElementById("tasks-area")
let id = 0
let tasks = []

function render_tasks(tasks) {
    tasks_area.innerHTML = ""
    tasks.forEach((task) => {
        const task_div = document.createElement("div")
        const task_ul = document.createElement("ul")
        const task_options = document.createElement("ul")
        const task_title = document.createElement("li")
        const task_ID = document.createElement("li")
        const task_priority = document.createElement("li")
        task_title.textContent = task.title
        task_priority.textContent = task.priority
        task_ID.textContent = task.id
        task_ul.appendChild(task_title)
        task_options.appendChild(task_priority)
        task_options.appendChild(task_ID)
        task_ul.appendChild(task_options)
        task_div.appendChild(task_ul)
        tasks_area.appendChild(task_div)
    })
}

new_task_add_btn.addEventListener("click", () => {
    const task_info = {
        id: ++id,
        title: new_task_name.value,
        priority: new_task_priority.value,
    }
    new_task_name.value = ""
    new_task_priority.value = ""
    tasks.push(task_info)
    render_tasks(tasks)
})