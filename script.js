const theInput = document.getElementById("theInput");
const themeToggle = document.getElementById("theme-toggle");
const addBtn = document.getElementById("add-btn");
const allBtn = document.getElementById("all");
const activeBtn = document.getElementById("active");
const completedBtn = document.getElementById("completed");
const allMobile = document.getElementById("all-mobile");
const activeMobile = document.getElementById("active-mobile");
const completedMobile = document.getElementById("completed-mobile");
const theList = document.querySelector(".todo-list");
const listContainer = document.querySelector(".listContainer");
const infoSection = document.querySelector(".infoSection");
const itemsLeft = document.querySelector(".items-left");
const clearBtn = document.querySelector(".clear-completed");
let toDoListArr = [];

// const addHandler = (e, inputValue) => {
//   inputValue = theInput.value;
//   if (
//     (e.key === "Enter" && inputValue !== "") ||
//     (e.type === "click" && inputValue !== "")
//   ) {
//     theList.innerHTML += `
//         <li class="todo-item">
//           <div class="checkImg"><img src="./images/icon-check.svg" alt="icon-check"></div>
//           <p class="todo-text">${inputValue}</p>
//           <img src="./images/icon-cross.svg" alt="icon-cross" class="cross">
//         </li>
//         `;

//     theInput.value = "";
//   }
// };

// theInput.addEventListener("keydown", addHandler);
// mainLabel.addEventListener("click", addHandler);
// theList.addEventListener("click", (e) => {
//   if (e.target.classList.contains("cross")) {
//     e.target.parentElement.remove();
//     itemsLeft.textContent = `${theList.children.length} Items Left`;
//   }
// });
const updatingItemsLeft = () => {
  const incompleteItems = toDoListArr.filter((todo) => !todo.isComplete);
  itemsLeft.textContent = `${incompleteItems.length} Items Left`;
};

if (localStorage.getItem("myTodos")) {
  toDoListArr = JSON.parse(localStorage.getItem("myTodos"));
  // console.log(todos);

  renderingTodoList();
  updatingItemsLeft();
}

const addingTodoItem = () => {
  if (theInput.value.trim() !== "") {
    const toDoText = theInput.value;
    theInput.value = "";

    const toDoItemId = Math.floor(Math.random() * 10000);

    const newTodoItem = {
      id: toDoItemId,
      text: toDoText,
      isComplete: false,
    };

    toDoListArr.push(newTodoItem);
    localStorage.setItem("myTodos", JSON.stringify(toDoListArr));

    renderingTodoList();
    updatingItemsLeft();
  }
};

theInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && theInput.value.trim() !== "") {
    addingTodoItem();
  }
});

addBtn.addEventListener("click", () => {
  // console.log(theInput.value);

  if (theInput.value.trim() !== "") {
    addingTodoItem();
  } else {
    alert(" Oops!   Please Add a ToDo Item ...");
  }
});

function renderingTodoList() {
  theList.innerHTML = "";

  toDoListArr.forEach((todo, index) => {
    const newTodoItem = document.createElement("li");
    newTodoItem.className = "todo-item";
    newTodoItem.setAttribute("data-index", index);
    newTodoItem.setAttribute("draggable", "true");

    const todoItemContent = `<div class="todo">
      <input type="checkbox" id="checkbox-${todo.id}" ${
      todo.isComplete ? "checked" : ""
    }>
      <label for="checkbox-${todo.id}"></label>
      <p>${todo.text}</p>
    </div>
    <div class="icons"> 
      <i class="fa fa-pencil" aria-hidden="true"></i>
      <i class="fa fa-times" aria-hidden="true"></i>
    </div>`;

    newTodoItem.innerHTML = todoItemContent;
    theList.appendChild(newTodoItem);
  });

  addDraggableEventListeners();
}

const changeTodoCompletion = (todoId) => {
  toDoListArr = toDoListArr.map((todoItem) => {
    if (todoItem.id === todoId) {
      todoItem.isComplete = !todoItem.isComplete;
    }
    return todoItem;
  });

  localStorage.setItem("myTodos", JSON.stringify(toDoListArr));
  renderingTodoList();
  updatingItemsLeft();
};

theList.addEventListener("change", (event) => {
  const checkbox = event.target;
  const todoId = Number(checkbox.id.split("-")[1]);

  changeTodoCompletion(todoId);
});

const editTodoItem = (todoID, newText) => {
  toDoListArr = toDoListArr.map((todoItem) => {
    if (todoItem.id === todoID) {
      return {
        id: todoItem.id,
        text: newText,
        isComplete: todoItem.isComplete,
      };
    }
    return todoItem;
  });

  localStorage.setItem("myTodos", JSON.stringify(toDoListArr));
  renderingTodoList();
};

theList.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-pencil")) {
    const icon = event.target;

    const todoItem = icon.parentElement.parentElement;
    const todoId = Number(
      todoItem.querySelector('input[type="checkbox"]').id.split("-")[1]
    );
    const todoText = todoItem.querySelector("p").textContent;
    const newText = prompt("Edit the Todo Item", todoText);
    if (newText !== null && newText !== "") {
      editTodoItem(todoId, newText);
    }
  }
  if (event.target.classList.contains("fa-times")) {
    const icon = event.target;
    const todoItem = icon.parentElement.parentElement;
    const todoId = Number(
      todoItem.querySelector('input[type="checkbox"]').id.split("-")[1]
    );
    deleteTodoItem(todoId);
  }
});

const deleteTodoItem = (todoId) => {
  toDoListArr = toDoListArr.filter((todoItem) => todoItem.id !== todoId);
  localStorage.setItem("myTodos", JSON.stringify(toDoListArr));
  renderingTodoList();
  updatingItemsLeft();
};

const filteringTodoList = (filterType) => {
  let filteredTodos = [];

  switch (filterType) {
    case "all":
      filteredTodos = toDoListArr;
      break;
    case "active":
      filteredTodos = toDoListArr.filter((todo) => !todo.isComplete);
      break;
    case "completed":
      filteredTodos = toDoListArr.filter((todo) => todo.isComplete);
      break;
  }

  renderFilteredTodoList(filteredTodos);
};

function renderFilteredTodoList(filteredTodos) {
  theList.innerHTML = "";

  filteredTodos.forEach((todo, index) => {
    const newTodoItem = document.createElement("li");
    newTodoItem.className = "todo-item";
    newTodoItem.setAttribute("data-index", index);
    newTodoItem.setAttribute("draggable", "true");

    const todoItemContent = `<div class="todo">
      <input type="checkbox" id="checkbox-${todo.id}" ${
      todo.isComplete ? "checked" : ""
    }>
      <label for="checkbox-${todo.id}"></label>
      <p>${todo.text}</p>
    </div>
    <div class="icons"> 
      <i class="fa fa-pencil" aria-hidden="true"></i>
      <i class="fa fa-times" aria-hidden="true"></i>
    </div>`;

    newTodoItem.innerHTML = todoItemContent;
    theList.appendChild(newTodoItem);
  });

  addDraggableEventListeners();
}

function addDraggableEventListeners() {
  const todoItems = document.querySelectorAll(".todo-item");

  todoItems.forEach((item, index) => {
    item.addEventListener("dragstart", () => item.classList.add("dragging"));

    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
      updateTodosOrder();
    });
  });

  theList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    // get array of all items except the one dragging
    let siblings = [...theList.querySelectorAll(".todo-item:not(.dragging)")];

    // find next sibling item after which the dragging item should be placed
    const nextSibling = siblings.find(
      (sibling) => e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2
    );

    // Inserting the dragging item before the found sibling
    theList.insertBefore(draggingItem, nextSibling);
  });

  theList.addEventListener("dragenter", (e) => e.preventDefault());
}

const updateTodosOrder = () => {
  const updatedTodos = [];

  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((item) => {
    const index = parseInt(item.getAttribute("data-index"));
    updatedTodos[index] = toDoListArr[index];
  });

  toDoListArr = updatedTodos;
  localStorage.setItem("myTodos", JSON.stringify(toDoListArr));
};

const clearCompleted = () => {
  toDoListArr = toDoListArr.filter((todoItem) => !todoItem.isComplete);
  localStorage.setItem("myTodos", JSON.stringify(toDoListArr));
  renderingTodoList();
  updatingItemsLeft();
};

themeToggle.addEventListener("click", () => {
  if (document.body.classList.contains("darkMode")) {
    document.body.classList.remove("darkMode");
    document.body.classList.add("lightMode");
    document.querySelector(".theSun").src = "./images/icon-moon.svg";
  } else {
    document.body.classList.remove("lightMode");
    document.body.classList.add("darkMode");
    document.querySelector(".theSun").src = "./images/icon-sun.svg";
  }
});

clearBtn.addEventListener("click", () => {
  clearCompleted();
});

allBtn.addEventListener("click", () => {
  activeBtn.classList.remove("active");
  completedBtn.classList.remove("active");
  allBtn.classList.add("active");
  filteringTodoList("all");
});

allMobile.addEventListener("click", () => {
  activeMobile.classList.remove("active");
  completedMobile.classList.remove("active");
  allMobile.classList.add("active");
  filteringTodoList("all");
});

activeBtn.addEventListener("click", () => {
  allBtn.classList.remove("active");
  completedBtn.classList.remove("active");
  activeBtn.classList.add("active");
  filteringTodoList("active");
});

activeMobile.addEventListener("click", () => {
  allMobile.classList.remove("active");
  completedMobile.classList.remove("active");
  activeMobile.classList.add("active");
  filteringTodoList("active");
});

completedBtn.addEventListener("click", () => {
  allBtn.classList.remove("active");
  activeBtn.classList.remove("active");
  completedBtn.classList.add("active");
  filteringTodoList("completed");
});

completedMobile.addEventListener("click", () => {
  allMobile.classList.remove("active");
  activeMobile.classList.remove("active");
  completedMobile.classList.add("active");
  filteringTodoList("completed");
});

// document.addEventListener("DOMContentLoaded", () => {
//   renderingTodoList();
//   updatingItemsLeft();
// });
