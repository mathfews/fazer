const new_task_add_btn = document.getElementById("new-task-add-btn")
const new_task_priority = document.getElementById("new-task-priority")
const new_task_name = document.getElementById("new-task-name")
const tasks_area = document.getElementById("tasks-area")
const task_update_menu = document.getElementById("task-update-menu")
const update_task_btn = document.getElementById("update-task-btn")
const update_task_name = document.getElementById("update-task-name")
const update_task_priority = document.getElementById("update-task-priority")
const search_box = document.getElementById("search-box")
const status_filter = document.getElementById("status-filter")
const priority_filter = document.getElementById("priority-filter")
let editingTask = null

status_filter.addEventListener("change", applyFilters)

priority_filter.addEventListener("change", applyFilters)

function applyFilters() {
    const current_tasks = getTasks()
    const filtered_tasks_input = current_tasks.filter(task => task.title.toLowerCase().includes(search_box.value.toLowerCase()))
    const filtered_tasks_status = filterByStatus(status_filter.value, filtered_tasks_input)
    const filtered_tasks_priority = filterByPriority(priority_filter.value, filtered_tasks_status)
    render_tasks(filtered_tasks_priority) 
}

function filterByPriority(selected_option,tasks=getTasks()) {
    let current_tasks = tasks
    if (selected_option != "all") {
        const filtered_tasks = tasks.filter(task => task.priority.toLowerCase() == selected_option)
        current_tasks = filtered_tasks
    }
    return current_tasks
}

function filterByStatus(selected_option, tasks=getTasks()) {
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

function createTaskElement(task) {
    const task_element = document.createElement("div")
    let status = ""
    if (!task.completed) {
        status = `<input type="checkbox" name="check" class="checkbox" id="${task.id}">`
    }
    else {
        status = `<input type="checkbox" name="check" class="checkbox" id="${task.id}" checked>`
    }
    task_element.innerHTML = `<div class="task-area">
        <div>
            ${status}
            <label for="${task.id}">${task.title}</label> 
        </div>
        <p>-</p>
        <p>${task.priority}</p>
        <p>${task.id}</p>
        <p>${task.completed}</p>
        <button class="update-task-btn" commandFor="task-update-dialog" command="show-modal">Update Task</button>
    </div>`
    const task_checkbox = task_element.querySelector(".checkbox")
    const task_area = task_element.querySelector(".task-area")
    const task_update_btn = task_element.querySelector(".update-task-btn")
    task_update_btn.addEventListener("click", () => updateTask(task.id))
    task_checkbox.addEventListener("click", () => changeTaskState(task.id))
    task_area.addEventListener("contextmenu", (event) => {
        event.preventDefault()
        deleteTask(task.id)
    })
    return task_element
}

function render_tasks(tasks=getTasks()) {
    tasks_area.innerHTML = ""
    tasks.forEach((task) => {
        tasks_area.appendChild(createTaskElement(task))
    })
}

function selectTask(id, array=getTasks()) {
    return array.find(task => task.id === id)
}

function changeTaskState(id) {
    const current_tasks = getTasks()
    const selected_task = selectTask(id, current_tasks)
    selected_task.completed = !selected_task.completed
    saveTasks(current_tasks)
    applyFilters()
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

    const current_tasks = getTasks()
    const selected_task = selectTask(editingTask.id, current_tasks)
    selected_task.title = update_task_name.value
    selected_task.priority = update_task_priority.value

    saveTasks(current_tasks)

    applyFilters()
})

search_box.addEventListener("input", applyFilters)

function deleteTask(id) {
    const current_tasks = getTasks()
    event.preventDefault()
    const selected_task = selectTask(id, current_tasks)
    const task_index = current_tasks.indexOf(selected_task)
    const task_name = selected_task.title
    current_tasks.splice(task_index,1)
    saveTasks(current_tasks)
    applyFilters()
}

new_task_add_btn.addEventListener("click", () => {
    let current_tasks = getTasks()
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
    saveTasks(current_tasks)
    applyFilters()
})

render_tasks()