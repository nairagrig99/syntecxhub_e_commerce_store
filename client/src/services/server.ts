import type {FormType} from "../interface/register-form-itype.ts";
import type {IProduct} from "../interface/product-interface.ts";

export async function ApiRegister(form: FormType) {
    try {
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        })

        if (!response.ok) {
            const error = await response.json()
            throw Error(error.message);
        }

        return await response.json();
    } catch (err) {
        return {errorMessage: err}
    }
}

export async function ApiLogin(form: FormType) {
    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        })

        if (!response.ok) {
            const error = await response.json()
            throw Error(error.message);
        }
        return await response.json();

    } catch (err) {
        return {errorMessage: err}
    }
}

export async function ApiProducts(token: string) {
    try {
        const response = await fetch('http://localhost:5000/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            const error = await response.json()
            throw Error(error.message);
        }

        return await response.json();

    } catch (err) {
        return {errorMessage: err}
    }
}

export async function ApiProductsAddToCart(token: string, product: IProduct) {
    try {
        const response = await fetch('http://localhost:5000/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(product)
        })

        if (!response.ok) {
            const error = await response.json()
            throw Error(error.message);
        }

        return await response.json();

    } catch (err) {
        return {errorMessage: err}
    }
}

export async function ApiProductsById(token: string, id: string) {
    try {
        const response = await fetch(`http://localhost:5000/products/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            const error = await response.json()
            throw Error(error.message);
        }

        return await response.json();

    } catch (err) {
        return {errorMessage: err}
    }
}

