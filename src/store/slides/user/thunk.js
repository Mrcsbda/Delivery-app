import { doc, getDoc } from "firebase/firestore";
import { firebaseDB } from "../../../firebase/firebaseConfig";
import { login } from "./user";
import { signInWithGoogle } from "../../../firebase/providers";

export const getUser = (key) => {
    return async (dispatch) => {
        try {
            const userRef = doc(firebaseDB, `users`, key);
            const userSnapshot = await getDoc(userRef);
            const userData = userSnapshot.data();
            const infoUser = {
                key,
                userRole: userData.role,
                address: userData.address
            }
            dispatch(login(infoUser))
        } catch (error) {
            return error
        }
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        try {
            const resp = await signInWithGoogle()
            if (resp) {
                const userInfo = {
                    key: resp.uid,
                    userRole: "CLIENT",
                    address: ""
                }
                dispatch(login(userInfo))
                console.log(resp)
            }
        } catch (error) {
            return error
        }
    }
}