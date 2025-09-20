// console.log('শুরু (Start)');

// const myPromise = new Promise((resolve, reject) => {
//     let state = true
//     if(state){

//         setTimeout(() => {
//             resolve({
//                 sucess : true,
//                 data : {
//                     name : "NIET"
//                 }
//             });
//         }, 1000);
//     }else{
//         reject({
//             success : false,
//             msg : "Server fail"
//         })
//     }
//     });

// // myPromise
// //     .then(result => {
// //         console.log(result);
// //     })
// //     .catch(error => {
// //         console.log('এরর:', error);
// //     });

// const fetchData  = async () => {
//     let fetch = await myPromise
//     console.log(fetch);


// }

// fetchData()

// // console.log('শেষ (End)');







// fetch("https://jsonplaceholder.typicode.com/postqwfwef", {
//     method : "POST"
// }).then(data => data.json()).then(data => console.log(data)).catch(err => {
//     console.log("Dqweu");
// })


// getelementbytag name
// get element by query selector / selector all
// get element by id
// get element by classname

let h1 = document.querySelectorAll("h1")
console.log(h1);
