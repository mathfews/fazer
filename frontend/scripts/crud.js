import { getTasks, saveTasks } from "./storage.js"

let editingTask = null

export function addTask(title, priority, due_date) {
    saveTasks(title, priority, due_date)
}

export async function changeTaskState(id) {
    const url = `https://fazer-4l62.onrender.com/${id}`
    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({"id": id, "completed": 1})
        })

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`)
        }

    } catch (error) {
        console.log("Error", error)
    }
}

export async function updateTask(id, new_title, new_priority, new_due_date) {
    const url = `https://fazer-4l62.onrender.com/${id}`
    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"id": id, "title": new_title, "priority": new_priority, "due_date": new_due_date})
        })

        if (!response.ok) {
            throw new Error(`HTTP ERROR! Status: ${await response.status}`)
        }
    } catch (error) {
        console.log("Error", error)
    }
}

export async function deleteTask(id) {
    const url = `https://fazer-4l62.onrender.com/${id}`
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