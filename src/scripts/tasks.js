import { deleteTask,changeTaskState,updateTask } from "./crud.js"
import { tasks_area, update_task_name, update_task_priority } from "./dom.js"

export function createTaskElement(task, task_position, tasks, update_task_name, update_task_priority) {
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
    task_update_btn.addEventListener("click", () => {
        update_task_name.value = task.title
        update_task_priority.value = task.priority
        const selected_task = updateTask(task.id)
    })
    task_checkbox.addEventListener("click", () => changeTaskState(task.id))
    task_area.addEventListener("contextmenu", (event) => {
        event.preventDefault()
        const current_tasks = deleteTask(task.id)
        render_tasks(task_position, current_tasks)
    })
    return task_element
}

export function render_tasks(tasks_position, tasks, update_task_name, update_task_priority) {
    tasks_position.innerHTML = ""
    tasks.forEach((task) => {
        tasks_position.appendChild(createTaskElement(task, tasks_position, tasks, update_task_name, update_task_priority))
    })
}