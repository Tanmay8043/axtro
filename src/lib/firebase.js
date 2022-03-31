import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB39hOs2w_-epfV6hMMmJbEllg_0ttPHxY",
  authDomain: "test-e60e3.firebaseapp.com",
  projectId: "test-e60e3",
  storageBucket: "test-e60e3.appspot.com",
  messagingSenderId: "237628209348",
  appId: "1:237628209348:web:d16ec12e274d841f38b191"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyC1jHzVPUHqLlndZF4N_dtYMRjj71U6dSs",
//   authDomain: "astro-46804.firebaseapp.com",
//   projectId: "astro-46804",
//   storageBucket: "astro-46804.appspot.com",
//   messagingSenderId: "496633973990",
//   appId: "1:496633973990:web:1fdf82d9d1b9b98ce1bf27"
// };

const app = initializeApp(firebaseConfig, "CLIENT");
const auth = getAuth(app)
const db = getFirestore(app);

export {auth, db};

setPersistence(auth, inMemoryPersistence)