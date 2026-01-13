export const todo = () => {
  let activeAddDay = null;

  const addButtons = document.querySelectorAll(".add-task-btn");

  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      //   console.log(btn);
      //   console.log(day);
      const day = btn.closest(".todo-day");

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
    const input = day.querySelector("input");

    btn.classList.add("hidden");
    inputBox.classList.remove("hidden");
    input.focus();

    input.onkeydown = (e) => {
      if (e.key === "Enter" && input.value.trim() !== "") {
        addTask(day, input.value.trim());
        closeAddMode(day);
      }
    };
  }

  function closeAddMode(day) {
    const btn = day.querySelector(".add-task-btn");
    const inputBox = day.querySelector(".add-task-input");
    const input = day.querySelector("input");

    btn.classList.remove("hidden");
    inputBox.classList.add("hidden");
    input.value = "";

    activeAddDay = null;
  }
};
