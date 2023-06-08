const $ = (selector) => document.querySelector(selector);

const showElement = (selector) => $(selector).classList.remove("hidden");
const hideElement = (selector) => $(selector).classList.add("hidden");

const randomId = () => self.crypto.randomUUID();

const getOperationsAndCategories = (key) =>
  JSON.parse(localStorage.getItem(key));
const setOperationsAndCategories = (key, array) =>
  localStorage.setItem(key, JSON.stringify(array));

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
    <td class="pl-[20px] pt-4 font-medium">${description}</td>
    <td class="text-emerald-500 pl-[30px] pt-4  value ="${category} ">${category}</td>
    <td class="max-sm:hidden"></td>
     <td class="pl-[30px] pt-4 max-sm:pl-[10px]">${date.slice(
       8,
       10
     )}/${date.slice(5, 7)}/${date.slice(0, 4)} </td>
    <td class="pl-[30px] pt-4 font-bold max-sm:pl-[5px]" ${
      guy == "Ganancia" ? accGanancias.push(amount) : accGastos.push(amount)
    }   > ${guy == "Gasto" ? "-" : "+"}  $ ${amount}</td>
    <td class="pl-[50px] pt-4 "><button class="bg-emerald-300	rounded edit-operation" onclick="editOperation('${id}')"><i class="fa-solid fa-pen-to-square"></i></button>
    <button class= "bg-red-600  rounded  delete-operation"  onclick="deleteOperation('${id}')"   ><i class="fa-solid fa-trash "></i></button></td>
    </tr>
    `;
    }
  } else {
    showElement(".container-no-results");
    hideElement(".with-operations");
  }

  let acc = 0;
  if (accGanancias == 0) {
    $("#paint-earnings").innerHTML = "0";
  } else {
    for (let i = 0; i < accGanancias.length; i++) {
      acc = acc + accGanancias[i];
      $("#paint-earnings").innerHTML = acc;
    }
  }
  let accG = 0;

  if (accGastos == 0) {
    $("#paint-expenses").innerHTML = "0";
  } else {
    for (let i = 0; i < accGastos.length; i++) {
      accG = accG + accGastos[i];
      $("#paint-expenses").innerHTML = accG;
    }
  }
  let resultadoTotal = acc - accG;

  if (resultadoTotal < 0) {
    $("#total-result").classList = "text-rose-600";
    $("#total-result").innerHTML = resultadoTotal;
    hideElement(".total-positive");
  } else if (resultadoTotal === 0) {
    $("#total-result").innerHTML = "$0";
    $("#total-result").classList = "text-black";
    hideElement(".total-positive");
  } else {
    $("#total-result").classList = "text-teal-400";
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
  const existingOperation = getOperationsAndCategories("operations");
  const newOperation = saveOperationsInformation();
  existingOperation.push(newOperation);
  setOperationsAndCategories("operations", existingOperation);
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

const setOfCategories =
  getOperationsAndCategories("categories") || defaultCategories;

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
    <option  value="${category}"   id=" ${id}" >${category} </option>
    `;
    $("#category").innerHTML += `
    <option  value="${category}" data-id="${id}" >${category} </option>
    `;
  }
};

const sectionCategories = (defaultCategories) => {
  $("#table-new-categories").innerHTML = "";
  for (const { id, category } of defaultCategories) {
    $("#table-new-categories").innerHTML += `
   <tr class= "flex justify-between ...">
   <td><option  class="text-emerald-500"  value="${category}" " >${category} </option> </td>
   <td><button class= "edit-category " onclick="editCategory('${id}')"><i class="fa-solid fa-pen-to-square"></i> </button>
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
  sectionCategories(myCategories);
};

const getNewCategory = (categorieId) => {
  return {
    id: categorieId ? categorieId : randomId(),
    category: $("#new-category").value,
  };
};

const saveNewCategory = () => {
  const bringCategories = getOperationsAndCategories("categories");
  const newCategory = getNewCategory();
  bringCategories.push(newCategory);
  setOperationsAndCategories("categories", bringCategories);
};

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

const endEditCategory = () => {
  const editCategoryId = $("#btn-edit-category").getAttribute("edit-category");
  const editCategorySpecificId = getOperationsAndCategories("categories").map(
    (category) => {
      if (category.id === editCategoryId) {
        return getNewCategory(category.id);
      }
      return category;
    }
  );
  setOperationsAndCategories("categories", editCategorySpecificId);
};

const editCategory = (id) => {
  showElement(".btns-edit-category");
  showElement("#title-edit-category");
  hideElement(".title-categories");
  hideElement("#add-category");
  hideElement("#table-new-categories");

  const editSpecifiCategory = getOperationsAndCategories("categories").find(
    (categorie) => categorie.id === id
  );
  console.log(editSpecifiCategory.category);

  $("#btn-edit-category").setAttribute("edit-category", id);
  $("#new-category").value = editSpecifiCategory.category;
};

const cantidasPorMes = () => {
  let objMesGanancias = {};
  let objMesGastos = {};
  let objMesBalance = {};
  let mesBalance = "";
  let data = setOfOperations;
  let nombreMes = "";
  $(".totales-por-mes").innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    let mesMayorGasto = 0;
    let mesMayorGanancia = 0;
    const mesesFiltrados = setOfOperations.filter(
      (operation) => operation.date === data[i].date
    );

    for (const date of mesesFiltrados) {
      guy = date.guy;
      operation = date.amount;
      fecha = date.date.slice(0, 7);
      if (fecha === fecha && guy === "Ganancia") {
        mesMayorGanancia += operation;
        nombreMes = fecha;
        objMesGanancias[nombreMes] = mesMayorGanancia;
      } else if (fecha === fecha && guy === "Gasto") {
        mesMayorGasto += operation;
        nombreMes = fecha;
        objMesGastos[nombreMes] = mesMayorGasto;
      }
      mesBalance = mesMayorGanancia - mesMayorGasto;
      nombreMes = fecha;
      objMesBalance[nombreMes] = date.amount;
    }

    $(".totales-por-mes").innerHTML += `
<td class="pl-4 font-medium">${nombreMes}   </td> 
 <td class="pl-6 text-teal-400">${mesMayorGanancia} </td>
<td class="pl-6 text-rose-500"> ${mesMayorGasto} </td>
<td>${mesBalance}</td> 
`;
  }

  let mesMasGanancia = "";
  let mesMontoGanancia = 0;
  for (const key in objMesGanancias) {
    if (objMesGanancias[key] > mesMontoGanancia) {
      mesMontoGanancia = objMesGanancias[key];
      mesMasGanancia = key;
    }
  }

  $(".mes-mayor-ganancia").innerHTML = `
<td class="font-medium">Mes con mayor ganancia</td>
<td>${mesMasGanancia}</td>
<td class= "text-teal-400" >${mesMontoGanancia}</td> 
`;
  let mesMayorGasto = "";
  let mesMontoGasto = 0;
  for (const key in objMesGastos) {
    if (objMesGastos[key] > mesMontoGasto) {
      mesMontoGasto = objMesGastos[key];
      mesMayorGasto = key;
    }
  }

  $(".mes-mayor-gasto").innerHTML = `
<td class="font-medium">Mes con mayor gasto</td>
<td>${mesMayorGasto}</td>
<td class="text-teal-400">${mesMontoGasto}</td> 
`;
};
cantidasPorMes();

const cantidadCategories = () => {

  $(".totales-por-categorias").innerHTML = "";
  $(".categoria-mayor").innerHTML = "";
  let categorias = setOfCategories;
  let nuevoObj = {};
  let categoria = "";
  let objGasto = {};
  let objBalance = {};
  let montoGanancia = 0;
  let montoGasto = 0;
  let mayorBalance = 0;
  let nombreCategoria = "";

  for (let i = 0; i < categorias.length; i++) {
    const operacionesFiltradas = setOfOperations.filter(
      (operacion) => operacion.category === categorias[i].category
    );
    for (const category of operacionesFiltradas) {
      guy = category.guy;
      if (guy === "Ganancia") {
        montoGanancia += category.amount;
        nombreCategoria = category.category;
        nuevoObj[nombreCategoria] = montoGanancia;
      } else if (guy === "Gasto") {
        montoGasto += category.amount;
        nombreCategoria = category.category;
        objGasto[nombreCategoria] = montoGasto;
      }
      mayorBalance = montoGanancia - montoGasto;
      nombreCategoria = category.category;
      objBalance[nombreCategoria] = mayorBalance;
    }

    $(".totales-por-categorias").innerHTML += `
     <tr>
      <td class="pl-4 font-medium">${nombreCategoria} </td>
      <td class="pl-4 text-rose-500 ">${(montoGasto = 0 ? "0" : montoGasto)} </td>
      <td class="pl-4 text-teal-400" >  ${(montoGanancia = 0 ? "0" : montoGanancia)} </td>
      <td > ${mayorBalance} </td>
    </tr>
     `;
  }


  let montoMayorGanancia = 0;
  let categoriaMayorGanancia = "";

  let montoMayorGasto = 0;
  let categoriaMayorGasto = "";

  let montoMayorBalance = 0;
  let categoriaMayorBalance = "";

  for (const key in nuevoObj) {
    if (nuevoObj[key] > montoMayorGanancia) {
      montoMayorGanancia = nuevoObj[key];
      categoriaMayorGanancia = key;
    }
    $(".categoria-mayor").innerHTML = `
   <td class="font-medium">Categoria con mayor ganancia</td>
    <td class="pl-4 text-emerald-500 "> ${categoriaMayorGanancia}</td>
   <td class="text-teal-400"> $${montoMayorGanancia}</td>
    `;
  }

  for (const key in objGasto) {
    if (objGasto[key] > montoMayorGasto) {
      montoMayorGasto = objGasto[key];
      categoriaMayorGasto = key;
    }
    $(".categoria-mayor-gasto").innerHTML = `
    <td class="font-medium">Categoria con mayor gasto</td>
     <td class="pl-4 text-emerald-500">${categoriaMayorGasto}</td>
    <td class="text-rose-500"> $${montoMayorGasto}</td>
     `;
  }
  for (const key in objBalance) {
    if (objBalance[key] > montoMayorBalance) {
      montoMayorBalance = objBalance[key];
      categoriaMayorBalance = key;
    }

    $(".categoria-mayor-balance").innerHTML = `
      <td class="font-medium" >Categoría con mayor balance</td>
     <td class="pl-4 text-emerald-500 ">${nombreCategoria}</td>
     <td class="font-medium">$${mayorBalance}</td>  
     `;
  }
};
cantidadCategories();

const allFilters = () => {
  const selectType = $("#select-type").value;
  const filterType = setOfOperations.filter((operacion) => {
    if (selectType === "") {
      return setOfCategories;
    }
    return selectType === operacion.guy;
  });

  const selectCategory = $("#select-category").value;
  const filterCategory = filterType.filter((operacion) => {
    if (selectCategory === "") {
      return operacion;
    }
    return selectCategory === operacion.category;
  });

  const inputDate = $("#date-filter").value;
  const filterDate = filterCategory.filter((operacion) => {
    return new Date(operacion.date) > new Date(inputDate);
  });

  const selectSortBy = $("#sort-by").value;
  const filterSort = filterDate.sort((a, b) => {
    if (selectSortBy === "Menos reciente") {
      return a.date > b.date ? 1 : -1;
    }
    if (selectSortBy === "Mas reciente") {
      return a.date < b.date ? 1 : -1;
    }
    if (selectSortBy === "Menor monto") {
      return a.amount > b.amount ? 1 : -1;
    }
    if (selectSortBy === "Mayor monto") {
      return a.amount < b.amount ? 1 : -1;
    }
    if (selectSortBy === "Z/A") {
      return a.description < b.description ? 1 : -1;
    }
    if (selectSortBy === "A/Z") {
      return a.description > b.description ? 1 : -1;
    }
  });
  return filterSort;
};

const inputCurrentDate = () => {
  var fecha = new Date();
  var mes = fecha.getMonth() + 1;
  var dia = fecha.getDate();
  var ano = fecha.getFullYear();
  if (dia < 10) dia = "0" + dia;
  if (mes < 10) mes = "0" + mes;
  $("#date").value = ano + "-" + mes + "-" + dia;
  $("#date-filter").value = ano + "-" + mes + "-" + dia;
};

const openSaved = () => {
  setOperationsAndCategories("operations", setOfOperations);
  operationsData(setOfOperations);
  setOperationsAndCategories("categories", setOfCategories);
  categoriesData(setOfCategories);
  sectionCategories(setOfCategories);
  inputCurrentDate();

  $("#categories").addEventListener("click", () => {
    showElement(".show-categories");
    showElement(".title-categories");
    showElement("#table-new-categories");
    showElement("#add-category");

    hideElement(".btns-edit-category");
    hideElement("#title-edit-category");
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
    $("#new-category").value = "";
  });

  $("#edit-operation").addEventListener("click", (e) => {
    e.preventDefault();
    if (validateFieldDescription()) {
      endEdit();
      hideElement(".show-operation");
      showElement(".show-balance");
      operationsData(getOperationsAndCategories("operations"));
    }
  });

  $("#btn-edit-category").addEventListener("click", (e) => {
    e.preventDefault();
    endEditCategory();
    sectionCategories(getOperationsAndCategories("categories"));
    hideElement(".btns-edit-category");
    hideElement("#title-edit-category");
    showElement(".title-categories");
    showElement("#add-category");
    showElement("#table-new-categories");
  });

  $("#hidden-filters").addEventListener("click", () => {
    hideElement("#container-filters");
    hideElement("#hidden-filters");
    showElement("#see-filters");
  });

  $("#see-filters").addEventListener("click", () => {
    showElement("#container-filters");
    showElement("#hidden-filters");
    hideElement("#see-filters");
  });

  $("#select-type").addEventListener("input", () => {
    const operationType = allFilters();
    operationsData(operationType);
  });

  $("#select-category").addEventListener("input", () => {
    const operationCategory = allFilters();
    operationsData(operationCategory);
  });

  $("#date-filter").addEventListener("input", () => {
    const filterbyDate = allFilters();
    operationsData(filterbyDate);
  });

  $("#sort-by").addEventListener("input", () => {
    const sort = allFilters();
    operationsData(sort);
  });
};

window.addEventListener("load", openSaved);
