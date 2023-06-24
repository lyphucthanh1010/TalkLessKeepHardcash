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
  
  async function forgetpass(){
    window.location.href ="ForgetPass.html"
  }
  const forgetBtn = document.getElementById("forgettext").addEventListener("click", function(event){
    forgetpass();
    event.preventDefault();
  });
  async function signup() {
    window.location.href ="SignUp.html"
  }
  const signupBtn = document.getElementById("signuptext").addEventListener("click", function(event){
    signup()
    event.preventDefault();
  });


  const LoginBtn = document.getElementById("login_btn").addEventListener("click", function(event){
    Login();
    event.preventDefault();
  });
  async function Login() {
    const email = emailInput.value;
    const password = passwordInput.value;
  if (validate_email(email) == false || validate_password(password) == false) {
    return alert("Email or Password Invalid");
  } else {
    await signInWithEmailAndPassword(auth, email, password)
      .then(function (userCredential) {
        console.log(userCredential);
        const user = userCredential.user;
        const user_data = {
          last_login: Date.now(),
        };
        const userRef = ref(database, `${USER_COLLECTION}/` + user.uid);
        update(userRef, user_data)
          .then(() => {
          window.location.href ="DashBoard.html"
          return alert("User Has Logged In");
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


