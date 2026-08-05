import { task_btn_details, task_btn_header, task_btn_area, date_text, date_input, priority_input, priority_text, pages, menu_context  } from "./dom.js"

export function setupTaskHandlers() {

    document.addEventListener("click", (event) => {
        if (!menu_context.contains(event.target)) {
            menu_context.classList.remove("open")
        }
    })

    priority_text.addEventListener("click", () => {
        priority_input.showPicker()
    })

    priority_input.addEventListener("change", () => {
        priority_text.textContent = "🚩 " + priority_input.value + " Priority"
    })

    date_text.addEventListener("click", () => {
        date_input.showPicker()
    })

    date_input.addEventListener("change", () => {
        date_text.textContent = "📅 " + date_input.value

    })

    task_btn_header.addEventListener("click", () => {
        if (!task_btn_details.classList.contains("open")) {
            task_btn_details.classList.add("open") 
        }

    })

    document.addEventListener("click", (event) => {
        if (!task_btn_area.contains(event.target)) {
            task_btn_details.classList.remove("open")
        }

    })

    pages.forEach((page) => {
        page.addEventListener("click", () => {
            let parent = page.closest("#pages")
            parent.querySelectorAll(".page").forEach((_page) => {
                _page.classList.remove("selected")
            })
            page.classList.add("selected")
        })
    })
}