const $ = (selector) => document.querySelector(selector)


const showElement = (selector) => $(selector).classList.remove("hidden")
const hideElement = (selector) => $(selector).classList.add("hidden")


//Mostrar y ocultar secciones//
$("#categories").addEventListener("click", () => {
    showElement(".show-categories")
    hideElement(".show-balance")
    hideElement(".show-reports")
    hideElement(".show-operation")
})

$("#balance").addEventListener("click", () => {
    showElement(".show-balance")
    hideElement(".show-categories")
    hideElement(".show-reports")
    hideElement(".show-operation")
})

$("#reports").addEventListener("click", () => {
showElement(".show-reports")
hideElement(".show-balance")
hideElement(".show-categories")
hideElement(".show-operation")
})

$("#new-operation").addEventListener("click", ()=>{
    showElement(".show-operation")
    hideElement(".show-balance")
    hideElement(".show-categories")
    hideElement(".container-no-results")

})