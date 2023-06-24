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
  // onAuthStateChanged(auth, (user)=>{
  //   if(user){
  //     const uid = user.uid;
  //     const postsRef =ref(database, "Users/" + uid);
  //     get(postsRef)
  //     .then((snapshot)=> {
  //       const userdataaa = snapshot.val();
  //       if(userdataaa){
  //         const email = user.email;
  //         const postpostRef = ref(database, "Posts");
  //         get(postpostRef)
  //         .then((postsnapshot)=>{
  //           const data = [];
  //           let moneypost = 0;
  //           postsnapshot.forEach((childsnapshot)=>{
  //             const post = childsnapshot.val();
  //             if(post.email === email){
  //               const {money, date} = post;
  //               moneypost += money;
  //               const {balance} = userdataaa;
  //               data.push({ ngay: date, chiTieu: moneypost, soDu: balance });
  //                   var labels = data.map(item => item.ngay);
  //                   var chiTieuData = data.map(item => item.chiTieu);
  //                   var soDuData = data.map(item => item.soDu);
  //                   var ctx = document.getElementById('myChart').getContext('2d');
  //                   var myChart = new Chart(ctx, {
  //                     type: 'bar',
  //                     data: {
  //                       labels: labels,
  //                       datasets: [
  //                         {
  //                           label: 'Spending',
  //                           data: chiTieuData,
  //                           backgroundColor: '#dcccf3',
  //                           borderWidth: 0,
  //                           borderRadius: 6 // Chỉnh giá trị bo góc
  //                         },
  //                         {
  //                           label: 'Saving',
  //                           data: soDuData,
  //                           backgroundColor: '#add2d0',
  //                           borderWidth: 0,
  //                           borderRadius: 8,
  //                           // Chỉnh giá trị bo góc
  //                         }
  //                       ]
  //                     },
  //                     options:{
  //                       responsive: true,
  //                       plugins: {
  //                         legend:{
  //                           display: false,
  //                           position: 'bottom'
  //                         },
  //                         title:{
  //                           display: true,
  //                           font:{
  //                             size: 16,
  //                             weight: 'bold'
  //                           }
  //                         },
  //                         zoom:{
  //                           zoom:{
  //                             wheel:{
  //                               enabled: true
  //                             },
  //                             mode: 'x',
  //                             speed: 0.05
  //                           },
  //                           pan:{
  //                             enabled: true,
  //                             mode: 'x',
  //                             speed: 20
  //                           }
  //                         },
  //                         scales:{
  //                           x:{
  //                             type: 'category',
  //                             grid: {
  //                               display: false
  //                             },
  //                           },
  //                           y: {
  //                             display: false,
  //                             grid:{
  //                               color: '#dcccf3'
  //                             },
  //                             ticks: {
  //                               beginAtZero: true
  //                             }
  //                           }
  //                         }
  //                       }
  //                     }
  //                   });
  //             }
  //           });
  //         });
  //       }
  //     });
  //   }
  // });
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const email = user.email;
      const postsRef = ref(database, "Posts");
      const userRef = ref(database, "Users");
      
      Promise.all([get(postsRef), get(userRef)])
        .then(([postSnapshot, userSnapshot]) => {
          const postData = postSnapshot.val();
          const userData = userSnapshot.val();
          if (postData && userData) {
            const data = [];
            Object.entries(postData).forEach(([postId, post]) => {
              if (post.email === email) {
                const { money, date } = post;
                const balance = userData[user.uid]?.balance || 0;
                data.push({ ngay: date, chiTieu: money, soDu: balance });
              }
            });
  
            const labels = data.map(item => item.ngay);
            const chiTieuData = data.map(item => item.chiTieu);
            const soDuData = data.map(item => item.soDu);
            const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new Chart(ctx, {
              type: 'pie',
              data: {
                labels: labels,
                datasets: [
                  {
                    label: 'Spending',
                    data: chiTieuData,
                    backgroundColor: '#dcccf3',
                    borderWidth: 0,
                    borderRadius: 6
                  },
                  {
                    label: 'Balance',
                    data: soDuData,
                    backgroundColor: '#add2d0',
                    borderWidth: 0,
                    borderRadius: 8
                  }
                ]
              },
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                    position: 'bottom'
                  },
                  title: {
                    display: true,
                    font: {
                      size: 16,
                      weight: 'bold'
                    }
                  },
                  zoom: {
                    zoom: {
                      wheel: {
                        enabled: true
                      },
                      mode: 'x',
                      speed: 0.05
                    },
                    pan: {
                      enabled: true,
                      mode: 'x',
                      speed: 20
                    }
                  },
                },
                scales: {
                  x: {
                    type: 'category',
                    grid: {
                      display: false
                    }
                  },
                  y: {
                    display: false,
                    grid: {
                      color: '#dcccf3'
                    },
                    ticks: {
                      beginAtZero: true
                    }
                  }
                }
              }
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          alert("An error occurred while fetching data");
        });
    }
  });
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const email = user.email;
      const postsRef = ref(database, "Posts");
      const userRef = ref(database, "Users");
      
      Promise.all([get(postsRef), get(userRef)])
        .then(([postSnapshot, userSnapshot]) => {
          const postData = postSnapshot.val();
          const userData = userSnapshot.val();
          if (postData && userData) {
            const data = [];
            Object.entries(postData).forEach(([postId, post]) => {
              if (post.email === email) {
                const { money, date } = post;
                const balance = userData[user.uid]?.balance || 0;
                data.push({ ngay: date, chiTieu: money, soDu: balance });
              }
            });
  
            const labels = data.map(item => item.ngay);
            const chiTieuData = data.map(item => item.chiTieu);
            const soDuData = data.map(item => item.soDu);
  
            const ctx = document.getElementById('myChart2').getContext('2d');
            const myChar2 = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: labels,
                datasets: [
                  {
                    label: 'Spending',
                    data: chiTieuData,
                    backgroundColor: '#dcccf3',
                    borderWidth: 0,
                    borderRadius: 6
                  },
                  {
                    label: 'Balance',
                    data: soDuData,
                    backgroundColor: '#add2d0',
                    borderWidth: 0,
                    borderRadius: 8
                  }
                ]
              },
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                    position: 'bottom'
                  },
                  title: {
                    display: true,
                    font: {
                      size: 16,
                      weight: 'bold'
                    }
                  },
                  zoom: {
                    zoom: {
                      wheel: {
                        enabled: true
                      },
                      mode: 'x',
                      speed: 0.05
                    },
                    pan: {
                      enabled: true,
                      mode: 'x',
                      speed: 20
                    }
                  },
                },
                scales: {
                  x: {
                    type: 'category',
                    grid: {
                      display: false
                    }
                  },
                  y: {
                    display: false,
                    grid: {
                      color: '#dcccf3'
                    },
                    ticks: {
                      beginAtZero: true
                    }
                  }
                }
              }
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          alert("An error occurred while fetching data");
        });
    }
  });
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const email = user.email;
      const postsRef = ref(database, "Posts");
      const userRef = ref(database, "Users");
      
      Promise.all([get(postsRef), get(userRef)])
        .then(([postSnapshot, userSnapshot]) => {
          const postData = postSnapshot.val();
          const userData = userSnapshot.val();
          if (postData && userData) {
            const data = [];
            Object.entries(postData).forEach(([postId, post]) => {
              if (post.email === email) {
                const { money, date } = post;
                const balance = userData[user.uid]?.balance || 0;
                data.push({ ngay: date, chiTieu: money, soDu: balance });
              }
            });
  
            const labels = data.map(item => item.ngay);
            const chiTieuData = data.map(item => item.chiTieu);
            const soDuData = data.map(item => item.soDu);
  
            const ctx = document.getElementById('myChart3').getContext('2d');
            const myChar2 = new Chart(ctx, {
              type: 'line',
              data: {
                labels: labels,
                datasets: [
                  {
                    label: 'Spending',
                    data: chiTieuData,
                    backgroundColor: '#dcccf3',
                    borderWidth: 3,
                    borderRadius: 6,
                    
                  },
                  {
                    label: 'Balance',
                    data: soDuData,
                    backgroundColor: '#add2d0',
                    borderWidth: 3,
                    borderRadius: 8,
              
                  }
                ]
              },
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                    position: 'bottom'
                  },
                  title: {
                    display: true,
                    font: {
                      size: 16,
                      weight: 'bold'
                    }
                  },
                  zoom: {
                    zoom: {
                      wheel: {
                        enabled: true
                      },
                      mode: 'x',
                      speed: 0.05
                    },
                    pan: {
                      enabled: true,
                      mode: 'x',
                      speed: 20
                    }
                  },
                },
                scales: {
                  x: {
                    type: 'category',
                    grid: {
                      display: false
                    }
                  },
                  y: {
                    display: false,
                    grid: {
                      color: '#dcccf3'
                    },
                    ticks: {
                      beginAtZero: true
                    }
                  }
                }
              }
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          alert("An error occurred while fetching data");
        });
    }
  });
  