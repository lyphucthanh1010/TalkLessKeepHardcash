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
  sendPasswordResetEmail,
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
  const emailInput = document.getElementById("email_forget");
  

  async function recover() {
    if (validate_email(emailInput.value) == false) {
        return alert("Email or Password Invalid");
      } else {
       sendPasswordResetEmail(auth, emailInput.value)
           .then(() => {
            window.location.href ="SE114.html"
            return alert("Email Sent");            
          })
          .catch(error => {
            const error_code = error.code;
            const error_message = error.message;
            return alert(error.message);
          })
      }
  }
  const RecoverPassBtn = document.getElementById("forget_btn").addEventListener("click", function(event){
    recover();
    event.preventDefault();
  });
  function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (expression.test(email) == true) {
      return true;
    } else {
      return false;
    }
  }