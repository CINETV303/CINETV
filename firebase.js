// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAbUYGP7_qgxf88nZjvchLaKIev15G5-to",
  authDomain: "cinetvpremium.firebaseapp.com",
  projectId: "cinetvpremium",
  storageBucket: "cinetvpremium.appspot.com",
  messagingSenderId: "218504098278",
  appId: "1:218504098278:web:dc11389b067da771cae627"
};

// Initialisation
firebase.initializeApp(firebaseConfig);

// Export des services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage }; // Pour les projets modulaires