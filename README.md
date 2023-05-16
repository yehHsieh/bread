# 限時預訂出爐麵包網站

## 作品緣由：

朋友經營的麵包店，使用 Line 進行預訂出爐麵包，再經由人工將資料轉移紙本與 Excel ，經常在轉移過程誤植資料，因此希望提供一網站讓使用者自行選訂麵包、取貨時間，並將訂單資料自動存至後台，統計各商品銷售量，也可讓管理者上、下架商品與設置關閉訂單時間，達到不論使用者或管理者使用體驗提升。

## 使用者故事 User Story：

前台使用者(客戶) : 登入功能，提供後臺客戶基本資料，使麵包師傅控管限購數量。  
前台使用者(客戶) : 購物車功能與預購功能，並選定預定到店取貨時間。  
後臺使用者(師傅) : 更新即將出爐麵包種類、日期、數量。  
後臺使用者(師傅) : 結單後預購數量、種類、客戶名、預定領取時間統整(依客戶提供相關資訊匯出excel檔)  

## Demo

(https://yehhsieh.github.io/bread/index.html)

##
![圖片參考名稱](https://github.com/yehHsieh/VueSideProject/blob/main/src/assets/img/VueProject.png "Logo")

## 使用技術、工具
Vue 3 (Options API)、Axios 非同步遠端請求 API 、Vite、Pinia、 RWD、Bootstrap5 框架、 SCSS 樣式設計、VeeValidate 套件

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
