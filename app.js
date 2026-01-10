const contentSection = document.querySelector(".content");
const bannerSection = document.querySelector(".banner");
const contentItem = document.querySelectorAll(".content-item");
const fullPages = document.querySelectorAll(".full-page");
const sidebarItems = document.querySelectorAll(".sidebar-item");
const backBtn = document.querySelectorAll(".back-btn");

// console.log(contentSection,bannerSection,contentItem,fullPages,sidebarItems,backBtn)

function showView(target) {
    
}



















contentItem.forEach((item) => {
  item.addEventListener("click", () => {
    const target = item.dataset.target;
    // console.log(target)

    contentSection.style.display = "none";
    bannerSection.style.display = "none";
    // console.log(contentSection)

    fullPages.forEach((page) => {
      page.style.display = page.dataset.page === target ? "block" : "none";
    });
    
});
});

backBtn.forEach((btn) => {
  btn.addEventListener("click", (el) => {
    contentSection.style.display = "grid";
    bannerSection.style.display = "flex";
  });
});