import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
import {
  getDatabase,
  set,
  ref,
  update,
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
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);
  const database = getDatabase(firebase);
  const analytics = getAnalytics(firebase);
  const USER_COLLECTION = "Users";
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
  const submitchanges = document.getElementById("submitchange").addEventListener("click", function(event){
    addchange();
    event.preventDefault();
  });
  function addchange(){
    const changeInput = document.getElementById("changetype");
    const change = changeInput.value;
    const user_data = {
      change: change,
    };
  onAuthStateChanged(auth ,(user) =>{
      if(user){
        var userRef = ref(database, 'Users/' + user.uid);
        update(userRef, user_data)
          .then(() => {
          return alert("Change Has Been Added");
        })
        .catch((error) => {
          return alert(error.message);
        });
      }
    });
  }
  onAuthStateChanged(auth ,(user) =>{
    if(user){
      var userRef = ref(database, 'Users/' + user.uid);
      get(userRef)
      .then((snapshot) => {
        var userData = snapshot.val();
        var namedisplay = userData.name;
        var displayNameElement = document.getElementById("namecard");
        displayNameElement.textContent = namedisplay;

        var changedisplay = userData.change;
        var displayChangeElement = document.getElementById("FirstChange");
        displayChangeElement.textContent = changedisplay;
      });
    }
  });
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      const postsRef = ref(database, "Posts");
      get(postsRef)
        .then((snapshot) => {
          let totalMoney = 0;
          snapshot.forEach((childSnapshot) => {
            const post = childSnapshot.val();
            if( post.user === uid){
              const { money } = post;
              totalMoney += parseFloat(money);
              const displayChangecardElement = document.getElementById("after");
              displayChangecardElement.textContent = totalMoney;
              var userRef2 = ref(database, 'Users/' + user.uid);
              get(userRef2)
              .then((snapshot)=>{
                var userData2 = snapshot.val();
                const change2display = parseFloat(userData2.change);
                var containmoney = parseFloat(change2display - totalMoney);
                const displayChangecard = document.getElementById("afterchange");
                const displayChangecard2 = document.getElementById("changes");
                displayChangecard.textContent = containmoney;
                displayChangecard2.textContent = containmoney;
              })
            }
          });
        })
        .catch((error) => {
          alert("Lỗi khi lấy thông tin từ cơ sở dữ liệu:", error);
        });
    }
  });

  