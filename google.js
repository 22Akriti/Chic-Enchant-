import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth,GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyC7jXNDIYKRgwTd-lS3N7lKXzQcsm2HYCU",
    authDomain: "chic-enchante-dd587.firebaseapp.com",
    projectId: "chic-enchante-dd587",
    storageBucket: "chic-enchante-dd587.appspot.com",
    messagingSenderId: "185501913627",
    appId: "1:185501913627:web:6866f4ef3ca7e1f6185ebe",
    measurementId: "G-75NDB40W0H"
  };
  const app = initializeApp(firebaseConfig);
  const auth =getAuth(app);
  auth.languageCode='en';
  const provider= new GoogleAuthProvider();
  const googleLogin=document.getElementById("googlelogin");
  googleLogin.addEventListener("click",function(){
    signInWithPopup(auth,provider)
    .then((result)=>{
        const credential=GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        window.location.href="index.html";
    }).catch((error)=>{
        const errorCode=error.code;
        const errorMessage=error.message;
    });
  })