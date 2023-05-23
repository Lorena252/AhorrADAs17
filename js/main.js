const $ = (selector) => document.querySelector(selector);

const showElement = (selector) => $(selector).classList.remove("hidden");
const hideElement = (selector) => $(selector).classList.add("hidden");

const randomId = () => self.crypto.randomUUID();
// localStorage//
const getOperationsAndCategories = (key) =>
  JSON.parse(localStorage.getItem(key));
const setOperationsAndCategories = (key, array) =>
  localStorage.setItem(key, JSON.stringify(array));

//array del local//
const setOfOperations = getOperationsAndCategories("operations") || [];

const operationsData = (operations) => {
  let accGanancias = [];
  let accGastos = [];
  $("#table-operations").innerHTML = "";
  if (operations.length) {
    hideElement(".container-no-results");
    showElement(".with-operations");

    for (const { id, description, amount, guy, category, date } of operations) {
      $("#table-operations").innerHTML += `
    <tr>
    <td>${description}</td>
    <td class="text-emerald-500">${category}</td>
     <td>${date} </td>
    <td ${
      guy == "Ganancia" ? accGanancias.push(amount) : accGastos.push(amount)
    }   > ${guy == "Gasto" ? "-" : "+"}  $ ${amount}</td>
    <td><button class="bg-emerald-300	rounded edit-operation" onclick="editOperation('${id}')"><i class="fa-solid fa-pen-to-square"></i></button>
    <button class= "bg-red-600 rounded  delete-operation"  onclick="deleteOperation('${id}')"   ><i class="fa-solid fa-trash "></i></button></td>
    </tr>
    `;
    }
  } else {
    showElement(".container-no-results");
    hideElement(".with-operations");
  }

  let acc = 0;
  for (let i = 0; i < accGanancias.length; i++) {
    acc = acc + accGanancias[i];
    $("#paint-earnings").innerHTML = acc;
  }

  let accG = 0;
  for (let i = 0; i < accGastos.length; i++) {
    accG = accG + accGastos[i];
    $("#paint-expenses").innerHTML = accG;
  }

  let resultadoTotal = acc - accG;
  if (resultadoTotal < 0) {
    $("#total-result").classList = "bg-red-600";
    $("#total-result").innerHTML = resultadoTotal;
  } else {
    $("#total-result").classList = "bg-emerald-600";
    $("#total-result").innerHTML = resultadoTotal;
    showElement(".total-positive");
  }
};

const validateFieldDescription = () => {
  if (description.value == "") {
    showElement("#complete-field");
  }
  return description.value !== "";
};

const saveOperationsInformation = (operationId) => {
  return {
    id: operationId ? operationId : randomId(),
    description: $("#description").value,
    amount: $("#amount").valueAsNumber,
    guy: $("#guy").value,
    category: $("#category").value,
    date: $("#date").value,
  };
};

const addOperations = () => {
  //array del local//
  const existingOperation = getOperationsAndCategories("operations");
  const newOperation = saveOperationsInformation();
  existingOperation.push(newOperation);
  setOperationsAndCategories("operations", existingOperation);
  console.log(existingOperation);
};

const deleteOperation = (id) => {
  myOperations = getOperationsAndCategories("operations").filter(
    (operation) => operation.id !== id
  );
  console.log(myOperations);
  setOperationsAndCategories("operations", myOperations);
  operationsData(myOperations);
};

let defaultCategories = [
  {
    id: randomId(),
    category: "Comida",
  },
  {
    id: randomId(),
    category: "Servicios",
  },
  {
    id: randomId(),
    category: "Salidas",
  },
  {
    id: randomId(),
    category: "Educación",
  },
  {
    id: randomId(),
    category: "Transporte",
  },
  {
    id: randomId(),
    category: "Trabajo",
  },
];

const setOfCategories = getOperationsAndCategories("categories") || defaultCategories;

const validateFielNewCategory = () => {
  const newCategory = $("#new-category").value;
  if (newCategory == "") {
    showElement("#complete-field-category");
  }
  return newCategory !== "";
};

const categoriesData = (defaultCategories) => {
  $("#select-category").innerHTML += "";
  for (const { id, category } of defaultCategories) {
    $("#select-category").innerHTML += `
    <option  value="${category}">${category} </option>
    `;
    $("#category").innerHTML += `
    <option  value="${category}">${category} </option>
    `;
  }
};

const sectionCategories = (defaultCategories) => {
  $("#table-new-categories").innerHTML = "";
  for (const { id, category } of defaultCategories) {
    $("#table-new-categories").innerHTML += `  
   <tr class= "flex justify-between ..."> 
   <td><option  class="text-emerald-500"  value="${category}">${category} </option> </td>
   <td><button class= "edit-category" ${id}><i class="fa-solid fa-pen-to-square"></i> </button>
   <button class="delete-category" onclick="deleteCategory('${id}')" ><i class="fa-solid fa-trash "></i> </button></td>
    </tr>
    `;
  }
};

const deleteCategory = (id) => {
  myCategories = getOperationsAndCategories("categories").filter(
    (categorie) => categorie.id !== id
  );
  setOperationsAndCategories("categories", myCategories);
  categoriesData(myCategories);
  sectionCategories(myCategories)
};

const getNewCategory = () => {
  return {
    id: randomId(),
    category: $("#new-category").value,
  };
};

const saveNewCategory = () => {
  const bringCategories = getOperationsAndCategories("categories");
  const newCategory = getNewCategory();
  bringCategories.push(newCategory);
  setOperationsAndCategories("categories", bringCategories);
};

//boton editar operaciones//
const endEdit = () => {
  const editById = $("#edit-operation").getAttribute("btn-edit");
  const editSpecificOperation = getOperationsAndCategories("operations").map(
    (operation) => {
      if (operation.id === editById) {
        return saveOperationsInformation(operation.id);
      }
      return operation;
    }
  );
  setOperationsAndCategories("operations", editSpecificOperation);
};

const editOperation = (id) => {
  showElement(".show-operation");
  hideElement(".show-categories");
  hideElement(".show-balance");
  hideElement(".show-reports");
  hideElement(".new-operation");
  hideElement(".add-operation");
  const editMyOperation = getOperationsAndCategories("operations").find(
    (operation) => operation.id === id
  );
  console.log(editMyOperation);
  $("#edit-operation").setAttribute("btn-edit", id);
  $("#description").value = editMyOperation.description;
  $("#amount").valueAsNumber = editMyOperation.amount;
  $("#guy").value = editMyOperation.guy;
  $("#category").value = editMyOperation.category;
  $("#date").value = editMyOperation.date;
};


const openSaved = () => {
  setOperationsAndCategories("operations", setOfOperations);
  operationsData(setOfOperations);
  setOperationsAndCategories("categories", setOfCategories);
  categoriesData(setOfCategories);
  sectionCategories(setOfCategories);

  $("#categories").addEventListener("click", () => {
    showElement(".show-categories");
    hideElement(".show-balance");
    hideElement(".show-reports");
    hideElement(".show-operation");
  });

  $("#balance").addEventListener("click", () => {
    showElement(".show-balance");
    hideElement(".show-categories");
    hideElement(".show-reports");
    hideElement(".show-operation");
  });

  $("#reports").addEventListener("click", () => {
    showElement(".show-reports");
    hideElement(".show-balance");
    hideElement(".show-categories");
    hideElement(".show-operation");
  });

  $("#new-operation").addEventListener("click", () => {
    showElement(".show-operation");
    hideElement(".show-balance");
    hideElement(".show-categories");
    hideElement(".container-no-results");
    hideElement("#tittle-edit");
    hideElement("#edit-operation");
  });

  $("#add-new-operation").addEventListener("click", (e) => {
    e.preventDefault();
    if (validateFieldDescription()) {
      addOperations();
    }
  });

  $("#add-category").addEventListener("click", () => {
    if (validateFielNewCategory()) {
      getNewCategory();
      saveNewCategory();
      sectionCategories(getOperationsAndCategories("categories"));
    }
  });

  $("#edit-operation").addEventListener("click", (e) => {
    e.preventDefault();
    endEdit();
    hideElement(".show-operation");
    showElement(".show-balance");
    operationsData(getOperationsAndCategories("operations"));
  });

 $("#hidden-filters").addEventListener("click", () =>{
 hideElement("#container-filters")
 hideElement("#hidden-filters")
 showElement("#see-filters")
 })

 $("#see-filters").addEventListener("click", () =>{
  showElement("#container-filters")
  showElement("#hidden-filters")
  hideElement("#see-filters")
 })


};
//ejecuta cuando se carga el dom//
window.addEventListener("load", openSaved);
