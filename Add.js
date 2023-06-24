import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
import {
  getDatabase,
  set,
  ref,
  update,
  push,
  get,
  remove,
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
  const SignupBtn = document.getElementById("submit").addEventListener("click", function(event){
    addpost();
    event.preventDefault();
  });
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);
  const database = getDatabase(firebase);
  const analytics = getAnalytics(firebase);
  const POST_COLLECTION = "Posts";
  const USER_COLLECTION = "Users";
  const CHANGE_COLLECTION = "Balances";
  const titleInput = document.getElementById("title");
  const moneyInput = document.getElementById("money");
  const contentInput = document.getElementById("content");
  const datetimeInput = document.getElementById("date");
  
  async function addpost() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        var userRef = ref(database, 'Users/' + user.uid);
        get(userRef).then((snapshot) => {
          var userData = snapshot.val();
          var namedisplay = userData.name;
          var emaildisplay = userData.email;
          var mobiledisplay = userData.mobile;
        });
      }
    });
  
    const title = titleInput.value;
    const content = contentInput.value;
    const money = moneyInput.value;
    const date = datetimeInput.value;
    const user = auth.currentUser;
    const userRef = ref(database, "Users" + user.uid);
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.val();
    const user_data = {
      email: user.email,
      uid: user.uid,
    };
    const post_data = {
      title: title,
      content: content,
      money: money,
      date: date,
      user: user.uid,
      email: user.email,
      last_post: Date.now(),
    };
    const postRef = ref(database, POST_COLLECTION);
    try {
      const newPostRef = push(postRef);
      set(newPostRef, post_data);
      alert("Posted Successfully");
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const postsRef = ref(database, "Posts");
        let isPosted = false;
        get(postsRef)
          .then((snapshot) => {
            let totalMoney = 0;
            snapshot.forEach((childSnapshot) => {
              const post = childSnapshot.val();
              if (post.user === uid) {
                const { money } = post;
                totalMoney += parseFloat(money);
              }
            });
            const userRef2 = ref(database, 'Users/' + user.uid);
            get(userRef2).then((snapshot) => {
              const userData2 = snapshot.val();
              const change2display = parseFloat(userData2.change);
              const containmoney = parseFloat(change2display - totalMoney);
              if (!isPosted && money >= containmoney) {
                // Xóa bài đăng vừa được đăng
                remove(newPostRef)
                  .then(() => {
                    alert("Your balance is not enough. Post deleted.");
                  })
                  .catch((error) => {
                    console.error("Error deleting post:", error);
                  });
              } else {
                // Cập nhật số dư của người dùng
                const change_data = {
                  balance: containmoney,
                };
                const changeRef = ref(database, `${USER_COLLECTION}/${user.uid}`);
                update(changeRef, change_data);
              }
            });
          });
        }
      });
    } catch (error) {
      console.error("Error while posting:", error);
    }
  }
      

    
    
    
    
    
    
    