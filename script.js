const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item';

    const input = document.createElement('input');
    input.type = 'text';
    input.value = task;
    input.disabled = true;

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'task-buttons';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit';
    editBtn.onclick = () => {
      if (input.disabled) {
        input.disabled = false;
        editBtn.textContent = 'Save';
      } else {
        tasks[index] = input.value;
        input.disabled = true;
        editBtn.textContent = 'Edit';
        saveTasks();
      }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(deleteBtn);
    li.appendChild(input);
    li.appendChild(buttonGroup);
    taskList.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = taskInput.value.trim();
  if (newTask) {
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
  }
});

renderTasks();
