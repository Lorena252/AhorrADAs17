const $ = (selector) => document.querySelector(selector)

const showElement = (selector) => $(selector).classList.remove("hidden")
const hideElement = (selector) => $(selector).classList.add("hidden")

const randomId = () => self.crypto.randomUUID()
            // localStorage//
 const getOperationsAndCategories = (key) => JSON.parse(localStorage.getItem(key))
 const setOperationsAndCategories = (key, array) => localStorage.setItem(key, JSON.stringify(array))

if(!getOperationsAndCategories("operations")){
  setOperationsAndCategories("operations", [])
}

//array del local//
const setOfOperations = getOperationsAndCategories("operations") || []


//pinta operaciones en el html//
const operationsData = (operations) => {
$("#table-operations").innerHTML = ""
  for (const {id, description, amount, guy,category, date } of operations){
    $("#table-operations").innerHTML += `
    <tr>
    <td>${description}</td>
    <td class="text-emerald-500">${category}</td>
     <td>${date} </td>
    <td> ${guy == "Gasto" ? "-" : "+"} $ ${amount}</td>
    <td><button class="bg-emerald-300	edit-operation" ><i class="fa-solid fa-pen-to-square"></i></button>
    <button class= "bg-red-600 rounded  delete-operation"  onclick="deleteOperation('${id}')"   ><i class="fa-solid fa-trash "></i></button></td>
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
  //array del local//
  const existingOperation =  getOperationsAndCategories("operations")
   const newOperation = saveOperationsInformation()
   existingOperation.push(newOperation)
   setOperationsAndCategories("operations", existingOperation)
   console.log(existingOperation)
}

//eliminar operacion
const deleteOperation = (id) =>{
      myOperations = getOperationsAndCategories("operations").filter(operation => operation.id !== id)
  console.log(myOperations)
setOperationsAndCategories("operations", myOperations)
operationsData(myOperations)
}




//categorias por default//
const defaultCategories = [
 
  {
  id: randomId(),
  category: "Todas"
  },
  {
   id: randomId(),
   category: "Comida"
  },
  {
    id: randomId(),
    category: "Servicios",  
  },
   {
    id: randomId(),
    category: "Salidas"  
   },
   {
    id: randomId(),
    category: "Educación"
   },
   {
    id: randomId(),
    category: "Transporte"
   },
   {
    id: randomId(),
    category: "Trabajo"
   },
   {
    id: randomId(),
    category:"Tienda de ropa"
    },
]


const setOfCategories = getOperationsAndCategories("categories") || defaultCategories
console.log(setOfCategories)

const categoriesData = (defaultCategories) =>{
  $("#select-category").innerHTML = ""
  for (const{id, category} of defaultCategories){
    $("#select-category").innerHTML += `
    <option value="${category}">${category} </option>
    `
  }
}

const sectionCategories = (defaultCategories) =>{
  $("#table-new-categories").innerHTML = ""
  for (const{id,category} of defaultCategories){
    $("#table-new-categories").innerHTML += `  
   <tr class= "flex justify-between ..."> 
   <td><option value="${category}">${category} </option> </td>
   <td><button class= "edit-category" ${id}><i class="fa-solid fa-pen-to-square"></i> </button>
   <button class="delete-category" ${id} ><i class="fa-solid fa-trash "></i> </button></td>
    </tr>
    `
  }
}

// inicializar Mostrar y ocultar secciones, ejecutar btn//
const openSaved = () =>{
  //operaciones localStorage//
  setOperationsAndCategories("operations", setOfOperations)
  operationsData(setOfOperations)
  //categorias localStorage//
  setOperationsAndCategories("categories", defaultCategories)
  categoriesData(defaultCategories)
  sectionCategories(defaultCategories)

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

  $("#add-category").addEventListener("click", (e)=>{

  })

}
//ejecuta cuando se carga el dom//
window.addEventListener("load", openSaved)