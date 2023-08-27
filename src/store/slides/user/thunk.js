import { doc, getDoc } from "firebase/firestore";
import { firebaseDB } from "../../../firebase/firebaseConfig";
import { login } from "./user";

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
            localStorage.setItem("infoUser", JSON.stringify(infoUser))
            dispatch(login(infoUser))
        } catch (error) {
            return error
        }
    }
}