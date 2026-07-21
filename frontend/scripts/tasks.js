import { deleteTask,changeTaskState,updateTask } from "./crud.js"
import { getTasks } from "./storage.js"

export function createTaskElement(task) {
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
    return task_element
}

export function renderTasks(tasks_position, tasks, update_task_name, update_task_priority) {
    tasks_position.innerHTML = ""
    tasks.forEach((task) => {
        const element = createTaskElement(task)

        const task_checkbox = element.querySelector(".checkbox")
        const task_area = element.querySelector(".task-area")
        const task_update_btn = element.querySelector(".update-task-btn")

        task_update_btn.addEventListener("click", () => {
            updateTask(task.id)
        })

        task_checkbox.addEventListener("click", () => changeTaskState(task.id))

        task_area.addEventListener("contextmenu", async (event) => {
            event.preventDefault()
            deleteTask(task.id)
            const tasks = await getTasks()
            renderTasks(tasks_position, tasks, update_task_name, update_task_priority)
        })

        tasks_position.appendChild(element)
    })
}