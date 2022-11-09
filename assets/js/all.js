"use strict";

$(function () {
  console.log('Hello Bootstrap5');
}); // swiper

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 12,
  loop: true,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  }
}); // 日曆

var elem = document.querySelector('input[name="inputDate"]');
var datepicker = new Datepicker(elem, {
  // ...options
  language: 'zh-TW',
  buttonClass: 'btn'
});
//# sourceMappingURL=all.js.map
