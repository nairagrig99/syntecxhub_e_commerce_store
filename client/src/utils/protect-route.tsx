import {Navigate, useNavigate} from "react-router-dom";
import {type ReactNode, useEffect} from "react";
import useAuth from "../features/auth/hooks/useAuth.ts";

type ProtectedRouteProps = {
    children: ReactNode,
    allowedRole?: string[]
};
export default function ProtectedRoute({children, allowedRole}: ProtectedRouteProps) {

    const {state} = useAuth();
    const navigation = useNavigate();

    useEffect(() => {

        if (state.isLoading) return;

        if (state.user === null) {
            navigation('/auth/login', {replace: true})
        }
    }, [state, state.user, state.isLoading, navigation]);

    if (state.isLoading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <h3>Loading ...</h3>
            </div>
        )
    }


    if (allowedRole && state.user && !allowedRole[0].includes(state.user.role)) {
        return <Navigate to="/" replace/>;
    }

    return children;
}