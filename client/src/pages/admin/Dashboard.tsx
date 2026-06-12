import styles from "./Dashboard.module.scss"
import LeftSideMenu from "../../features/admin/components/menu/LeftSideMenu.tsx";
import {Outlet} from "react-router-dom";

export default function Dashboard() {



    return <div className={styles.main_dashboard}>
        {/*left side menu*/}
        <LeftSideMenu/>
        {/*Content */}
        <div className={styles.right_side_content}>
            <Outlet/>
        </div>
    </div>
}