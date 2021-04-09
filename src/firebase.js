import firebase from "firebase";
import firebaseConfig from './firebase-config'

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { db, storage, auth };
export default firebase;