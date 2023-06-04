const hamburger = document.getElementsByClassName("hamburger");
const menuItems = document.getElementById("menu-items");

hamburger[0].addEventListener("click", (event) => {
	menuItems.classList.toggle("active");
});
