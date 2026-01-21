import { todo } from "./todo.js";
const contentSection = document.querySelector(".content");
const bannerSection = document.querySelector(".banner");
const contentItem = document.querySelectorAll(".content-item");
const fullPages = document.querySelectorAll(".full-page");
const sidebarItems = document.querySelectorAll(".sidebar-item");
const backBtn = document.querySelectorAll(".back-btn");
const sidebarHeading = document.querySelector(".sidebar-heading");

// console.log(contentSection,bannerSection,contentItem,fullPages,sidebarItems,backBtn)

function showView(target) {
  console.log(target);
  //sidebar state
  sidebarItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.target === target);
  });

  if (target === "dashboard") {
    contentSection.style.display = "grid";
    bannerSection.style.display = "block";
    fullPages.forEach((page) => (page.style.display = "none"));
    return;
  }

  //dashboard hide
  contentSection.style.display = "none";
  bannerSection.style.display = "none";

  fullPages.forEach((page) => {
    page.style.display = page.dataset.page === target ? "block" : "none";
  });
}

//card opens app
contentItem.forEach((item) => {
  item.addEventListener("click", () => {
    const target = item.dataset.target;
    showView(target);
    // console.log(target)
    // console.log(contentSection)
  });
});

//sidebar opens app
sidebarItems.forEach((item) => {
  item.addEventListener("click", () => {
    // console.log(item.dataset.target);
    const target = item.dataset.target;
    showView(target);
  });
});

backBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    showView("dashboard");
  });
});

sidebarHeading.addEventListener("click", () => {
  showView("dashboard");
});

todo();
