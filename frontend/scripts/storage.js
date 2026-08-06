const url = "https://fazer-4l62.onrender.com/tasks/"

export async function getTasks() {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        return await data

    } catch(error) {
        console.log("Error:", error)
    }
}

export async function saveTasks(title, priority, due_date) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "title": title, 
                "priority": priority,
                "due_date": due_date,
                "completed": false
            })
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        
    } catch(error) {
        console.log("Error:", error)
    }
}