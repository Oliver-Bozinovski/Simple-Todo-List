"use strict";
const btn = document.getElementById("todo-button");
const input = document.getElementById("todo-input");
const form = document.querySelector("form");
const ul = document.querySelector("ul");
const todos = getTodos();
// Loop through the todos and create them.
todos.forEach(createTodo);
function getTodos() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos === null)
        return [];
    return JSON.parse(storedTodos);
}
// Function to handle the submit event.
function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
        text: input.value,
        complete: false,
    };
    createTodo(newTodo);
    todos.push(newTodo);
    // Store the todos in the local storage and stringify them.
    updateTodo();
    input.value = "";
}
// Function to update the todos in the local storage.
function updateTodo() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
// Function to create a new todo.
function createTodo(todo) {
    const newLi = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.complete;
    checkbox.addEventListener("change", () => {
        todo.complete = checkbox.checked;
        updateTodo();
    });
    const deleteButton = document.createElement("button");
    deleteButton.addEventListener("click", () => {
        newLi.remove();
        todos.splice(todos.indexOf(todo), 1);
        updateTodo();
    });
    newLi.append(todo.text);
    newLi.append(checkbox);
    newLi.append(deleteButton);
    deleteButton.append("Delete");
    ul.append(newLi);
}
form.addEventListener("submit", handleSubmit);
