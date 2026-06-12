import styles from "./Navbar.module.scss";
import {NavLink} from "react-router-dom";
import {ActionEnum} from "../../../enums/action-enum.ts";
import useAuth from "../../../features/auth/hooks/useAuth.ts";

export function Navbar() {
    const {state, dispatch} = useAuth()
    const logOut = () => {
        localStorage.removeItem("_token")
        dispatch({type: ActionEnum.LOGOUT})
    }

    return (
        <nav className={styles.navbar}>
            <div className={`${styles.navLinks}`}>
                <NavLink to="/" className={({isActive}) => isActive ? styles.active : ''}>Home</NavLink>
                <NavLink to="/cart" className={({isActive}) => isActive ? styles.active : ''}>Cart</NavLink>
                {state.user?.role === 'admin' &&
                    (<NavLink to="/admin" className={({isActive}) => isActive ? styles.active : ''}>Admin</NavLink>)}
            </div>
            <div className={styles.desktopCta}>
                <a href="/auth/login" className={styles.btnGetStarted} onClick={logOut}>Logout </a>
            </div>
        </nav>
    );
}