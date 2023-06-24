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
const FAMILY_COLLECTION = "Family";
const familynameInput = document.getElementById("title");
const emailInput = document.getElementById("content");
const email2Input = document.getElementById("content2");
const email3Input = document.getElementById("content3");
const SignupBtn = document.getElementById("submit").addEventListener("click", function(event){
    addfamily();
    event.preventDefault();
});
async function addfamily(){
    onAuthStateChanged(auth ,(user) =>{
        if(user){
            const name = familynameInput.value;
            const email = emailInput.value;
            const email2 = email2Input.value;
            const email3 = email3Input.value;
            const family_data = {
                family: name,
                email1: email,
                email2: email2,
                email3: email3,
                last_add: Date.now(),
            };
            const userRef = ref(database, `${FAMILY_COLLECTION}/` + user.uid);
            set(userRef, family_data)
            .then(() => {
            return alert("Family Has Been Created");            
            })
            .catch((error) => {
            return alert(error.message);
            });
        }
    });
}