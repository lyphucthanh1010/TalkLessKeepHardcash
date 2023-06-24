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
  measurementId: "G-FFEYH5HNPF",
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const database = getDatabase(firebase);
const analytics = getAnalytics(firebase);
const POST_COLLECTION = "Posts";
const USER_COLLECTION = "Users";
const CHANGE_COLLECTION = "Balances";

const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();
const months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let postData = [];
onAuthStateChanged(auth, async (user) => {
  if (user) {
    var postRef = ref(database, POST_COLLECTION);
    get(postRef).then((snapshot) => {
      postData = Object.values(snapshot.val());
      console.log({ postData });
      renderCalendar();
    });
  }
});

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";
  for (let i = firstDayofMonth; i > 0; i--) {
    const hasPost = postData.some(({ date }) => {
      date = new Date(date);
      return (
        currYear == date.getFullYear() &&
        currMonth - 1 == date.getMonth() &&
        lastDateofLastMonth - i + 1 == date.getDate()
      );
    });
    if (hasPost)
      liTag += `<li class="active">${lastDateofLastMonth - i + 1}</li>`;
    else liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }
  for (let i = 1; i <= lastDateofMonth; i++) {
    const hasPost = postData.some(({ date }) => {
      date = new Date(date);
      return (
        currYear == date.getFullYear() &&
        currMonth == date.getMonth() &&
        lastDateofLastMonth - i + 1 == date.getDate()
      );
    });
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    if (hasPost) liTag += `<li class="active">${i}</li>`;
    else liTag += `<li class="${isToday}">${i}</li>`;
  }
  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
};
renderCalendar();
prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    if (icon.id === "prev") {
      currMonth--;
      if (currMonth < 0) {
        currMonth = 11;
        currYear--;
      }
    } else {
      currMonth++;
      if (currMonth > 11) {
        currMonth = 0;
        currYear++;
      }
    }
    // currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    // if (currMonth < 0 || currMonth > 11) {
    //   date = new Date(currYear, currMonth, new Date.getDate());
    //   currYear = date.getFullYear();
    //   currMonth = date.getMonth();
    // } else {
    //   date = new Date(currYear, currMonth, 1);
    // }
    renderCalendar();
  });
});
$(".menu-btn").click(function () {
  $(".side-bar").addClass("active");
  $(".menu-btn").css("visibility", "hidden");
});

$(".close-btn").click(function () {
  $(".side-bar").removeClass("active");
  $(".menu-btn").css("visibility", "visible");
});
const history = document
  .getElementById("history")
  .addEventListener("click", function (event) {
    window.location.href = "History.html";
    event.preventDefault();
  });
const calendar = document
  .getElementById("calendar")
  .addEventListener("click", function (event) {
    window.location.href = "Calendar.html";
    event.preventDefault();
  });
const statistics = document
  .getElementById("statistics")
  .addEventListener("click", function (event) {
    window.location.href = "Statistics.html";
    event.preventDefault();
  });
const mywallet = document
  .getElementById("mywallet")
  .addEventListener("click", function (event) {
    window.location.href = "MyWallet.html";
    event.preventDefault();
  });
const settings = document
  .getElementById("settings")
  .addEventListener("click", function (event) {
    window.location.href = "Settings.html";
    event.preventDefault();
  });
const dashboard = document
  .getElementById("dashboard")
  .addEventListener("click", function (event) {
    window.location.href = "DashBoard.html";
    event.preventDefault();
  });
const account = document
  .getElementById("account")
  .addEventListener("click", function (event) {
    window.location.href = "Account.html";
    event.preventDefault();
  });
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const postsRef = ref(database, "Posts");
    get(postsRef)
      .then((snapshot) => {
        const calendarDays = document.querySelectorAll(".days li");
        const databaseDates = []; // Mảng chứa các ngày từ cơ sở dữ liệu
        snapshot.forEach((childSnapshot) => {
          const post = childSnapshot.val();
          if (post.user === uid) {
            const postDate = new Date(post.date);
            const day= postDate.getDate();
            // console.log(day);
            const month = postDate.getMonth() -1;
            const year = postDate.getFullYear();
            const dateString = `${month}-${day}`;
            databaseDates.push(dateString);
            console.log(databaseDates);
          }
        });
        // Duyệt qua các ngày trên lịch và kiểm tra xem ngày có trong mảng ngày từ cơ sở dữ liệu hay không
        calendarDays.forEach((dayElement) => {
          const dayString = dayElement.dataset.date;
          if (databaseDates.includes(dayString)) {
            console.log(dayString);
            dayElement.classList.add("marked");
          }
        });
      })
      .catch((error) => {
        alert("Lỗi khi lấy thông tin từ cơ sở dữ liệu:", error);
      });
  }
});