import {useContext} from "react";
import {AuthContext} from "../../../store/auth/AuthContextState.ts";


export default function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('Something went wrong')
    }


    return context
}