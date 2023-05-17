const $ = (selector) => document.querySelector(selector)


//Mostrar y ocultar//
const showElement = (selector) => $(selector).classList.remove("hidden")
const hideElement = (selector) => $(selector).classList.add("hidden")

//Id para cada operaciones//
const randomId = () => self.crypto.randomUUID()


//-----Mandar y traer datos al localStorage----//
//traer operaciones y categorias//
const bringOperationsAndCategories = () => JSON.parse(localStorage.getItem(key))
//mandar operaciones y categorias//
const commandOperationsAndCategories = (key, array) => localStorage.setItem(key, JSON.stringify(array))

//guardar informacion de operaciones 
const saveOperationsInformation = () =>{
return{
    id: randomId(),
    description: $("#description").value,
    amount: $("#amount").value,
    guy: $("#guy").value ,
    category: $("#category").value ,
    date: $("#date").value

}
}

// console.log(saveOperationsInformation())







//Mostrar y ocultar secciones//
const openSaved = () =>{
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

}

window.addEventListener("load", openSaved)