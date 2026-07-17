const new_task_add_btn = document.getElementById("new-task-add-btn")
const new_task_priority = document.getElementById("new-task-priority")
const new_task_name = document.getElementById("new-task-name")
const tasks_area = document.getElementById("tasks-area")
const task_update_menu = document.getElementById("task-update-menu")
const update_task_btn = document.getElementById("update-task-btn")
const update_task_name = document.getElementById("update-task-name")
const update_task_priority = document.getElementById("update-task-priority")
const search_box = document.getElementById("search-box")
let editingTask = null

function createTaskElement(task) {
    const task_element = document.createElement("div")
    let status = ""
    if (!task.completed) {
        status = `<input type="checkbox" name="check" id="${task.id}" onclick="changeTaskState(${task.id})">`
    }
    else {
        status = `<input type="checkbox" name="check" id="${task.id}" onclick="changeTaskState(${task.id})" checked>`
    }
    task_element.innerHTML = `<div class="task-area" oncontextmenu="deleteTask(${task.id})" onauxclick="updateTask(${task.id})">
        <div>
            ${status}
            <label for="${task.id}">${task.title}</label> 
        </div>
        <p>-</p>
        <p>${task.priority}</p>
        <p>${task.id}</p>
        <p>${task.completed}</p>
        <button class="update-task-btn" commandFor="task-update-dialog" command="show-modal" onclick="updateTask(${task.id})">Update Task</button>
    </div>`
    task_element.addEventListener('auxclick', (event) => {
        if (event.button === 1) {
            updateTask(task.id)
        }
    })
    return task_element
}

function render_tasks(tasks=JSON.parse(localStorage.getItem("tasks"))) {
    if (tasks) {
        tasks_area.innerHTML = ""
        tasks.forEach((task) => { 
            tasks_area.appendChild(createTaskElement(task))
        })
    }
}

function selectTask(id, array=JSON.parse(localStorage.getItem("tasks"))) {
    return array.find(task => task.id === id)
}

function changeTaskState(id) {
    const current_tasks = JSON.parse(localStorage.getItem("tasks"))
    selected_task = selectTask(id, current_tasks)
    selected_task.completed = !selected_task.completed
    localStorage.setItem("tasks", JSON.stringify(current_tasks))
    render_tasks()
}

function updateTask(id) {
    editingTask = selectTask(id)
    update_task_name.value = ""
    update_task_priority.value = ""
    update_task_name.value = editingTask.title
    update_task_priority.value = editingTask.priority
}

update_task_btn.addEventListener("click", () => {
    if (!editingTask) return

    current_tasks = JSON.parse(localStorage.getItem("tasks"))
    selected_task = selectTask(editingTask.id, current_tasks)
    selected_task.title = update_task_name.value
    selected_task.priority = update_task_priority.value

    localStorage.setItem("tasks", JSON.stringify(current_tasks))

    render_tasks()
})

search_box.addEventListener("input", () => {
    const input = (search_box.value).toLowerCase()
    if (input === "") {
        render_tasks()
    }
    else {
        let current_tasks = JSON.parse(localStorage.getItem("tasks"))
        let filtered_tasks = current_tasks.filter(task => task.title.toLowerCase().includes(input))
        render_tasks(filtered_tasks)
    }
})

function deleteTask(id) {
    const current_tasks = JSON.parse(localStorage.getItem("tasks"))
    event.preventDefault()
    const selected_task = selectTask(id, current_tasks)
    const task_index = current_tasks.indexOf(selected_task)
    const task_name = selected_task.title
    current_tasks.splice(task_index,1)
    localStorage.setItem("tasks", JSON.stringify(current_tasks))
    console.log(`${task_name} succesfully deleted!`)
    render_tasks()
}

new_task_add_btn.addEventListener("click", () => {
    let current_tasks = JSON.parse(localStorage.getItem("tasks"))
    if (current_tasks === null) {
        current_tasks = []
    }
    if (localStorage.getItem("id") === null) {
        localStorage.setItem("id", 0)
    }
    const task_info = {
        id: Number(localStorage.getItem("id")) + 1,
        title: new_task_name.value,
        priority: new_task_priority.value,
        completed: false,
    }
    localStorage.setItem("id", task_info.id)
    new_task_name.value = ""
    new_task_priority.value = ""
    current_tasks.push(task_info)
    localStorage.setItem("tasks", JSON.stringify(current_tasks))
    render_tasks()
})

render_tasks()