const $ = document;
const inputElem = $.getElementById('itemInput');
const addButton = $.getElementById('addButton');
const clearButton = $.getElementById('clearButton');
const todoListElem = $.getElementById('todoList');
let todosArray = [];

function addNewTodo(){
  const newTodoTitle = inputElem.value.trim();
  if(!newTodoTitle) return;
  const newTodoObj = {
    id: Date.now(),
    title: newTodoTitle,
    complete: false,
  };
  todosArray.push(newTodoObj);
  updateTodos();
  inputElem.value = '';
  inputElem.focus();
}
function updateTodos(){
  localStorage.setItem('todos', JSON.stringify(todosArray));
  renderTodos();
}
function renderTodos(){
  todoListElem.innerHTML = '';
  todosArray.forEach((todo)=>{
    const todoLi = $.createElement('li');
    todoLi.className = `well ${todo.complete ? 'uncompleted' : 'completed'}`;
    const label = $.createElement('label');
    label.textContent = todo.title;
    const completeBtn = $.createElement('button');
    completeBtn.className = 'btn btn-success';
    completeBtn.textContent = todo.complete ? 'UnComplete' : 'Complete';
    completeBtn.onclick = () => toggleTodoCompletion(todo.id);
    const deleteBtn = $.createElement('button');
    deleteBtn.className = 'btn btn-danger';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => removeTodoById(todo.id);
    todoLi.append(label, completeBtn, deleteBtn);
    todoListElem.appendChild(todoLi);
  });
}
function toggleTodoCompletion(todoId) {
  todosArray = todosArray.map((todo)=>
    todo.id === todoId ? { ...todo, complete: !todo.complete } : todo
  );
  updateTodos();
}
function removeTodoById(todoId){
  todosArray = todosArray.filter((todo)=>todo.id !== todoId);
  updateTodos();
}
function loadTodos(){
  const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  todosArray = savedTodos;
  renderTodos();
}
function clearTodos(){
  todosArray = [];
  localStorage.removeItem('todos');
  renderTodos();
}
window.addEventListener('load',loadTodos);
addButton.addEventListener('click',addNewTodo);
clearButton.addEventListener('click',clearTodos);
inputElem.addEventListener('keydown',(e)=>{
  if(e.key === 'Enter') addNewTodo();
});