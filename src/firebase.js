// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Cloud Firestore Database | https://firebase.google.com/docs/firestore/quickstart
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoDJzPNJG3AkGZkAvLBCaROpwDk2FYjVA",
  authDomain: "pescar-3dseos.firebaseapp.com",
  projectId: "pescar-3dseos",
  storageBucket: "pescar-3dseos.appspot.com",
  messagingSenderId: "185417562298",
  appId: "1:185417562298:web:13cb3a79ac0af822ee6a83"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//---------------------Database Test----------------------

// getDocs(colRef)
//     .then((snapshot) => {
//         // console.log(snapshot);
//         let testArr = [];
//         snapshot.docs.forEach((doc) => {
//           testArr.push({ ...doc.data(), id: doc.id })
//         });
//         console.log(testArr);
//     })
//     .catch(err => {
//         console.log(err.message);
//     })

// async function leerYProcesarJson() {
//   try {
//       const response = await fetch("json/productos.json");
//       const data = await response.json();
//       // console.log(data);
//       // // for (const p of data) {
//       // //   console.log(p);
//       // // }
//       data.forEach(p => {
//           //delete p.id; //Quita el id del objeto para no subirlo a la db
//           console.log(p);
//           //addDoc(collection(db, 'productos-test'), p)
//       });
//   } catch (error) {
//       console.log(`Se produjo un error: ${error.message}`);
//   }
// }
//leerYProcesarJson();

// getDocs(collection(db, 'productos-test'))
//   .then((snapshot) => {
//     // console.log(snapshot);
//     let arr = [];
//     snapshot.docs.forEach((doc) => {
//       arr.push({ ...doc.data(), id: doc.id })
//     });
//     console.log(arr);
//   })
//   .catch(err => {
//     console.log(err.message);
//   })