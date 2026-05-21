import {Navbar} from "../components/layout/Navbar/NavBar.tsx";
import {Outlet} from "react-router-dom";

export default function HomePage() {
    return <div>
        <header>
            <Navbar/>
        </header>

        <main>
            <Outlet/>
        </main>
    </div>
}