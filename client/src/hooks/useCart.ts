import {useEffect, useState} from "react";
import type {CartItem} from "../interface/cart-interface.ts";
import useAuth from "../features/auth/hooks/useAuth.ts";
import {Quantity} from "../enums/quantity.ts";
import {fetchRequest} from "../services/fetch-request-server.ts";
import {useApiRequest} from "./useApiRequest.ts";
import type {IProduct} from "../interface/product-interface.ts";
export function useCart() {

    const [cart, setCart] = useState<CartItem[]>();
    const api = useApiRequest()
    const {state} = useAuth();

    useEffect(() => {
        (async () => {
            if (!state.token) return
            const data = await fetchRequest(() => api.ApiGetCartItems())
            setCart(data.items);
        })()
    }, [state.token])

    const setCartQty = async (product: string, mode: Quantity | string) => {

        const targetItem = cart?.find(item => item.product === product);
        if (!targetItem) return;

        let nextQty = 1;

        if (mode === Quantity.INCREMENT) {
            nextQty = targetItem.qty + 1;
        } else if (mode === Quantity.DECREMENT) {
            nextQty = targetItem.qty - 1;
            if (nextQty < 1) return;
        }

        try {
            const response = await fetchRequest(() => {
                return fetch('http://localhost:5000/cart/', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${state.token}`
                    },
                    body: JSON.stringify({
                        productID: product,
                        qty: nextQty
                    })
                })
            })

            if (response?.errorMessage) return

            setCart((prevCart) =>
                prevCart?.map((item) => {
                    return item.product === product ? {
                        ...item, qty: nextQty
                    } : item
                })
            )
        } catch (e) {
            console.error(e)
        }

    }

    const removeCartItem = async (product: string) => {
        await fetchRequest(() => api.ApiDeleteCartItems(product)).then((response) => {
            setCart(response.items)
        })
    }

    const addProduct = async (item: IProduct) => {
        return await fetchRequest(() => api.ApiProductsAddToCart(item))
    }

    return {cart, setCartQty, removeCartItem, addProduct}
}