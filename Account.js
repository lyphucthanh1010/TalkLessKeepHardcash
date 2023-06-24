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
  onAuthStateChanged(auth ,(user) =>{
    if(user){
      var userRef = ref(database, 'Users/' + user.uid);
      get(userRef)
      .then((snapshot) => {
        var userData = snapshot.val();
        var namedisplay = userData.name;
        var emaildisplay = userData.email;
        var mobiledisplay = userData.mobile;
        var displayEmailElement = document.getElementById("emaildisplay");
        displayEmailElement.textContent = emaildisplay;
  
        var displaymobile = document.getElementById("mobiledisplay");
        displaymobile.textContent= mobiledisplay;
  
        var displayNameElement = document.getElementById("usernamedisplay");
        displayNameElement.textContent = namedisplay;
      });
    }
  });
  const submit = document.getElementById("submit").addEventListener("click", function(event){
    window.location.href="AddFamily.html"
    event.preventDefault();
  });
  const family = document.getElementById("familybutton").addEventListener("click", function(event){
    window.location.href="FamilyDetail.html"
    event.preventDefault();
  });
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userRef = ref(database, 'Users/'+ user.uid);
      const familyRef = ref(database, "Family");
      get(userRef)
        .then((userSnapshot) => {
          const userEmail = userSnapshot.val().email;
          get(familyRef)
            .then((familySnapshot) => {
              familySnapshot.forEach((childSnapshot) => {
                const familyData = childSnapshot.val();
                if (familyData.email1 === userEmail || familyData.email2 === userEmail ||  familyData.email3 === userEmail) {
                  const userName = familyData.family;
                  var displayfamilyElement = document.getElementById("family");
                  displayfamilyElement.textContent = userName + "'s family";
                }
              });
            })
            .catch((error) => {
              console.log("Lỗi khi lấy dữ liệu từ cơ sở dữ liệu 'Family':", error);
            });
        })
        .catch((error) => {
          console.log("Lỗi khi lấy dữ liệu từ cơ sở dữ liệu người dùng:", error);
        });
    }
  });
  
  
 