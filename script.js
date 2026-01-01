const template = document.getElementById("template");
const todoText = document.getElementById("todo-text");
const list = document.getElementById("list");
let todos = [];

const $ = (el) => document.getElementById(el);

function saveToLocalStorage() {
  const todosStr = JSON.stringify(todos);
  localStorage.setItem("todo-list", todosStr);
}

function fetchData() {
  const data = localStorage.getItem("todo-list");
  const todosData = JSON.parse(data);
  todos = todosData || [];
  renderTodos();
}

function renderTodos() {
  list.innerHTML = "";
  todos.map((el) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".task").innerText = el.todo;
    clone.querySelector(".delete-btn").addEventListener("click", (e) => {
      todos = todos.filter(todo => todo.key !== el.key);
      e.target.closest(".list-element").remove();
      saveToLocalStorage();
    });
    list.appendChild(clone);
  });
}

$("add-btn").addEventListener("click", () => {
  const text = todoText.value.trim();
  if (text === "") return;

  const key = Date.now();
  todos.push({ key, todo: text });

  const clone = template.content.cloneNode(true);
  clone.querySelector(".task").innerText = text;

  clone.querySelector(".delete-btn").addEventListener("click", (e) => {
    todos = todos.filter(el => el.key !== key);
    e.target.closest(".list-element").remove();
    saveToLocalStorage();
  });

  saveToLocalStorage();
  list.appendChild(clone);
});

fetchData();