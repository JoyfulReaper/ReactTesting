import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyBlyhoaCmjUsA16Qkr-dB8Pt1TIAMphyG8",
  authDomain: "reactexplained-1cc42.firebaseapp.com",
  databaseURL: "https://reactexplained-1cc42-default-rtdb.firebaseio.com/",
  projectId: "reactexplained-1cc42",
  storageBucket: "reactexplained-1cc42.appspot.com",
  messagingSenderId: "366844375464",
  appId: "1:366844375464:web:96e2adc741d39093216d9d"
};

const app = initializeApp(config);