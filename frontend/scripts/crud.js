import { getTasks, saveTasks } from "./storage.js"

let editingTask = null

export function addTask(title, priority) {
    saveTasks(title, priority)
}

export async function changeTaskState(id) {
    const url = `http://127.0.0.1:8000/tasks/${id}`
    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: id
        })

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`)
        }

    } catch (error) {
        console.log("Error", error)
    }
}

export function updateTask(id) {
    editingTask = selectTask(id)

    return editingTask
}

export function saveUpdateTask(title, priority) {
    if (!editingTask) return

    const current_tasks = getTasks()
    const selected_task = selectTask(editingTask.id, current_tasks)
    selected_task.title = title
    selected_task.priority = priority

    saveTasks(current_tasks)
}

export async function deleteTask(id) {
    const url = `http://127.0.0.1:8000/tasks/${id}`
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: Number(id)
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        return await data
    } catch(error) {
        console.log("Error:", error)
    }
}

export async function selectTask(id) {
    return array.find(task => task.id === id)
}