import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_2wn1OwDCcX1HUVumdO61F54ykU6vxYI",
  authDomain: "jalsuddhi-25998.firebaseapp.com",
  projectId: "jalsuddhi-25998",
  storageBucket: "jalsuddhi-25998.appspot.com",
  messagingSenderId: "784758960577",
  appId: "1:784758960577:web:fefca81a9b97cb7cbd3f40",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };
