// MENU -------------------------

const menuOpenBtn = document.querySelector(".menu-button");
const menuCloseBtn = document.querySelector(".menu-close-btn");
const menuElement = document.querySelector(".menu");
const menuCover = document.querySelector(".outer-menu-window");

// Event listeners
menuOpenBtn.addEventListener("click", openMenu);
menuCloseBtn.addEventListener("click", closeMenu);
menuCover.addEventListener("click", function closingMenu() {
  menuCover.style.visibility = "hidden";
  menuElement.classList.remove("menu-show");
  menuElement.classList.add("menu-hidden");
});

// Menu functions
// OPEN MENU
function openMenu() {
  menuElement.classList.remove("menu-hidden");
  menuElement.classList.add("menu-show");
  menuCover.style.visibility = "visible";
}

// CLOSE MENU
function closeMenu() {
  menuElement.classList.remove("menu-show");
  menuElement.classList.add("menu-hidden");
  menuCover.style.visibility = "hidden";
}
