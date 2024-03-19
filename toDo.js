"use strict";

const form = document.forms.toDo;
const input = form.elements.toDoInput;
var taskList = false;
//var i = 0;

form.onsubmit = function (event) {
  event.preventDefault();
  //console.log(i++);
  addTask();
};

function addTask() {
  if (!taskList) createTaskList();

  createTask();
}

function createTaskList() {
  const listContainer = document.createElement("div");
  form.after(listContainer);
  taskList = listContainer;
  //console.log("Теперь ты готов!");
}

function createTask() {
  const div = document.createElement("div");
  fillTask(div);
  addTaskButtons(div);
  //console.log(div);
}

function fillTask(elem) {
  const p = document.createElement("p");
  p.textContent = input.value;
  elem.append(p);
  //console.log(taskList);
  if (taskList) taskList.append(elem);
}

function addTaskButtons(elem) {
  const delBtn = document.createElement("button");
  const changeBtn = document.createElement("button");

  delBtn.textContent = "x";
  changeBtn.textContent = "c";

  delBtn.addEventListener("click", deleteTask);
  changeBtn.addEventListener("click", changeTask);

  elem.append(changeBtn);
  elem.append(delBtn);
}

function deleteTask(event) {
  event.target.parentElement.remove();
  event.target.removeEventListener("click", deleteTask);
}

function changeTask(event) {
  const task = event.target.parentElement;
  const taskText = task.firstElementChild.textContent;
  //const back = taskText.textContent;
  //console.log(back);
  /*
  const changeForm = document.createElement('form');
  const changeInput = document.createElement('input');
  const changeConfirmBtn = document.createElement('input');
  const changeCloseBtn = document.createElement('button');
  */
  toggleTaskUI(task);
  renderChangeForm(task);
  enableChangeForm(task, taskText);
}

function toggleTaskUI(elem) {
  const items = elem.children;
  for (let item of items) toggleItem(item);
}

function toggleItem(elem) {
  elem.hidden = !elem.hidden;
}

function renderChangeForm(elem) {
  elem.insertAdjacentHTML(
    "beforeend",
    `
    <form name="changeForm">
      <input type="text" name="change">
      <input type="submit" value="ok">
      <button>x</button>
    </form>
  `,
  );
}

function enableChangeForm(elem, taskText) {
  const changeForm = elem.lastElementChild;
  //console.log(changeForm);
  const cancelChangeBtn = changeForm.lastElementChild;
  //console.log(cancelChangeBtn);

  changeForm.elements.change.value = taskText;

  cancelChangeBtn.addEventListener("click", clearChangeForm);
  changeForm.addEventListener("submit", confirmChange);
}

function clearChangeForm(event) {
  //event.preventDefault();
  //console.log("мы тут");
  const changeForm = event.target.parentElement;
  const task = changeForm.parentElement;
  //console.log(task);
  event.target.removeEventListener("click", clearChangeForm);
  changeForm.remove();
  toggleTaskUI(task);
}

function confirmChange(event) {
  event.preventDefault();
  //console.log(event.target);
  const changeForm = event.target;
  const changeInput = changeForm.elements.change;
  const task = changeForm.parentElement;
  //console.log(changeInput);
  changeForm.parentElement.firstElementChild.textContent = changeInput.value;
  changeForm.removeEventListener("submit", confirmChange);
  changeForm.remove();
  toggleTaskUI(task);
}
