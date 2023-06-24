import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
import {
  getDatabase,
  set,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAp7SaS0c24bHGJn-4G-Bm0clhndny_NY4",
    authDomain: "se114-28c60.firebaseapp.com",
    projectId: "se114-28c60",
    storageBucket: "se114-28c60.appspot.com",
    messagingSenderId: "792539298780",
    appId: "1:792539298780:web:74a2d01a7b5b606ca16d19",
    measurementId: "G-FFEYH5HNPF"
  };
$('.menu-btn').click(function() {
    $('.side-bar').addClass('active')
    $('.menu-btn').css("visibility", "hidden")
})

$('.close-btn').click(function() {
    $('.side-bar').removeClass('active')
    $('.menu-btn').css("visibility", "visible")
})
const history = document.getElementById("history").addEventListener("click", function(event){
  window.location.href="History.html";
  event.preventDefault();
});
const calendar = document.getElementById("calendar").addEventListener("click", function(event){
  window.location.href="Calendar.html";
  event.preventDefault();
});
const statistics = document.getElementById("statistics").addEventListener("click", function(event){
  window.location.href="Statistics.html";
  event.preventDefault();
});
const mywallet = document.getElementById("mywallet").addEventListener("click", function(event){
  window.location.href="MyWallet.html";
  event.preventDefault();
});
const settings = document.getElementById("settings").addEventListener("click", function(event){
  window.location.href="Settings.html";
  event.preventDefault();
});
const dashboard = document.getElementById("dashboard").addEventListener("click", function(event){
  window.location.href="DashBoard.html";
  event.preventDefault();
});
const account = document.getElementById("account").addEventListener("click", function(event){
  window.location.href="Account.html";
  event.preventDefault();
});
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);
  const database = getDatabase(firebase);
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     const postsRef = ref(database, "Posts");
  //     get(postsRef)
  //       .then((snapshot) => {
  //         snapshot.forEach((childSnapshot) => {
  //           const post = childSnapshot.val();
  //           if( post.user === uid){
  //             const { title, content, date, money } = post;
    
  //             // Tạo div mới cho title
  //           const titleDiv = document.createElement("div");
  //           const titleElement = document.createElement("h3");
  //           titleElement.textContent = "Title: " + title;
  //           titleDiv.appendChild(titleElement);

  //           // Tạo div mới cho content
  //           const contentDiv = document.createElement("div");
  //           const contentElement = document.createElement("p");
  //           contentElement.textContent = "Content: " + content;
  //           contentDiv.appendChild(contentElement);

  //           // Tạo div mới cho date
  //           const dateDiv = document.createElement("div");
  //           const dateElement = document.createElement("p");
  //           dateElement.textContent = "Date: " + date;
  //           dateDiv.appendChild(dateElement);

  //           // Tạo div mới cho money
  //           const moneyDiv = document.createElement("div");
  //           const moneyElement = document.createElement("p");
  //           moneyElement.textContent = "Money pay: " + money;
  //           moneyDiv.appendChild(moneyElement);

  //           // Chèn các div mới vào phần tử gốc tương ứng
  //           document.getElementById("usernamedisplay").appendChild(titleDiv);
  //           document.getElementById("emaildisplay").appendChild(contentDiv);
  //           document.getElementById("mobiledisplay").appendChild(dateDiv);
  //           document.getElementById("moneydisplay").appendChild(moneyDiv);
              
  //             const balanceRef = ref(database, "Balances");
  //             get(balanceRef)
  //             .then((snapshot)=>{
  //               snapshot.forEach((childSnapshot)=>{
  //                 const balance = childSnapshot.val();
  //               })
  //             })
  //           }
  //         });
  //       })
  //       .catch((error) => {
  //         alert("Lỗi khi lấy thông tin từ cơ sở dữ liệu:", error);
  //       });
  //   }
  // });
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      const postsRef = ref(database, "Posts");
      get(postsRef)
        .then((snapshot) => {
          const dataDivArray = [];
          snapshot.forEach((childSnapshot) => {
            const post = childSnapshot.val();
            if (post.user === uid) {
              const { title, content, date, money } = post;
              const dataDiv = document.createElement("div");
              dataDiv.classList.add("data");
  
              const itemTitleDiv = document.createElement("div");
              itemTitleDiv.id = "displaytexxt";
              itemTitleDiv.classList.add("data-item");
  
              const usernameElement = document.createElement("h3");
              usernameElement.id = "usernamedisplay";
              usernameElement.classList.add("title");
              usernameElement.textContent =  title;
              itemTitleDiv.appendChild(usernameElement);
  
              const emailElement = document.createElement("p");
              emailElement.id = "emaildisplay";
              emailElement.classList.add("desc");
              emailElement.textContent =  content;
              itemTitleDiv.appendChild(emailElement);
  
              const mobileElement = document.createElement("p");
              mobileElement.id = "mobiledisplay";
              mobileElement.classList.add("desc");
              mobileElement.textContent = date;
              itemTitleDiv.appendChild(mobileElement);
  
              dataDiv.appendChild(itemTitleDiv);
  
              const moneyElement = document.createElement("p");
              moneyElement.id = "moneydisplay";
              moneyElement.classList.add("blancemoney","sub");
              moneyElement.textContent = money;
              dataDiv.appendChild(moneyElement);
              
              dataDivArray.push(dataDiv);
              document.body.appendChild(dataDiv);
            }
          });
          const bodyElement = document.querySelector("body");
              dataDivArray.forEach((dataDiv) => {
              bodyElement.appendChild(dataDiv); // Thêm tất cả các div vào trong body
        });
      })
      .catch((error) => {
        alert("Lỗi khi lấy thông tin từ cơ sở dữ liệu:", error);
      });
  }
});
 