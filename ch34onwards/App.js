// Define UI var
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListners();

function loadEventListners() {
    //dom load event
    document.addEventListener('DOMContentLoaded', getTasks);


    //add task event
    form.addEventListener('submit', addTask);

    //remove task event
    taskList.addEventListener('click', removeTask);

    //clear task event 
    clearBtn.addEventListener('click', clearTasks);

    //filter tasks events
    filter.addEventListener('keyup', filterTasks);
}

//local on DOM call
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task) => {
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        //create text node and append to li
        li.appendChild(document.createTextNode(task));
        //create new link element
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        //add icon html 
        link.innerHTML = '<i class="fas fa-dragon"></i>';
        li.appendChild(link);
        //append li to ui
        console.log(li);
        taskList.appendChild(li);
    })
}

//Add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a Task');
    }

    //create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html 
    link.innerHTML = '<i class="fas fa-dragon"></i>';
    li.appendChild(link);
    //append li to ui
    console.log(li);
    taskList.appendChild(li);

    //store in local storage
    storeTaskInLocalStorage(taskInput.value);

    //clear the input 
    taskInput.value = '';

    //prevent defualt form submit action
    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

            //remove from Local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);

        }
    }
}

//remove from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



//clear tasks
function clearTasks() {
    // taskList.innerHTML = '';

    //faster while loop
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}


//clear task from LocalStorage

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) !== -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );//node list
}