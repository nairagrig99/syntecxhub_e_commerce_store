import {useNavigate} from "react-router-dom";
import {type PropsWithChildren, useEffect} from "react";
import useAuth from "../features/auth/hooks/useAuth.ts";

type ProtectedRouteProps = PropsWithChildren;
export default function ProtectedRoute({children}: ProtectedRouteProps) {

    const user = useAuth();
    const navigation = useNavigate();

    useEffect(() => {
        if (user.user === null) {
            navigation('/auth/login', {replace: true})
        }
    }, [user, navigation]);

    return children;
}