import { initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';



const firebaseConfig = {
// apiKey: process.env.REACT_APP_API_KEY_URL,
// authDomain: process.env.REACT_APP_AUTH_DOMAIN,
// projectId: process.env.REACT_APP_PROJECT_ID,
// storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
// messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// appId: process.env.REACT_APP_APP_ID

apiKey: "AIzaSyCFYrUzMcOqbSiLPh4UqvQY_FW6yy6HBa4",
authDomain: "keydfile.firebaseapp.com",
projectId: "keydfile",
storageBucket: "keydfile.appspot.com",
messagingSenderId: "109167415198",
appId: "1:109167415198:web:dbf658339be680b280908f",
measurementId: "G-3NHNEF0TVS"


};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app,"keydfile.appspot.com")
 
export default storage