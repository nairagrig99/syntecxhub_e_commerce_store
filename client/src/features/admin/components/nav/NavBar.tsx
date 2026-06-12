import {Link} from "react-router-dom";
import styles from "./NavBar.module.scss"
export default function NavBar() {
    return <nav className={styles.navbar}>
        <Link to="/admin">Product</Link>
        <Link to="/admin/order">Order</Link>
        <Link to="/admin/user">User</Link>
    </nav>
}