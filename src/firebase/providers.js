import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "./firebaseConfig";

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