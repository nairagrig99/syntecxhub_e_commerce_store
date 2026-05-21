import {useContext} from "react";
import {AuthContext} from "../../../store/AuthProvider.tsx";

export default function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('Something went wrong')
    }
    return context
}