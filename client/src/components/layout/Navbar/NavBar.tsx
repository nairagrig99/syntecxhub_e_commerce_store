import styles from "./Navbar.module.scss";
import {NavLink} from "react-router-dom";
import {ActionEnum} from "../../../enums/action-enum.ts";
import useAuth from "../../../features/auth/hooks/useAuth.ts";

export function Navbar() {
    const {dispatch} = useAuth()
    const logOut = () => {
        localStorage.removeItem("_token")
        dispatch({type: ActionEnum.LOGOUT})
    }

    return (
        <nav className={styles.navbar}>
            <div className={`${styles.navLinks}`}>
                <NavLink to="/" className={({isActive}) => isActive ? styles.active : ''}>Home</NavLink>
                <NavLink to="/products" className={({isActive}) => isActive ? styles.active : ''}>Products</NavLink>
                <NavLink to="/cart" className={({isActive}) => isActive ? styles.active : ''}>Cart</NavLink>
            </div>
            <div className={styles.desktopCta}>
                <a href="/auth/login" className={styles.btnGetStarted} onClick={logOut}>Logout </a>
            </div>
        </nav>
    );
}