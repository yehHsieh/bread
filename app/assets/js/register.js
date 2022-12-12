// register
// const navTab = document.querySelector(".nav-tabs");
// const registerTab = document.querySelector(".registerTab");
// const loginTab = document.querySelector(".loginTab");

// navTab.addEventListener("click", e => {
//   e.preventDefault();
//   let changeTab = e.target.getAttribute("class");
//   if (changeTab != "nav-link active register text-center" && changeTab != "nav-link active loginBtn text-center") {
//     return
//   } else if (changeTab == "nav-link active register text-center") {
//     registerTab.classList.add("d-block");
//     registerTab.classList.remove("d-none");
//     loginTab.classList.remove("d-block");
//     loginTab.classList.add("d-none");
//   } else if (changeTab == "nav-link active loginBtn text-center") {
//     loginTab.classList.remove("d-none");
//     loginTab.classList.add("d-block");
//     registerTab.classList.remove("d-block");
//     registerTab.classList.add("d-none");
//   }
// })


// 切換登入
const changeBtn = document.querySelector(".changeBtn")
const loginBox1 = document.querySelector(".login-box1")
const loginBox2 = document.querySelector(".login-box2")
const registerArea = document.querySelector(".registerArea")

registerArea.addEventListener("click", e => {
  e.preventDefault();
  let changeBtn = e.target.getAttribute("class");
  if (changeBtn == "btn ms-4 pt-3 changeBtn") {
    loginBox1.classList.toggle("d-none");
    loginBox2.classList.toggle("d-none");
  } else {
    return
  }
})


// 渲染登入

function loginRender() {
  let str = "";
  str = `<div class="login-box login-box2">
  <div class="d-flex">
      <h2>Login</h2>
  </div>
  <form>
      <div class="user-box">
          <input type="email" name="" required="" id="loginAccount">
          <label>E-mail</label>
      </div>
      <div class="user-box">
          <input type="password" name="" required="" id="loginPassword">
          <label>Password</label>
      </div>
      <a href="#" id="loginBtn">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Login
      </a>
  </form>
</div>`

  registerArea.innerHTML = str;
}


//註冊功能
const userName = document.querySelector("#userName");
const tel = document.querySelector("#tel");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordCheck = document.querySelector("#passwordCheck");
const registerBtn = document.querySelector("#registerBtn");

registerBtn.addEventListener("click", e => {
  if (password.value === passwordCheck.value) {
    axios.post(`http://localhost:3000/signup`, {
      "name": userName.value,
      "tel": tel.value,
      "email": email.value,
      "password": password.value,
      "isAdmin": false
    })
      .then(function (response) {
        Swal.fire("註冊成功","","success")
        .then(e=>{
          loginRender()
        })
        console.log(response.data)
      })
      .catch(function (error) {
        Swal.fire("此信箱已註冊","","warning")
        console.log(error.response)
      })
  } else {
    Swal.fire("密碼再確認","","error")
  }
})


//載入使用者
let memberData = [];
// getUserData()
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
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error.response)
    })
}


//登入功能
const loginAccount = document.querySelector("#loginAccount");
const loginPassword = document.querySelector("#loginPassword");
const loginBtn = document.querySelector("#loginBtn");

registerArea.addEventListener("click", e => {
  e.preventDefault();
  let loginBtn = e.target.getAttribute("id");
  if (loginBtn = "loginBtn") {
    getUserData()
    const loginAccount = document.querySelector("#loginAccount");
const loginPassword = document.querySelector("#loginPassword");
    axios.post(`http://localhost:3000/login`, {
      "email": loginAccount.value,
      "password": loginPassword.value,
    })
      .then(function (response) {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("id", response.data.user.id);
        localStorage.setItem("isAdmin", response.data.user.isAdmin);
        let isAdmin = localStorage.getItem("isAdmin");
        // let token = localStorage.getItem("token");
        // let id = localStorage.getItem("id");

        if (isAdmin == "false") {
          console.log(isAdmin)
          window.location.href = "./member.html"
        } else if (isAdmin == "true") {
          window.location.href = "./table.html"
        }
      })
      .catch(function (error) {
        console.log(error.response)
      })
  }
  else {
    return
  }
})

