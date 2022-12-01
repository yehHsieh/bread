$(function() {
  console.log('Hello Bootstrap5');
  
  // register
const navTab = document.querySelector(".nav-tabs");
const registerTab = document.querySelector(".registerTab");
const loginTab = document.querySelector(".loginTab");

navTab.addEventListener("click", e =>{
    e.preventDefault();
    let changeTab = e.target.getAttribute("class");
    console.log(changeTab)
    if(changeTab != "nav-link active register text-center" && changeTab != "nav-link active loginBtn text-center"){
      return
    }else if(changeTab == "nav-link active register text-center"){
      registerTab.classList.add("d-block");
      registerTab.classList.remove("d-none");
      loginTab.classList.remove("d-block");
      loginTab.classList.add("d-none");
    }else if(changeTab == "nav-link active loginBtn text-center"){
      loginTab.classList.remove("d-none");
      loginTab.classList.add("d-block");
      registerTab.classList.remove("d-block");
      registerTab.classList.add("d-none");
    }
})
});

// swiper
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 12,
  loop: true,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// 日曆
const elem = document.querySelector('input[name="inputDate"]');
const datepicker = new Datepicker(elem, {
  // ...options
  language: 'zh-TW',
  buttonClass: 'btn',
}); 

