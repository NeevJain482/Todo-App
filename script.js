let todoText = document.getElementById("todo-text");
let list = document.getElementById("list");
let todos = [];

function saveToLocalStorage() {
  const todosStr = JSON.stringify(todos);
  localStorage.setItem("todo-list", todosStr);
}

function fetchData() {
  const data = localStorage.getItem("todo-list");
  const todosData = JSON.parse(data);
  todos = todosData;
  renderTodos();
}

function addTodo() {
  let task = todoText.value.trim();
  if (!task) return;
  todos.push({ key: Math.random(), task });
  renderTodos();
  saveToLocalStorage();
}

function deleteTodo(key) {
  todos = todos.filter((el) => el.key != key);
  renderTodos();
  saveToLocalStorage();
}

function renderTodos() {
  let todoStr = "";
  todos.map((todo) => {
    todoStr += `<div class="list-element ${todo.key}">
          <span>${todo.task}</span>
          <button class="delete-btn" onclick="deleteTodo('${todo.key}')">X</button>
        </div>`;
  });
  list.innerHTML = todoStr;
}
fetchData();
