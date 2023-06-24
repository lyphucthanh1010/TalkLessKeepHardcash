import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const mobileInput = document.getElementById("mobile");
  const nameInput = document.getElementById("user");
const back_text = document.getElementById("back").addEventListener("click", function(event){
    back();
    event.preventDefault();
  });
  async function back() {
    window.location.href ="SE114.html"
  }
  const SignupBtn = document.getElementById("signup_btn").addEventListener("click", function(event){
    signup();
    event.preventDefault();
  });
  async function signup() {
  const email = emailInput.value;
  const password = passwordInput.value;
  const mobile = mobileInput.value;
  const name = nameInput.value;
  
  if (validate_email(email) == false || validate_password(password) == false) {
    return alert("Email or Password or Mobile Number Invalid");
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then(function (userCredential) {
        const user = userCredential.user;
        const user_data = {
            uid: user.uid,
            mobile: mobile,
            name: name,
            email: email,
            last_signup: Date.now(),
        };
        const userRef = ref(database, `${USER_COLLECTION}/` + user.uid);
        set(userRef, user_data)
          .then(() => {
            window.location.href ="SE114.html"
            return alert("Account Has Been Created");            
          })
          .catch((error) => {
            return alert(error.message);
          });
      })
      .catch(function (error) {
        const error_code = error.code;
        const error_message = error.message;
        return alert(error_message);
      });
  }
  }
  function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (expression.test(email) == true) {
      return true;
    } else {
      return false;
    }
  }
  function validate_password(password) {
    if (password < 8) {
      return false;
    } else {
      return true;
    }
  }
  function validate_mobile(mobile)
  {
    if(mobile >= 10 || mobile < 0) {
      return false;
    } else{
      return true;
    }
  }
  