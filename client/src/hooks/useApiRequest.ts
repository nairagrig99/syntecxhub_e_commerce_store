import type {FormType} from "../interface/register-form-itype.ts";
import type {IProduct} from "../interface/product-interface.ts";
import useAuth from "../features/auth/hooks/useAuth.ts";

export function useApiRequest() {
    const {state} = useAuth();

    async function ApiRegister(form: FormType) {
        return await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        })
    }

    async function ApiLogin(form: FormType) {
        return await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        })
    }

    async function ApiProducts() {
        return await fetch('http://localhost:5000/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            }
        })
    }

    async function ApiProductsDelete(productID: string) {
        return await fetch(`http://localhost:5000/product/${productID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            }
        })
    }

    async function ApiProductsAddToCart(product: IProduct) {
        return await fetch('http://localhost:5000/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify(product)
        })
    }

    async function ApiProductsById(id: string) {
        return await fetch(`http://localhost:5000/products/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            }
        })
    }

    async function ApiProductsCreate(product: IProduct) {
        return await fetch(`http://localhost:5000/products`, {
            method: 'POST',
            body: product
        })
    }

    async function ApiGetCartItems() {
        return await fetch(`http://localhost:5000/cart`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            }
        })
    }

    async function ApiDeleteCartItems(productID: string) {
        return await fetch(`http://localhost:5000/cart/${productID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            }
        })
    }

    return {
        ApiProducts,
        ApiLogin,
        ApiRegister,
        ApiDeleteCartItems,
        ApiProductsCreate,
        ApiGetCartItems,
        ApiProductsById,
        ApiProductsAddToCart,
        ApiProductsDelete
    }
}