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
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
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
        .then(function () {
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
        .then(function () {
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
        .then(function () {
          window.location.href = "#";
        })
      console.log(error.response)
      return
    })
}


// GSAP 基本宣告
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// gsap的timeline方法會返回一個timeline物件
// const timeline = gsap.timeline();





// pin
const srollTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".section3",
    markers: false,
    start: 'top 45%', // 決定動畫開始點的位置
    end: 'top 8%', // 決定動畫結束點的位置
    scrub: true,
  },
});

srollTL.to(".gate-left-1", { yPercent: "-100" });
srollTL.to(".gate-right-1", { yPercent: "100" }, "<");
srollTL.to(".gate-left-2", { yPercent: "-100" });
srollTL.to(".gate-right-2", { yPercent: "100" }, "<");


//dot gsap
// 方塊漸明範例
// gsap.fromTo('.dot1', {autoAlpha: 0.3}, {autoAlpha: 1, duration: 2, repeat: -1})

const srollTL2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".dot1",
    markers: false,
    start: 'top 70%', // 決定動畫開始點的位置
    end: 'top 0', // 決定動畫結束點的位置
    scrub: true,
  },
});

srollTL2.to(".dot", { x: "50", repeat:-1,});
srollTL2.to(".dot", { x: "-50", repeat:-1,});
srollTL2.to(".dot", { y: "100",});
srollTL2.to(".dot", { x: "50",});
srollTL2.to(".dot", { x: "-50",});
srollTL2.to(".dot", { y: "100", });
srollTL2.to(".dot", { x: "50",});
srollTL2.to(".dot", { x: "-50",});
srollTL2.to(".dot", { y: "100",});





// pin
const srollTL3 = gsap.timeline({
  scrollTrigger: {
    
    markers: true,
    start: 'top top', // 決定動畫開始點的位置
    end: 'top 8%', // 決定動畫結束點的位置
    scrub: true,
  },
});

srollTL.to(".gate-left-1", { yPercent: "-100" });
srollTL.to(".gate-right-1", { yPercent: "100" }, "<");
srollTL.to(".gate-left-2", { yPercent: "-100" });
srollTL.to(".gate-right-2", { yPercent: "100" }, "<");


