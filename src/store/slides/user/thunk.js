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
                    address: "",
                    avatar: resp.photoURL,
                    birthday: "",
                    createdAt: new Date().getTime(),
                    email: resp.email,
                    loginMethod: "GOOGLE",
                    name: resp.displayName,
                    phone: "",
                    role: "CLIENT",
                    updatedAt: new Date().getTime(),
                }
                dispatch(login({ key: resp.uid, userRole: userInfo.role, address: userInfo.address }))
                console.log(userInfo)
            }
        } catch (error) {
            return error
        }
    }
}