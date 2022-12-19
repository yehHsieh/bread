const addBreadName = document.querySelector(".addBreadName");
const addPrice = document.querySelector(".addPrice");
const addContent = document.querySelector(".addContent");
const addSource = document.querySelector(".addSource");
const addImgur = document.querySelector(".addImgur");
const addProduct = document.querySelector(".addProduct");
const tableBody = document.querySelector(".tableBody");

addProduct.addEventListener("click", e => {
    const name = addBreadName.value;
    const price = addPrice.value;
    const content = addContent.value;
    const source = addSource.value;
    const imgur = addImgur.value;
    axios.post(`${api_path}/products`, {
        "imgur": imgur,
        "price": price,
        "breadName": name,
        "content": content,
        "source": source,
        "num": 0
    })
        .then(function (response) {
            Swal.fire("新增商品成功", "", "success")
                .then(e => {
                    getProductData();
                })
        })
})

tableBody.addEventListener("click", e => {
    let deleteProduct = e.target.getAttribute("data-deleteProduct");
    if (deleteProduct == null) {
        return
    }

    Swal.fire({
        title: "確定刪除?",
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: 'Sure?'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`${api_path}/products/${deleteProduct}`)
        .then(function (response) {
            Swal.fire("商品刪除成功", "", "success")
                .then(e => {
                    getProductData();
                })
        })
        }
    })
    



    })
    
    // 初始化
    init();

    function init() {
        getProductData();
    }

    let productData = [];
    function getProductData() {
        axios.get(`${api_path}/products`)
            .then(function (response) {
                productData = response.data;
                render();
            })
    }

    function render() {
        let str = "";
        productData.forEach(item => {
            str += `<tr>
        <th scope="row">${item.id}</th>
        <td>${item.breadName}</td>
        <td>${item.price}</td>
        <td style="width: 280px;">${item.content}</td>
        <td>${item.source}</td>
        <td><img src=${item.imgur} alt="bread" style="height: 55px;"></td>
        <td><button class="btn btn-light" data-deleteProduct="${item.id}">刪除</button></td>
      </tr>`
        });
        tableBody.innerHTML = str;
    }


//時間設定
const timeSet = document.querySelector("#timeSet");
const timeInput = document.querySelector(".timeInput");

timeSet.addEventListener("click", e =>{
    e.preventDefault();
    localStorage.setItem("timeValue",timeInput.value);
    Swal.fire("訂單關閉時間已調整", "", "success")
})


// 滾動高度
// const table = document.querySelector(".table")
// function roll(){
//     let clientHeight = table.height() ;
//     console.log(clientHeight)
// }
// roll()