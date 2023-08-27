import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "./firebaseConfig";

const googleProvider = new GoogleAuthProvider;

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(firebaseAuth, googleProvider)
        const { displayName, email, photoURL, uid} = result.user;
        console.log(result.user)
        const infoUser = {
            result: true,
            displayName,
            email,
            photoURL,
            uid
        }
        return infoUser
    } catch (error) {
        return false
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
        console.log(error);
        return { ok: false, errorMessage: error.message }
    }
}
