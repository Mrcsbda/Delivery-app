import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "./firebaseConfig";

const googleProvider = new GoogleAuthProvider;

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(firebaseAuth, googleProvider)
        const { displayName, email, photoURL, uid } = result.user;
        const infoUser = {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
        return infoUser
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const loginWithEmailAndPassword = async (email, password) => {
    try {
        const resp = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const { uid } = resp.user
        return {
            ok: true,
            uid
        }
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const registerUserWithEmailPassword = async ({ name, email, password }) => {
    try {
        const resp = await createUserWithEmailAndPassword(firebaseAuth, email, password)
        const { uid } = resp.user;
        const infoUser = {
            ok: true,
            email,
            name,
            uid
        }
        return infoUser
    } catch (error) {
        console.log(error)
        return { ok: false, errorMessage: error.message }
    }
}