function init() {
    getCartList();
}
init();
//購物車頁面Step1
const cartArea = document.querySelector("#cartArea");

// 刪除單項
cartArea.addEventListener("click", e => {
    const deleteId = e.target.getAttribute("data-delete");
    axios.delete(`http://localhost:3000/carts/${deleteId}`).then(function (response) {
        Swal.fire("刪除成功!","", "success");
        getCartList();
    })
})


// 商品數量改變
cartArea.addEventListener("click", e => {
    let plus = e.target.getAttribute("data-plus");
    let minus = e.target.getAttribute("data-minus");
    // 商品數量選擇
    let num = 0;
    cartData.forEach(item => {
        if (plus == item.id) {
            item.num += 1;
            axios.patch(`http://localhost:3000/carts/${plus}`, {
                "num": item.num
            })
        } else if (minus == item.id) {
            item.num -= 1;
            if (item.num < 1) {
                console.log(item.num)
                item.num = 1;
                return
            } else {
                axios.patch(`http://localhost:3000/carts/${minus}`, {
                    "num": item.num
                })
            }
        }
        num = item.num;
        console.log(num)
        console.log(plus)
        console.log(minus)

        getCartList();
    })
})


function stepHeadRender() {
    return `<h2 class="m-0">購物車</h2>
    <ul class="progresses m-0 d-flex pb-120p">
    <li class="active">step1</li>
    <li>step2</li>
    <li>step3</li>
   </ul>`
}



function stepFootRender() {
    // 購物車總金額
    let totalPrice = 0;
    cartData.forEach(item => {
        totalPrice += item.product.price * item.num;
    })

    //設定總金額localStorage
    localStorage.setItem("shouldPay", totalPrice)

    return `<div class="bg-secondary p-4">
            <div class="d-flex justify-content-between">
                <p class="m-0">總金額 : $${totalPrice}</p>
                <a class="btn btn-light shine border-0" href="./cart2.html">下一步</a>
            </div>
            </div>`

}



// 空車render
function empty() {
    let str = "";
    str += `<h3 style="height: 100vh;">購物車是空的</h3>`
    cartArea.innerHTML = str;
}

function combineCartStrStep1(item) {
    return `
<ul>
           <li class="row border-top pt-3">
               <div class="col-lg-3">
                   <img src="${item.product.imgur}" alt="bread7" style="height: 150px;">
               </div>
               <div class="col-lg-3">
                   <h3>${item.product.breadName}</h3>
               </div>
               <div class="col-lg-3">
                   <h4 class="mb-4">價錢:$${item.product.price * item.num}</h4>
                   <h5 class="d-inline">數量:</h5>
                   <button class="p-1 border-0 rounded-1" data-minus="${item.id}"><i class="fa fa-minus" aria-hidden="true" data-minus="${item.id}"></i></button>
                   <p class="w-50 text-center d-inline">${item.num}</p>
                   <button class="p-1 border-0 rounded-1" data-plus="${item.id}"><i class="fa fa-plus" aria-hidden="true" data-plus="${item.id}"></i></button>
               </div>
               <div class="col-lg-2 offset-1">
                   <input type="button" value="刪除" data-delete="${item.id}">
               </div>
           </li>
       </ul>
       `
}

let cartData = [];

function getCartList() {
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("id");
    axios.get(`http://localhost:3000/600/carts?_expand=product&userId=${userId}`, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
        .then(function (response) {
            cartData = response.data;
            renderStep1()
        }).catch(function (error) {
            Swal.fire("購物車空的!","", "success")
            .then(function(){
                empty();
            })
            console.log(error.response)
           
        })
}



function renderStep1() {
    let str = "";
    str = stepHeadRender();
    cartData.forEach(item => {
        str += combineCartStrStep1(item)
    });
    str += stepFootRender();
    cartArea.innerHTML = str;
}

