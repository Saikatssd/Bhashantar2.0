// const {
//     getAuth,
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     signOut,
//     sendEmailVerification,
//     sendPasswordResetEmail

// } = require("firebase/auth");

// module.exports = {
//     getAuth,
//     signInWithEmailAndPassword,
//     createUserWithEmailAndPassword,
//     signOut,
//     sendEmailVerification,
//     sendPasswordResetEmail,
//     admin
// };


import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";

export const handleSignUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Handle successful signup (e.g., navigate to a different page)
    } catch (error) {
        // Handle signup errors
    }
};


export const handleSignIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Handle successful signin (e.g., update user state)
    } catch (error) {
        // Handle signin errors
    }
};

export const handleSignOut = async () => {
    await signOut(auth);
    // Handle successful signout (e.g., reset user state)
};


export const handleSendVerificationEmail = async () => {
    const user = auth.currentUser;
    if (user) {
        await sendEmailVerification(user);
        // Inform user that verification email has been sent
    }
};

export const handleSendPasswordResetEmail = async (email) => {
    await sendPasswordResetEmail(auth, email);
    // Inform user that password reset email has been sent
};


