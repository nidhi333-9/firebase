import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBE3dct3kpeb93cGyrOmY4zpKAZ0eS66H4",
  authDomain: "fir-tut-69a1b.firebaseapp.com",
  projectId: "fir-tut-69a1b",
  storageBucket: "fir-tut-69a1b.appspot.com",
  messagingSenderId: "91263129547",
  appId: "1:91263129547:web:5f8000b3d0457ae8ef884e",
};

// initialize firebase app
initializeApp(firebaseConfig);

// initialize services
const db = getFirestore();

// collection reference
const colRef = collection(db, "books");

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = [];

    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });

// adding documents

const addBookForm = document.querySelector(".add");

addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting document

const deleteBookForm = document.querySelector(".delete");

deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});
