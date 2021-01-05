const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// submit form function.

const addTask = (e) => {
  if (taskInput.value === '') {
    alert('add a task');
    // showError('add a task');
  }

  const li = document.createElement('li');

  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);

  taskList.append(li);

  //  clear the input
  taskInput.value = '';

  // store task input in local storage
  storeTaskInLocalStorage(taskInput.value);

  e.preventDefault();
};

// remove an item
const removeTask = (e) => {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
};

// clear tasks
const clearTasks = () => {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
};

// Search, filter query
const filterTasks = (e) => {
  let searchFilter = e.target.value.toLowerCase();
  let allSearchFilter = document.getElementsByClassName('collection-item');
  for (let counter = 0; counter < allSearchFilter.length; counter++) {
    const currentName = allSearchFilter[counter].textContent.toLowerCase();
    if (currentName.includes(searchFilter)) {
      allSearchFilter[counter].style.display = 'block';
    } else {
      allSearchFilter[counter].style.display = 'none';
    }
  }
};

// store task input function
const storeTaskInLocalStorage = (task) => {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

//  show error
// const showError = (error) => {
//   const errorDiv = document.createElement('p');

//   // const row = document.querySelector('.row');
//   // console.log(row);
//   const text = document.querySelector('.btn');
//   errorDiv.className = 'alert alert-danger';
//   errorDiv.appendChild(document.createTextNode(error));

//   text.prepend(errorDiv);
//   // row.insertBefore(errorDiv, text);
// };

form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTasks);
filter.addEventListener('keyup', filterTasks);
