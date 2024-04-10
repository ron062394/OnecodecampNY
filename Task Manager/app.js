// Select DOM Elements
const todoInput = document.querySelector(".todo-input"); //Accessing ".todo-input" from thhe HTML document
const todoButton = document.querySelector(".todo-button"); //Accessing ".todo-button" from thhe HTML document
const todoList = document.querySelector(".todo-list"); //Accessing ".todo-list" from thhe HTML document
const filterOption = document.querySelector(".filter-todo"); //Accessing ".filter-todo" from thhe HTML document


//Event listeners




//Create Functions

// 1. Function to save task to LocalStorage / middleware
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


// 2. Function to add a new task
function addTodo(e) {
    // Prevent form Submission
    e.preventDefault();

    // Create a new todo div container
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //  Create a new list item for the task
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;

    // Save the task to local storage
    saveLocalTodos(todoInput.value);

    
}