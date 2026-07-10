const new_task_add_btn = document.getElementById("new-task-add-btn")
const new_task_priority = document.getElementById("new-task-priority")
const new_task_name = document.getElementById("new-task-name")
const tasks_area = document.getElementById("tasks-area")
const tasks = []
let id = 0

function render_tasks() {
    tasks_area.innerHTML = ""
    tasks.forEach((task) => {
        const task_element = document.createElement("div")
        let status = ""
        if (!task.completed) {
            status = `<input type="checkbox" name="check" id="${task.id}" onclick="changeTaskState(${task.id})">`
        }
        else {
            status = `<input type="checkbox" name="check" id="${task.id}" onclick="changeTaskState(${task.id})" checked>`
        }
        task_element.innerHTML = `<div class="task-area" oncontextmenu="deleteTask(${task.id})">
            <div>
                ${status}
                <label for="${task.id}">${task.title}</label> 
            </div>
            <p>-</p>
            <p>${task.priority}</p>
            <p>${task.id}</p>
            <p>${task.completed}</p>
        </div>`
        tasks_area.appendChild(task_element)
    })
}

function changeTaskState(id) {
    const selected_task = tasks.find(task => task.id === id)
    selected_task.completed = !selected_task.completed
    render_tasks()
}

function deleteTask(id) {
    event.preventDefault()
    const selected_task = tasks.find(task => task.id === id)
    const task_index = tasks.indexOf(selected_task)
    const task_name = selected_task.title
    tasks.splice(task_index,1)
    console.log(`${task_name} succesfully deleted!`)
    render_tasks()
}

new_task_add_btn.addEventListener("click", () => {
    const task_info = {
        id: ++id,
        title: new_task_name.value,
        priority: new_task_priority.value,
        completed: false,
    }
    new_task_name.value = ""
    new_task_priority.value = ""
    tasks.push(task_info)
    render_tasks()
})