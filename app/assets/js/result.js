const tableBodyResult = document.querySelector(".tableBodyResult");

// 初始化
init();

function init() {
    getOrderData();
}

let orderData = [];
function getOrderData() {
    axios.get(`http://localhost:3000/orders?_expand=user`)
        .then(function (response) {
            orderData = response.data;
            render();
            renderC3();
        })
}

function render() {
    let str = "";
    orderData.forEach(item => {
        // 訂購組商品字串
        let productStr = "";
        item.products.forEach(productItem => {
            productStr += `<li class="mb-1">${productItem.name} * ${productItem.quantity}</li>`
        })

        // 判斷訂單處理狀態
        let orderStatus = "";
        if (item.status == true) {
            orderStatus = "已領取";
        } else {
            orderStatus = "未領取";
        }

        str += `<tr>
        <th scope="row">${item.id}</th>
        <td>${item.orderDate}</td>
        <td>${item.user.name}</td>
        <td>${item.user.tel}</td>
        <td><ul>
          ${productStr}
        </ul></td>
        <td>${item.pickDate}</td>
        <td>$${item.totalPrice}</td>
        <td><a href="#" data-id="${item.id}" data-status=${item.status} class="orderStatus">${orderStatus}</a></td>
      </tr>`
    });
    tableBodyResult.innerHTML = str;
}

//更新領取狀態
function change(status, id) {
    let newStatus;
    if (status == "true") {
        newStatus = false;
    } else {
        newStatus = true;
    }

    axios.patch(`http://localhost:3000/orders/${id}`,
        {
            "status": newStatus
        })
        .then(function (response) {
            Swal.fire({
                title: "訂單狀態確定修改嗎?",
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: "#F4A913",
                confirmButtonText: '確定'
              }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire("訂單狀態更改成功", "", "success")
                    .then(e => {
                        getOrderData();
                    })
                }
              })
        })
}

tableBodyResult.addEventListener("click", e => {
    e.preventDefault();
    const targetClass = e.target.getAttribute("class");

    let id = e.target.getAttribute("data-id");
    if (targetClass == "orderStatus") {
        let status = e.target.getAttribute("data-status");
        change(status, id);
        return
    }
})

//C3
function renderC3() {
    // 資料蒐整
    let total = {};
    orderData.forEach(function (item) {
        item.products.forEach(function (productItem) {
            if (total[productItem.name] == undefined) {
                total[productItem.name] = productItem.quantity;
            } else {
                total[productItem.name] += productItem.quantity;
            }
        })
    })

    // 整理符合C3格式
    let totalAry = Object.keys(total);
    let C3Data = [];
    totalAry.forEach(item => {
        let ary = [];
        ary.push(item);
        ary.push(total[item]);
        C3Data.push(ary);
    })


    // C3.js
    let chart = c3.generate({
        bindto: '#chart', // HTML 元素綁定

        data: {
            type: "pie",
            columns: C3Data,
        },
        axis: {
            x: {
                type: 'category',
                categories: ['麵包']
            },
            y: {
                max: 8,
                min: 0,
                // Range includes padding, set 0 if no padding needed
                padding: { top: 10, bottom: 0 },
                label: { // ADD
                    text: '銷售量',
                    position: 'outer-middle',
                },
                tick: {
                    format: function (d) { return d + "個"; }
                }
            },
        }
    });
}

