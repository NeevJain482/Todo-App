let todoText = document.getElementById("todo-text");
let list = document.getElementById("list");
let todos = [];
function addTodo() {
  let task = todoText.value.trim();
  if (!task) return;
  todos.push({ key: Math.random(), task });
  renderTodos();
}

function deleteTodo(key) {
  todos = todos.filter((el) => el.key != key);
  renderTodos();
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
