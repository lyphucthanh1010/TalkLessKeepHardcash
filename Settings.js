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
    const logout = document.getElementById("imagesignout").addEventListener("click", function(event){
      signout();
      event.preventDefault();
    }); 
    function signout(){
      auth.signOut()
      .then(()=> {
        window.location.href = "SE114.html";
        return alert("Logged out successfully");
      })
      .catch((error)=>{
        return alert("Error while logging out");
      });
    }
    onAuthStateChanged(auth ,(user) =>{
      if(user){
  
        var userRef = ref(database, 'Users/' + user.uid);
        get(userRef)
        .then((snapshot) => {
          var userData = snapshot.val();
          var emaildisplay = userData.email;
          var displayEmailElement = document.getElementById("emailsetting");
          displayEmailElement.textContent = emaildisplay;
        });
      }
    });