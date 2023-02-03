const ul = document.querySelector("#navbar-ul");
const btn = document.querySelector("#hamburger-btn");

btn.addEventListener("click", () => {
    const classNamesArray = Array.from(ul.classList);
    
   if (classNamesArray.includes('hidden')) {
    ul.classList.remove('hidden');
    ul.classList.remove('sm:hidden');
   } else {
    ul.classList.add('hidden');
    ul.classList.add('sm:hidden');
   }
});