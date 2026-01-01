const template = document.getElementById("template");
const todoText = document.getElementById("todo-text");
const list = document.getElementById("list");
let todos = [];

const $ = (el) => document.getElementById(el);

function saveToLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

function fetchData() {
  const data = localStorage.getItem("todo-list");
  todos = data ? JSON.parse(data) : [];
  renderTodos();
}

function createTodoElement(el) {
  const clone = template.content.cloneNode(true);
  const taskInput = clone.querySelector(".task");
  const checkbox = clone.querySelector(".check-todo");
  const deleteBtn = clone.querySelector(".delete-btn");
  const editBtn = clone.querySelector(".edit-task-btn");
  const saveTask = clone.querySelector(".save-task-edit-btn");

  taskInput.disabled = true;
  taskInput.value = el.todo;

  if (el.completed) {
    taskInput.classList.add("completed");
    checkbox.checked = true;
  }

  deleteBtn.addEventListener("click", (e) => {
    todos = todos.filter((todo) => todo.key !== el.key);
    e.target.closest(".list-element").remove();
    saveToLocalStorage();
  });

  checkbox.addEventListener("change", (e) => {
    el.completed = e.target.checked;
    taskInput.classList.toggle("completed", el.completed);
    saveToLocalStorage();
  });

  editBtn.addEventListener("click", () => {
    editBtn.style.display = "none";
    saveTask.style.display = "block";
    taskInput.disabled = false;
    taskInput.style.borderBottom = "1px solid black";

    $("save-edit-btn").disabled = true;
    let items = document.getElementsByClassName("edit-task-btn");

    for (const item of items) {
      if (item != this) item.disabled = true;
    }
    items = document.getElementsByClassName("delete-btn");
    for (const item of items) {
      item.disabled = true;
    }
  });

  saveTask.addEventListener("click", () => {
    if (taskInput.value.trim() == "") {
      alert("Cannot save empty!");
      return;
    }
    editBtn.style.display = "block";
    saveTask.style.display = "none";
    taskInput.disabled = true;
    taskInput.style.border = "none";

    $("save-edit-btn").disabled = false;
    let items = document.getElementsByClassName("edit-task-btn");
    for (const item of items) {
      item.disabled = false;
    }
    items = document.getElementsByClassName("delete-btn");
    for (const item of items) {
      item.disabled = false;
    }
  });

  return clone;
}

function renderTodos() {
  list.innerHTML = "";
  todos.forEach((el) => {
    list.appendChild(createTodoElement(el));
  });
}

$("add-btn").addEventListener("click", () => {
  const text = todoText.value.trim();
  if (!text) return;

  const key = Date.now();
  const newTodo = { key, todo: text, completed: false };
  todos.push(newTodo);

  list.appendChild(createTodoElement(newTodo));
  saveToLocalStorage();
  todoText.value = ""; // clear input
});

$("edit-btn").addEventListener("click", (e) => {
  let items = document.getElementsByClassName("edit-task-btn");
  for (const item of items) {
    const checkbox = item.closest(".list-element").querySelector(".check-todo");
    if (checkbox && !checkbox.checked) {
      item.style.display = "block";
    }
  }
  items = document.getElementsByClassName("delete-btn");
  for (const item of items) {
    item.style.display = "block";
  }

  items = document.getElementsByClassName("check-todo");
  for (const item of items) {
    item.disabled = true;
  }

  todoText.disabled = true;
  $("add-btn").disabled = true;
  $("edit-btn").style.display = "none";
  $("save-edit-btn").style.display = "block";
});

$("save-edit-btn").addEventListener("click", (e) => {
  let items = document.getElementsByClassName("edit-task-btn");
  for (const item of items) {
    item.style.display = "none";
  }
  items = document.getElementsByClassName("delete-btn");
  for (const item of items) {
    item.style.display = "none";
  }
  items = document.getElementsByClassName("check-todo");
  for (const item of items) {
    item.disabled = false;
  }
  todoText.disabled = false;
  $("add-btn").disabled = false;
  $("edit-btn").style.display = "block";
  $("save-edit-btn").style.display = "none";
});

fetchData();
