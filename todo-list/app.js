const form = document.getElementById("task-form");
const taskInput = document.querySelector("#task-form input[type='text']");
const tasksList = document.getElementById("tasks-list");
const filter = document.getElementById("filter");
const clearAll = document.querySelector(".clear-tasks");
tasksList.textContent;
if (localStorage.getItem("tasks") == null) {
  localStorage.setItem("tasks", "[]");
} else {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((it) => {
    const task = document.createElement("li");
    tasksList.appendChild(task);
    task.innerHTML = `${it}<a class="delete-item secondary-content"><i class="fa fa-remove"></i></a>`;
    task.classList.add("collection-item");
  });
}
form.addEventListener("submit", addTask);
tasksList.addEventListener("click", removeTask);
filter.addEventListener("keyup", filterTasks);
clearAll.addEventListener("click", (e) => {
  e.preventDefault();
  if (confirm("remove All Tasks?")) {
    tasksList.innerHTML = "";
  }
});
function addTask(e) {
  e.preventDefault();
  const task = document.createElement("li");
  tasksList.appendChild(task);
  task.innerHTML = `${taskInput.value}<a class="delete-item secondary-content"><i class="fa fa-remove"></i></a>`;
  task.classList.add("collection-item");
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.push(taskInput.value);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function removeTask(e) {
  e.preventDefault();
  if (e.target.classList.contains("fa-remove")) {
    if (confirm("are you sure to delete this task?")) {
      e.target.parentNode.parentNode.remove();
      const tasks = JSON.parse(localStorage.getItem("tasks"));

      const index = tasks.indexOf(e.target.parentNode.parentNode.textContent);
      if (index > -1) {
        tasks.splice(index, 1);
      }
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
}
function filterTasks(e) {
  const query = filter.value;
  const list = document.querySelectorAll(".collection-item");
  list.forEach((it) => {
    if (it.firstChild.textContent.indexOf(query) == -1) {
      it.style.display = "none";
    } else {
      it.style.display = "block";
    }
  });
}
