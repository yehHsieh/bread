// const e = require("express");

$(function () {
  console.log('Hello Bootstrap5');
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

// 讀取會員資料
const memberCenter = document.querySelector("#memberCenter");
const loginNav = document.querySelector("#loginNav");
const cartNav = document.querySelector("#cartNav");

memberCenter.addEventListener("click", e => {
  e.preventDefault();
  getUserIndexData();
})

loginNav.addEventListener("click", e => {
  e.preventDefault();
  getLoginData();
})

cartNav.addEventListener("click", e => {
  e.preventDefault();
  getCartData();
})

function getUserIndexData() {
  let token = localStorage.getItem("token");
  let id = localStorage.getItem("id");
  axios.get(`http://localhost:3000/600/users/${id}`, {
    headers: {
      "authorization": `Bearer ${token}`
    }
  })
    .then(function (response) {
      window.location.href = "./member.html"
      console.log(response.data)
    })
    .catch(function (error) {
      Swal.fire("請先登入會員")
      .then(function(){
        window.location.href = "./register.html"
      })
      console.log(error.response)
      return
    })
}

function getLoginData() {
  let token = localStorage.getItem("token");
  let id = localStorage.getItem("id");
  axios.get(`http://localhost:3000/600/users/${id}`, {
    headers: {
      "authorization": `Bearer ${token}`
    }
  })
    .then(function (response) {
      Swal.fire("已登入會員")
      .then(function(){
        window.location.href = "#";
      })
    })
    .catch(function (error) {
      window.location.href = "./register.html"
      console.log(error.response)
    })
}

function getCartData() {
  let token = localStorage.getItem("token");
  let id = localStorage.getItem("id");
  axios.get(`http://localhost:3000/600/users/${id}`, {
    headers: {
      "authorization": `Bearer ${token}`
    }
  })
    .then(function (response) {
      window.location.href = "./cart.html"
    })
    .catch(function (error) {
      Swal.fire("購物車是空的")
      .then(function(){
        window.location.href = "#";
      })
      console.log(error.response)
      return
    })
}