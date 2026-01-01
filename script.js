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
  const task = clone.querySelector(".task");
  const checkbox = clone.querySelector(".check-todo");
  const deleteBtn = clone.querySelector(".delete-btn");

  task.innerText = el.todo;

  if (el.completed) {
    task.classList.add("completed");
    checkbox.checked = true;
  }

  deleteBtn.addEventListener("click", (e) => {
    todos = todos.filter((todo) => todo.key !== el.key);
    e.target.closest(".list-element").remove();
    saveToLocalStorage();
  });

  checkbox.addEventListener("change", (e) => {
    el.completed = e.target.checked;
    task.classList.toggle("completed", el.completed);
    saveToLocalStorage();
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

fetchData();