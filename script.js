const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

window.onload = loadTasks;

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  const task = { text: text, done: false };
  createTaskElement(task);
  saveTask(task);

  taskInput.value = "";
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.textContent = task.text;

  if (task.done) li.classList.add("completed");

  li.onclick = () => {
    li.classList.toggle("completed");
    updateStorage();
  };

  const delBtn = document.createElement("button");
  delBtn.textContent = "削除";
  delBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    updateStorage();
  };

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach(createTaskElement);
}

function updateStorage() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      done: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
