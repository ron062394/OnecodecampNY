// Select DOM Elements
const todoInput = document.querySelector(".todo-input"); //Accessing ".todo-input" from thhe HTML document
const todoButton = document.querySelector(".todo-button"); //Accessing ".todo-button" from thhe HTML document
const todoList = document.querySelector(".todo-list"); //Accessing ".todo-list" from thhe HTML document
const filterOption = document.querySelector(".filter-todo"); //Accessing ".filter-todo" from thhe HTML document


//Event listeners
todoButton.addEventListener("click", addTodo); //3. Add a new task whenever the button is clicked
document.addEventListener("DOMContentLoaded", getTodos); // 5. Load task from the localStorage when the page is loaded
todoList.addEventListener("click", deleteOrCompleteTodo); // 8. Delete or complete a task
filterOption.addEventListener("click", filterTodo); // 10. Filter task based on completion

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
    todoList
    todoDiv.appendChild(newTodo);
    todoInput.value = "";


    // Create a button to mark the task as completed
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);


    // create a button to delete task
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //  Append the todo Div element to the todo List
    todoList.appendChild(todoDiv);
}


// 4. Function to load the task from the local storage when the page is loaded
function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
        // Create a todo Div container
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // Create a list item for the task
        const newTodo = document.createElement("li");
        newTodo.innerText =  todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // Create complete button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);


        // Create delete button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // Append todo Div to the todo List
        todoList.appendChild(todoDiv);
    });
}


//6. Funtion to remove the task from the local storage
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    };

    // TodoDiv element Container - Have 3 children(task, complete button, delete button)
    // todoDiv - children[0] = "task content"
    const task = todo.children[0].innerText; // task content
    const todoIndex = todos.indexOf(task);

    // delete an element in the array using the todoIndex as starting point
    todos.splice(todoIndex, 1);

    //Sync our todos variable to the localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
}   

// 7. Function to delete or complete task
function deleteOrCompleteTodo(e) {
    const item = e.target;

    // if the delete button is clicked, remove the task from the list
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);

        todo.addEventListener("transitionend", e => {
            todo.remove();
        });

    }

    // if the complete button is clicked, toggle the completed class
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

}


// 9. Function to filter task based on completion status
function filterTodo(e) {
    const todos = todoList.childNodes;
    
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none"
                }
                break;
        }
    });

}