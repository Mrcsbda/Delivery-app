import { doc, getDoc } from "firebase/firestore";
import { firebaseDB } from "../../../../firebase/firebaseConfig";
import { login } from "./user";

export const getUser = (key) => {
    return async (dispatch) => {
        try {
            console.log("estoy en el thunk")
            const userRef = doc(firebaseDB, `users`, key);
            const userSnapshot = await getDoc(userRef);
            const userData = userSnapshot.data();
            const infoUser = {
                key,
                useRole: userData.role,
                address: userData.address
            }
            dispatch(login(infoUser))
            console.log(userData);
        } catch (error) {

        }
    }
}