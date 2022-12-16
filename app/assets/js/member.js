// const { get } = require("browser-sync");

// 初始
function init() {
    getUserData();
}

init();

// 讀取會員資料
let memberData = [];

function getUserData() {
    let token = localStorage.getItem("token");
    let id = localStorage.getItem("id");
    axios.get(`http://localhost:3000/600/users/${id}`, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
        .then(function (response) {
            memberData = response.data;
            renderInf();
            console.log(response.data)
            console.log(memberData.isAdmin)
            let backManage = document.querySelector("#backManage");
            
            if (memberData.isAdmin == true) {
                backManage.classList.remove("d-none");
                console.log("12333")
            } else { console.log("555") }
        })
        .catch(function (error) {
            console.log(error.response)
        })
}

//訂單資料
let orderData = [];

function getOrderData() {
    let token = localStorage.getItem("token");
    let id = localStorage.getItem("id");
    axios.get(`http://localhost:3000/600/orders?userId=${id}`, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
        .then(function (response) {
            orderData = response.data;
            renderOrder();
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error.response)
            Swal.fire("無訂單紀錄", "", "warning")
        })
}



// 頁面切換
const memberPage = document.querySelector(".memberPage");

//會員資料
function renderInf() {
    let str = "";

    str += `<h2>會員中心</h2>
        <div class="col-3">
            <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action active" aria-current="true" id="baseData">
                    基本資料
                </a>
                <a href="#" class="list-group-item list-group-item-action" id="memberOrder">已完成訂單</a>
                <a href="#" class="list-group-item list-group-item-action" id="changeMember">會員資料修改</a>
                <a href="table.html" class="list-group-item list-group-item-action d-none" id="backManage">後臺管理</a>
                <a href="#" class="list-group-item list-group-item-action" id="logout">登出</a>
              </div>
        </div>
        <div class="col-9" style="height: 100vh;">
        <div class="bg-white p-4 rounded-3">
        <ul class="text-secondary">
                            <h3>會員基本資料</h3>
                            <li>姓名 : ${memberData.name}</li>
                            <li>電話 : ${memberData.tel}</li>
                            <li>信箱 : ${memberData.email}</li>
                        </ul>
        </div>
        </div>`

    memberPage.innerHTML = str;
}


//訂購清單
function renderOrder() {

    let idStr = "";
    let priceStr = "";
    let productStr = "";
    let totalStr = "";
    orderData.forEach(item => {
        idStr = `<div class="row text-secondary py-4 bg-light mb-3">
                                    
                                            <div class="col-lg-3">
                                                <p>#${item.id}</p>
                                            </div>
                                            <div class="col-lg-6">
                                    <ul>`;

        // 訂購組商品字串
        item.products.forEach(productItem => {
            productStr += `     
                                <li>品名:${productItem.name}</li>
                                <li class="mb-3">數量 : ${productItem.quantity}</li>`
        })

        priceStr =
            `<li>取貨日期 : ${item.pickDate}</li>
            </ul>
                        </div>
                        <div class="col-lg-2 align-self-center">
                            <p>總金額: $${item.totalPrice}</p>
                        </div>
                    </div>`

        totalStr += idStr + productStr + priceStr
    })





    let str = "";

    str += `<h2>會員中心</h2>
                        <div class="col-3">
                            <div class="list-group">
                                <a href="#" class="list-group-item list-group-item-action" aria-current="true" id="baseData">
                                    基本資料
                                </a>
                                <a href="#" class="list-group-item list-group-item-action active" id="memberOrder">已完成訂單</a>
                                <a href="#" class="list-group-item list-group-item-action" id="changeMember">會員資料修改</a>
                                <a href="#" class="list-group-item list-group-item-action" id="logout">登出</a>
                            </div>
                        </div>
                        <div class="col-9">
                            <div class="bg-white p-4 rounded-3">
                            <h3 class="text-dark">已完成訂單</h3>
        ${totalStr}
                        </div>`

    memberPage.innerHTML = str;
}




//修改會員render
function changeRender() {
    let str = "";
    str = `<h2>會員中心</h2>
    <div class="col-3">
        <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action" aria-current="true" id="baseData">
                基本資料
            </a>
            <a href="#" class="list-group-item list-group-item-action" id="memberOrder">已完成訂單</a>
            <a href="#" class="list-group-item list-group-item-action active" id="changeMember">會員資料修改</a>
            <a href="#" class="list-group-item list-group-item-action" id="logout">登出</a>
          </div>
    </div>
    <div class="col-9" style="height: 100vh;">
    <div class="bg-white p-4 rounded-3">
    <form action="#" class="text-secondary">
    <div class="d-flex justify-content-between mb-4">
    <div>
                        <label for="name" class="me-6">姓名:</label>
                        <input type="text" name="name" id="nameChange" placeholder="name" class="mb-2" value="${memberData.name}">
                        <br>
                        <label class="me-6" for="tel">電話:</label>
                        <input class="mb-2" type="tel" name="tel" id="telChange" placeholder="tel" value="${memberData.tel}">
                        <br>
                        <label class="me-6" for="email">信箱:</label>
                        <input class="mb-2" type="email" name="email" id="emailChange" placeholder="email" value="${memberData.email}">
                        <br>
                        </div>
                        <div>
                        <label class="me-6" for="password">密碼:</label>
                        <input class="mb-2" type="password" name="password" id="passwordChange" placeholder="密碼" required="">
                        <br>
                        <label for="passwordCheck">密碼確認:</label>
                        <input class="mb-4" type="password" name="passwordCheck" id="passwordCheckChange" placeholder="再輸入一次密碼" required="">
                        </div>
                        </div>
                        <!-- Button trigger modal -->
                        <div class="d-flex justify-content-center" >
                        <a class="btn btn-primary" style="width: 25%;" id="changeBtn">確認
                        </a>
                        </div>
</form>
    </div>
    </div>`

    memberPage.innerHTML = str;
}

//更改會員資料


// changeBtn.addEventListener("click", e => {
//     if(passwordChange === passwordCheckChange){
//         let token = localStorage.getItem("token");
//         let id = localStorage.getItem("id");
//         axios.patch(`http://localhost:3000/600/users/{id}`, {
//             "email": emailChange.value,
//             "password": passwordChange.value,
//             "name": nameChange.value,
//             "tel": telChange.value,
//         }, {
//             headers: {
//                 "authorization": `Bearer ${token}`
//             }
//         })
//             .then(function (response) {
//                 orderData = response.data;
//                 renderChange();
//                 console.log(response.data)
//             })
//             .catch(function (error) {
//                 console.log(error.response)
//             })
//     }else{
//         alert("密碼請確認")
//     }
// })


//側欄tab
memberPage.addEventListener("click", e => {
    let getId = e.target.getAttribute("id");
    console.log(getId)
    if (getId == "baseData") {
        getUserData();
    } else if (getId == "memberOrder") {
        getOrderData()
    } else if (getId == "changeMember") {
        changeRender()
        const nameChange = document.querySelector("#nameChange");
        const telChange = document.querySelector("#telChange");
        const emailChange = document.querySelector("#emailChange");
        const passwordChange = document.querySelector("#passwordChange");
        const passwordCheckChange = document.querySelector("#passwordCheckChange");
        const changeBtn = document.querySelector(".changeBtn");
    }

    else if (getId == "logout") {
        localStorage.clear()
        window.location.href = "./index.html"
    }


    if (getId == "changeBtn") {
        if (passwordChange.value === passwordCheckChange.value) {
            e.preventDefault();
            let token = localStorage.getItem("token");
            let id = localStorage.getItem("id");
            axios.patch(`http://localhost:3000/600/users/${id}`, {
                "email": emailChange.value,
                "password": passwordChange.value,
                "name": nameChange.value,
                "tel": telChange.value,
            }, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
                .then(function (response) {
                    Swal.fire("修改資料成功", "", "success")
                        .then(function () {
                            window.location.href = "./member.html"
                        })
                })
                .catch(function (error) {
                    console.log(error.response)
                })
        } else {
            Swal.fire("密碼不一致", "", "warning")
        }
    }

})
