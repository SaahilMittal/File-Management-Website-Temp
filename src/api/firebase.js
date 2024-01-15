import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAGaKlyQ87itdOjr7H_gJSxpsDHoOEIVSc",
    authDomain: "react-fms-82bd2.firebaseapp.com",
    projectId: "react-fms-82bd2",
    storageBucket: "react-fms-82bd2.appspot.com",
    messagingSenderId: "859775818811",
    appId: "1:859775818811:web:42077ff2e7406b7114101e"
  };

  const fire = firebase.initializeApp(firebaseConfig)

  export default fire;