import {useEffect, useState} from "react";
import useWindowSize from "../../hooks/useWindowSize.ts";
import NavBar from "../nav/NavBar.tsx";
import style from "./LeftSideMenu.module.scss"

export default function LeftSideMenu() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {width} = useWindowSize()

    useEffect(() => {
        setIsOpen(width);
    }, [width]);

    return <div
        className={`${style.left_side_menu}
        ${isOpen ? 'w-10' : 'w-full  z-20 sm:w-64 sm:z-0'}`}>
        {/*<MobileMenuTicket isOpen={isOpen} setIsOpen={setIsOpen}/>*/}
        <div className={`${style.flex_container} ${isOpen ? 'hidden' : 'visible'}`}>
            <NavBar/>
        </div>
    </div>
}