import { task_btn_details, task_btn_header, task_btn_area, date_text, date_input, priority_input, priority_text, pages, menu_context, main_title, main_icon, filter_priority, filter_status, filter_date  } from "./dom.js"

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
            let parent = page.parentElement
            if (page.classList.contains("selected") && !(page.classList.contains("top-page"))) {
                if (page.classList.contains("status-options")) {
                    filter_status.value = "uncompleted"
                }
                else if (page.classList.contains("priority-options")) {
                    filter_priority.value = "All"
                }
                page.classList.remove("selected")
            }
            else {
                parent.querySelectorAll(".page").forEach((_page) => {
                    _page.classList.remove("selected")
                })
                page.classList.add("selected")

                if (page.classList.contains("status-options")) {
                    filter_status.value = page.id
                }

                else if (page.classList.contains("priority-options")) {
                    filter_priority.value = page.id
                    console.log(filter_priority.value)
                }

                else if (page.classList.contains("top-page")) {
                    filter_date.value = page.id
                }
            }


            const page_title = page.querySelector(".page-title")
            const page_icon = page.querySelector(".page-icon")

            const top_page = document.querySelector(".top-page.selected")
            main_title.textContent = top_page.textContent
            main_icon.innerHTML = top_page.querySelector(".page-icon").innerHTML
        })
    })
}