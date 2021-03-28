import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBTxAOZJx56d3i9hCiD5ZcYpnp4cvfady4",
    authDomain: "fir-project-d9b09.firebaseapp.com",
    projectId: "fir-project-d9b09",
    storageBucket: "fir-project-d9b09.appspot.com",
    messagingSenderId: "74333153272",
    appId: "1:74333153272:web:ebfbec43f8b31327d1980d"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { db, storage, auth };
export default firebase;