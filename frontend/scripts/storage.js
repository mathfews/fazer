const url = "http://127.0.0.1:8000/tasks/"

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

export async function saveTasks(title, priority) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "title": title, 
                "priority": priority,
            })
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        console.log(await data)

        
    } catch(error) {
        console.log("Error:", error)
    }
}