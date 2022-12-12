const cartArea2 = document.querySelector("#cartArea2");
const dateShow = document.querySelector(".dateShow")

date()
function combineHeadStr() {
    return `<h2 class="m-0">購物車</h2>
    <ul class="progresses m-0 d-flex">
            <li>step1</li>
            <li>step2</li>
            <li class="active">step3</li>
        </ul>`
}

function combineStr() {
    let showPickTime = localStorage.getItem("pickTime")
    let pay = localStorage.getItem("shouldPay")
    let userName = localStorage.getItem("userName");
    return `<div>
    <div class="text-center py-120p">
        <i class="fa fa-check-circle text-primary" aria-hidden="true"></i>
        <p>訂購成功
        <br>感謝您的支持</p>
    </div>
    <p>取貨人 : ${userName}</p>
    <p>總金額 : $${pay}</p>
    <div class="d-flex justify-content-between">
        <p>領取日期 : ${showPickTime}</p>
        <input type="button" value="完成" class="finishBtn">
    </div>
</div>`
}


// 取訂單資訊
let orderData = [];
let token = localStorage.getItem("token");
let userId = localStorage.getItem("id");
axios.get(`http://localhost:3000/600/orders?userId=${userId}&_expand=user`, {
    headers: {
        "authorization": `Bearer ${token}`
    }
})
    .then(function (response) {
        orderData = response.data
    }).catch(function (error) {
        console.log(error.response)
    })

function render() {
    let str = "";
    str = combineHeadStr();

    str += combineStr();

    cartArea2.innerHTML = str;

}

// 刪除購物車內容
cartArea2.addEventListener("click", e =>{
    let finishBtn = e.target.getAttribute("class");
    if(finishBtn == "finishBtn"){
        let token = localStorage.getItem("token");
        for(let i=1; i < cartData.length+1; i++){
            axios.delete(`http://localhost:3000/600/carts/${i}`, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            }).then(function (response) {
                // window.location.href="./index.html"
            }).catch(function (error) {
                console.log(error.response)
            })
        }
        window.location.href="./index.html"
    }
})

const datepickerPicker = document.querySelector(".datepicker-picker");



function saveTime() {
    let getDate = document.querySelector(".datePick").value;
    console.log(getDate)
    localStorage.setItem("pickTime", getDate);
    let showPickTime = localStorage.getItem("pickTime")
    dateShow.textContent = `領取日期 : ${showPickTime}`
}

datepickerPicker.addEventListener("click", e => {
    saveTime();
})


// 取購物車資料
let cartData = [];

axios.get(`http://localhost:3000/carts?_expand=product&_expand=user&userId=${userId}`, {
    headers: {
        "authorization": `Bearer ${token}`
    }
})
    .then(function (response) {
        cartData = response.data;
        makeOrder();
    })






let orderProduct = [];
let orderProductItem = {};
function makeOrder() {
    cartData.forEach(item => {
        orderProductItem["name"] = item.product.breadName;
        orderProductItem["quantity"] = item.num;
        deepObj = JSON.parse(JSON.stringify(orderProductItem))
        orderProduct.push(deepObj);
    });
}
console.log(orderProductItem)
console.log(orderProduct)


//當下時間
let time = new Date();
let orderDataTime = time.toLocaleDateString();


const sendOrder = document.querySelector(".sendOrder");
sendOrder.addEventListener("click", e => {
    localStorage.setItem("userName", cartData[0].user.name)
let userName = localStorage.getItem("userName");

    let showPickTime = localStorage.getItem("pickTime");
    let pay = localStorage.getItem("shouldPay");
    axios.post(`http://localhost:3000/600/orders?userId=${userId}&_expand=user`, {
        // API格式
        "userId": userId,
        "pickDate": showPickTime,
        "orderDate": orderDataTime,
        "totalPrice": pay,
        "products": orderProduct,
        "status": false
    }, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
        .then(function (response) {
            Swal.fire("成功送出訂單","", "success")
            .then(function(){
                render();
            })
        })
        .catch(function (error) {
            Swal.fire("購物車空的","", "success")
            console.log(error.response)
        })
})


// 日曆
function date() {
    const elem = document.querySelector('input[name="inputDate"]');
    const datepicker = new Datepicker(elem, {
        // ...options
        language: 'zh-TW',
        buttonClass: 'btn',
    });
}
