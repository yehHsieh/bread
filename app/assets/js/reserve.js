// 初始渲染
function init() {
    getProductList()
}
init();

// 獲得購物車資料
let cartData = [];
function getCartsData() {
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("id");
    axios.get(`http://localhost:3000/600/carts?_expand=product&userId=${userId}`, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
        .then(function (response) {
            cartData = response.data;
        }).catch(function (error) {
            console.log(error.response)
        })
}


const productPage = document.querySelector("#productPage");
// reserve
const breadArea = document.querySelector(".breadArea");
let productData = [];
function getProductList() {
    axios.get(`http://localhost:3000/products`)
        .then(function (response) {
            productData = response.data;
            render();
        })
}

function combineStr(item) {
    return `<li class="col-12 col-md-6 col-lg-4 mb-4">
  <div class="card border-0">
      <a style="cursor: pointer;" class="overflow-hidden"><img data-picture="${item.id}" src="${item.imgur}" class="card-img-top img-hover" alt="bread1"></a>
      <div class="card-body bg-secondary">
      
      <h3 class="card-title fs-4 mt-3">${item.breadName}</h3>
      <p class="fs-5">NT ${item.price}</p>
     
      <div class="d-flex justify-content-between" style="height: 35px;">
              
              <button class="p-1 border-0 rounded-1"><i class="fa fa-minus" aria-hidden="true" data-class ="${item.id}"></i></button>
              <p class="w-50 text-center">${item.num}</p> 
              <button class="p-1 border-0 rounded-1"><i class="fa fa-plus" aria-hidden="true" data-id ="${item.id}"></i></button>
              <button class="addCartBtn px-3 border-0 rounded-pill"><i class="fa fa-cart-plus text-primary" aria-hidden="true" data-cart=${item.id}></i></button>
          </div>
      </div>
  </div>
</li>`

}



function render() {
    let str = "";
    productData.forEach(item => {
        str += combineStr(item)
    });
    breadArea.innerHTML = str;
}

// 搜尋
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".searchBtn");
searchBtn.addEventListener("click", e => {
    const breadName = search.value;
    let str = "";
    let isStill = false;
    productData.forEach(item => {
        if (item.breadName.includes(breadName)) {
            isStill = true;
            str += combineStr(item);
        } else {
            return
        }
    })
    if (isStill == false) {
        str = `<p style="height: 100vh;">無此商品</p>`;
    }
    breadArea.innerHTML = str;
})


productPage.addEventListener("click", e => {
    let plus = e.target.getAttribute("data-id");
    let minus = e.target.getAttribute("data-class");
    let cart = e.target.getAttribute("data-cart");
    if (plus != null || minus != null || cart != null) {

        // 商品數量選擇
        let num = 0;
        productData.forEach(item => {
            if (plus == item.id) {
                item.num += 1;
            } else if (minus == item.id) {
                item.num -= 1;
                if (item.num < 0) {
                    item.num = 0
                }
            }
            num = item.num;
            render();

            // 加入購物車
            let cart = e.target.getAttribute("data-cart")
            let token = localStorage.getItem("token");
            let userId = localStorage.getItem("id");
            if (cart == item.id) {
                if (num == 0) {
                    Swal.fire("還沒選數量喔", "", "warning")
                    return
                } else {
                    axios.post(`http://localhost:3000/600/carts?userId=${userId}&_expand=user`, {
                        // API格式
                        "userId": userId,
                        "productId": item.id,
                        "num": num
                    }, {
                        headers: {
                            "authorization": `Bearer ${token}`
                        }
                    })
                        .then(function (response) {
                            num = item.num = 0;
                            Swal.fire("加入購物車", "", "success")
                            render();
                        })
                        .catch(function (error) {
                            Swal.fire("請先登入會員", "", "warning")
                            console.log(error.response)
                        })
                }
            }
        })
    }

})

// 商品資訊

productPage.addEventListener("click", e => {
    let productDetail = e.target.getAttribute("data-picture");

    e.preventDefault();
    productData.forEach(item => {
        if (productDetail == item.id) {
            console.log(productDetail)
            getProductDetailRender(item);
        }
    })


    // 點擊麵包屑返回
    const backReserve = document.querySelector("#backReserve")
    productPage.addEventListener("click", e => {
        if (e.target.id == "backReserve") {
            let str = "";
            let strProduct = "";
            productData.forEach(item => {
                strProduct += `${combineStr(item)}`
            });

            str = `
        <!-- Bread Area -->
        <ul class="row m-0 breadArea">
        ${strProduct}
        </ul>`;
            breadArea.innerHTML = str;
        }
    })
})


function getProductDetailRender(item) {
    let str = "";
    str = `<nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
  <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="reserve.html" id="backReserve">麵包預訂</a></li>
      <li class="breadcrumb-item active" aria-current="page">詳細資訊</li>
  </ol>
</nav>
<div class="row">
  <div class="col-lg-4">
      <img src="${item.imgur}" alt="bread1">
  </div>
  <div class="col-lg-4">
      <h3>${item.breadName}</h3>
      <h4 class="mb-3">NT ${item.price}</h4>
      <p>${item.content}</p>
      <p>原料: ${item.source}</p>
      <div class="d-flex mb-3">
          <button class="p-1 border-0 rounded-1"><i class="fa fa-minus" aria-hidden="true" data-classDetail="${item.id}"></i></button>
          <div id="cartNum" class="w-50 text-center"><span>${item.num}</span></div>
          <button class="p-1 border-0 rounded-1"><i class="fa fa-plus" aria-hidden="true" data-idDetail="${item.id}"></i></button>
      </div>
      <button data-cartDetail=${item.id} class="py-2 px-3 border-0 rounded-pill shine"><i class="fa fa-cart-plus me-1 text-primary" aria-hidden="true"></i>加入購物車</button>
  </div>
</div>`

    breadArea.innerHTML = str;
}



productPage.addEventListener("click", e => {
    let plus = e.target.getAttribute("data-idDetail");
    let minus = e.target.getAttribute("data-classDetail");
    let cartNum = document.querySelector("#cartNum");

    // 商品數量選擇

    productData.forEach(item => {
        if (plus == item.id) {
            item.num += 1;
            getProductDetailRender(item)
        } else if (minus == item.id) {
            item.num -= 1;
            getProductDetailRender(item)
            if (item.num < 0) {
                item.num = 0
                getProductDetailRender(item)
            }
        }





        // 加入購物車
        let cart = e.target.getAttribute("data-cartDetail");
        let token = localStorage.getItem("token");
        let userId = localStorage.getItem("id");

        if (cart == item.id) {
            if (item.num == 0) {
                Swal.fire("還沒選數量喔", "", "warning")
                return
            } else {
                axios.post(`http://localhost:3000/600/carts?userId=${userId}&_expand=user`, {
                    // API格式
                    "userId": userId,
                    "productId": item.id,
                    "num": item.num
                }, {
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                })
                    .then(function (response) {
                        Swal.fire("加入購物車", "", "success")
                        num = item.num = 0;
                        getProductDetailRender(item)

                    })
                    .catch(function (error) {
                        Swal.fire("請先登入會員", "", "warning")
                        console.log(error.response)
                    })
            }
        }
    })
})



function cartNumRender(item) {
    let cartNum = document.querySelector("#cartNum");
    let str = "";
    str += `<span>${item.num}</span>`
    cartNum.innerHTML = str;
}


// 倒數

function handleTickInit(tick) {
    // get timer offset (if not found, set to today)
    var offset = new Date(localStorage.getItem('countdown-offset') || new Date());

    // store the offset (not really necessary but saves some if statements)
    localStorage.setItem('countdown-offset', offset);

    // time in hours the timer will run down
    let closeTime = localStorage.getItem("timeValue");
    var timeDuration = Tick.helper.duration(1, 'day');
    console.log(closeTime)
    console.log(timeDuration)

    // add 24 hours to get final deadline
    var deadline = new Date(offset.setMilliseconds(offset.getMilliseconds() + timeDuration));
    
console.log(deadline)
    // create counter
    var counter = Tick.count.down(deadline, { format: ['h', 'm', 's'] });

    // update tick with the counter value
    counter.onupdate = function (value) {
        tick.value = value;

        // 限時關閉購物車功能
        if (tick.value[0] == 0 && tick.value[1] == 0 && tick.value[2] == 0) {
            const addCartBtns = document.querySelectorAll(".addCartBtn");
            for (const addCartBtn of addCartBtns) {
                addCartBtn.classList.add("d-none")
            }
            console.log(addCartBtn)
            console.log(tick.value)
        }
    };

    counter.onended = function () {
        // redirect, uncomment the next line
        // window.location = 'my-location.html'

        // hide counter, uncomment the next line
        // tick.root.style.display = 'none';

        // show message, uncomment the next line
        // document.querySelector('.tick-onended-message').style.display = '';
    };
}

const tickFlipSpacer = document.querySelector(".tick-flip-spacer");
