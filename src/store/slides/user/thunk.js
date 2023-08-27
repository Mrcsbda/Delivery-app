import { collection, doc, getDoc, addDoc, setDoc } from "firebase/firestore";
import { firebaseDB } from "../../../firebase/firebaseConfig";
import { login } from "./user";
import { signInWithGoogle } from "../../../firebase/providers";

export const getUser = (key) => {
    return async (dispatch) => {
        try {
            const userData = await getUserById(key)
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
                    avatar: resp.photoURL,
                    createdAt: new Date().getTime(),
                    email: resp.email,
                    loginMethod: "GOOGLE",
                    name: resp.displayName,
                    role: "CLIENT",
                    updatedAt: new Date().getTime(),
                }
                dispatch(login({ key: resp.uid, userRole: userInfo.role, address: "" }))
                const userData = await getUserById(resp.uid)
                !userData && await setDoc(doc(firebaseDB, "users", resp.uid), userInfo)
            }
        } catch (error) {
            return error
        }
    }
}

const getUserById = async(id) => {
    const userRef = doc(firebaseDB, `users`, id);
    const userSnapshot = await getDoc(userRef);
    return  userSnapshot.data();
}