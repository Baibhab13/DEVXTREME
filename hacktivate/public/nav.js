let navList = document.querySelector(".list");
let navIcon = document.querySelector('.navIcon');

navIcon.addEventListener('click', () => {
    navList.classList.toggle("closeNav");
    navIcon.classList.toggle('fa-bars');
    navIcon.classList.toggle('fa-xmark')
})