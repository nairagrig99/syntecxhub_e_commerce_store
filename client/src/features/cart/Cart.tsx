import {useEffect, useState} from "react";
import useAuth from "../auth/hooks/useAuth.ts";

export default function Cart() {
    const [cart, setCart] = useState()
    const {state} = useAuth()
    useEffect(() => {
        (async () => {
            const cart = await fetch('http://localhost:5000/cart', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.token}`
                }
            })
            const data = await cart.json()
            setCart(data)
        })()
    }, [])

    console.log("cart", cart)
    return <>
        <h1>helo</h1>
    </>
}