import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyApdce8TMmnIUkamZiRmlNM409NJRZzs24",
    authDomain: "kyrotics.firebaseapp.com",
    projectId: "kyrotics",
    storageBucket: "kyrotics.appspot.com",
    messagingSenderId: "576941623096",
    appId: "1:576941623096:web:2452601bf4299a66c923cd",

};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export default firebase;
