export const todo = () => {
  let activeAddDay = null;

  const addButtons = document.querySelectorAll(".add-task-btn");

  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      //   console.log(btn);
      const day = btn.closest(".todo-day");
      console.log(day);

      if (activeAddDay && activeAddDay !== day) {
        closeAddMode(activeAddDay);
      }

      openAddMode(day);
    });
  });

  function openAddMode(day) {
    // console.log(day)
    activeAddDay = day;

    const btn = day.querySelector(".add-task-btn");
    const inputBox = day.querySelector(".add-task-input");
    const input = day.querySelector(".add-task-input input");

    btn.classList.add("hidden");
    inputBox.classList.remove("hidden");
    input.focus();

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && input.value.trim() !== "") {
        addTask(day, input.value.trim());
        closeAddMode(day);
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeAddMode(day);
      }
    });
  }

  function closeAddMode(day) {
    const btn = day.querySelector(".add-task-btn");
    const inputBox = day.querySelector(".add-task-input");
    const input = day.querySelector(".add-task-input input");

    btn.classList.remove("hidden");
    inputBox.classList.add("hidden");
    input.value = "";

    activeAddDay = null;
  }

  function addTask(day, text) {
    const taskList = day.querySelector(".task-list");
    const input = day.querySelector(".add-task-input input");

    const li = document.createElement("li");
    li.className = "task";

    li.innerHTML = `<div class="check-n-task">
                    <input type="checkbox" />
                  <span class="task-text">
                    ${text}
                  </span>
                  </div>
                   <i class="ri-delete-bin-5-fill delete"></i>
                  `;

    taskList.appendChild(li);

    input.value = "";
  }

  //looping through tasklist to add practicality to delete and checkbox
  const taskList = document.querySelectorAll(".task-list");
  // console.log(taskList)
  taskList.forEach((list) => {
    // console.log(list)
    list.addEventListener("click", (e) => {
      const task = e.target.closest(".task");
      if (!task) return;

      if (e.target.classList.contains("delete")) {
        task.remove();
        return;
      }
      if(e.target.matches("input[type = 'checkbox'")){
        task.classList.toggle("completed", e.target.checked)
      }
      // if(e.)
      // console.log(e.target.closest(".task"));
    });
  });
};
