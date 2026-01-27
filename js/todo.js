export const todo = () => {
  const planner = {
    monday: [
      {
        id: crypto.randomUUID(),
        task: "get up",
        completed: false,
      },
      {
        id: crypto.randomUUID(),
        task: "sing a song",
        completed: false,
      },
      {
        id: crypto.randomUUID(),
        task: "do sit up",
        completed: false,
      },
    ],
    tuesday: [],
    wednesday: [],
  };

  let activeAddDay = null;

  // todo day -initial render
  const todoDay = document.querySelectorAll(".todo-day");
  todoDay.forEach((day) => {
    const dayName = day.dataset.day.toLowerCase();
    renderTask(dayName, day);
    // console.log(day);
  });

  // add button
  const addButtons = document.querySelectorAll(".add-task-btn");
  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const day = btn.closest(".todo-day");
      // console.log(btn);
      // console.log(day);
      // console.log(day.dataset.day);

      if (activeAddDay && activeAddDay !== day) {
        closeAddMode(activeAddDay);
      }

      openAddMode(day);
    });
  });

  //openAddMode function
  function openAddMode(day) {
    activeAddDay = day;
    // console.log(day)

    const btn = day.querySelector(".add-task-btn");
    const inputBox = day.querySelector(".add-task-input");
    const input = day.querySelector(".add-task-input input");

    btn.classList.add("hidden");
    inputBox.classList.remove("hidden");
    input.focus();
  }

  //closeAddMode function
  function closeAddMode(day) {
    const btn = day.querySelector(".add-task-btn");
    const inputBox = day.querySelector(".add-task-input");
    const input = day.querySelector(".add-task-input input");

    btn.classList.remove("hidden");
    inputBox.classList.add("hidden");
    input.value = "";
    activeAddDay = null;
  }

  // addTask
  function addTask(dayName, text) {
    // const taskList = day.querySelector(".task-list");
    // const input = day.querySelector(".add-task-input input");
    // const li = document.createElement("li");
    // li.className = "task";
    // console.log(day.dataset.day);
    planner[dayName].push({
      id: crypto.randomUUID(),
      task: text,
      completed: false,
    });
  }
  //deleting the task
  function deleteTask(dayName, id) {
    planner[dayName] = planner[dayName].filter((t) => t.id !== id);
  }

  function toggleTask(dayName, id) {
    const task = planner[dayName].find((t) => t.id === id);
    if (task) task.completed = !task.completed;
  }

  function renderTask(dayName, dayEl) {
    // console.log(dayEl);
    // console.log(dayName);
    const taskList = dayEl.querySelector(".task-list");
    // console.log(taskList);
    taskList.innerHTML = "";

    planner[dayName].forEach((task) => {
      const li = document.createElement("li");
      li.className = "task";
      li.dataset.id = task.id;

      if (task.completed) li.classList.add("completed");

      li.innerHTML = `
      <div class="check-n-task">
      <input type = "checkbox" ${task.completed ? "checked" : ""} />
      <span class="task-text">${task.task}</span>
      </div>
      <i class="ri-delete-bin-5-fill delete"></i>
`;

      taskList.appendChild(li);
      // console.log(task);
    });
  }

  //other events when clicked(check,cross,keywords)
  document.addEventListener("click", (e) => {
    // console.log(e.target.closest(".todo-day"));
    const day = e.target.closest(".todo-day");
    if (!day) return;

    const dayName = day.dataset.day.toLowerCase();
    // console.log(dayName);

    //check
    if (e.target.classList.contains("check")) {
      const input = day.querySelector(".add-task-input input");
      if (input.value.trim()) {
        addTask(dayName, input.value.trim());
        renderTask(dayName, day);
      }
      closeAddMode(day);
    }

    //cross
    if (e.target.classList.contains("cross")) {
      closeAddMode(day);
    }

    //delete
    if (e.target.classList.contains("delete")) {
      const taskEl = e.target.closest(".task");
      deleteTask(dayName, taskEl.dataset.id);
      renderTask(dayName, day);
    }
  });

  document.addEventListener("change", (e) => {
    if (e.target.type !== "checkbox") return;

    const taskEl = e.target.closest(".task");
    const day = e.target.closest(".todo-day");
    const dayName = day.dataset.day.toLowerCase();

    toggleTask(dayName, taskEl.dataset.id);
    renderTask(dayName, day);
  });

  document.addEventListener("keydown", (e) => {
    if (!activeAddDay) return;

    const input = activeAddDay.querySelector(".add-task-input input");
    const dayName = activeAddDay.dataset.day.toLowerCase();

    if (e.key === "Enter" && input.value.trim()) {
      addTask(dayName, input.value.trim());
      renderTask(dayName, activeAddDay);
      closeAddMode(activeAddDay);
    }

    if (e.key === "Escape") {
      closeAddMode(activeAddDay);
    }
  });
};

//looping through tasklist to add practicality to delete and checkbox
// const taskList = document.querySelectorAll(".task-list");
// console.log(taskList)
//   taskList.forEach((list) => {
//     // console.log(list)
//     list.addEventListener("click", (e) => {
//       const task = e.target.closest(".task");
//       if (!task) return;

//       if (e.target.classList.contains("delete")) {
//         task.remove();
//         return;
//       }
//       if (e.target.matches("input[type = 'checkbox'")) {
//         task.classList.toggle("completed", e.target.checked);
//       }
//       // if(e.)
//       // console.log(e.target.closest(".task"));
//     });
//   });
// };

// const check = day.querySelector(".check");
//     const cross = day.querySelector(".cross");

//     if (check) {
//       check.addEventListener("click", () => {
//         if (input.value.trim()) {
//           addTask(day, input.value.trim());
//         }
//         closeAddMode(day);
//       });
//     }

//     if (cross) {
//       cross.addEventListener("click", () => {
//         closeAddMode(day);
//       });
//     }
// input.addEventListener("keydown", (e) => {
//       if (e.key === "Enter" && input.value.trim() !== "") {
//         addTask(day, input.value.trim());
//         closeAddMode(day);
//       }
//     });

//     input.addEventListener("keydown", (e) => {
//       if (e.key === "Escape") {
//         closeAddMode(day);
//       }
//     });

//  li.innerHTML = `<div class="check-n-task">
//                     <input type="checkbox" />
//                   <span class="task-text">
//                     ${text}
//                   </span>
//                   </div>
//                    <i class="ri-delete-bin-5-fill delete"></i>
//                   `;

//     taskList.appendChild(li);

//     input.value = "";
