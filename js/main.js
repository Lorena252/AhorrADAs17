const $ = (selector) => document.querySelector(selector)


//Mostrar y ocultar//
const showElement = (selector) => $(selector).classList.remove("hidden")
const hideElement = (selector) => $(selector).classList.add("hidden")

//Id por operacion//
const randomId = () => self.crypto.randomUUID()

            // localStorage//
 const getOperationsAndCategories = (key) => JSON.parse(localStorage.getItem(key))
 const setOperationsAndCategories = (key, array) => localStorage.setItem(key, JSON.stringify(array))

if(!getOperationsAndCategories("operations")){
  setOperationsAndCategories("operations", [])
}


const setOfOperations = getOperationsAndCategories("operations") || []

//pinta operaciones en el html//
const operationsData = (operations) => {
$("#table-operations").innerHTML = ""
  for (const {id, description, amount, guy,category, date } of operations){
    $("#table-operations").innerHTML += `
    <tr>
    <td>${description}</td>
    <td class="">${category}</td>
     <td>${date} </td>
    <td> ${guy == "Gasto" ? "-" : "+"} $ ${amount}</td>
    <td><button ${id}><i class="fa-solid fa-pen-to-square"></i></button>
    <button ${id}><i class="fa-solid fa-trash"></i></button></td>
    </tr>
    `
  } 
} 

 
//obtengo value del form nueva operacion//
const saveOperationsInformation = () =>{
 return{
    id: randomId(),
    description: $("#description").value,
    amount: $("#amount").valueAsNumber,
    guy: $("#guy").value ,
    category: $("#category").value,
    date: $("#date").value
 }
}

const addOperations = () =>{
  //arraydel local//
  const existingOperation =  getOperationsAndCategories("operations")
   const newOperation = saveOperationsInformation()
   existingOperation.push(newOperation)
   setOperationsAndCategories("operations", existingOperation)
   console.log(existingOperation)

}





// inicializar Mostrar y ocultar secciones, ejecutar btn//
const openSaved = () =>{
setOperationsAndCategories("operations", setOfOperations)
operationsData(setOfOperations)

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
   hideElement("#tittle-edit")
   hideElement("#edit-operation")
  })

  $("#add-new-operation").addEventListener("click", (e) =>{
    e.preventDefault()
    addOperations()

  })


}
//ejecuta cuando se carga el dom//
window.addEventListener("load", openSaved)