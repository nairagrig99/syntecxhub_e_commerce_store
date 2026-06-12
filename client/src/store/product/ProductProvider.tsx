import {type ReactNode, useReducer} from "react";
import {type ProductContextType} from "../../interface/product-context-type.ts";
import type {ProductStoreAction} from "../../interface/product-store-action.ts";
import {ProductAction} from "../../enums/product-action.ts";
import {ProductContext} from "./ProductContext.ts";
import {useApiRequest} from "../../hooks/useApiRequest.ts"
import {fetchRequest} from "../../services/fetch-request-server.ts";
import type {IProduct} from "../../interface/product-interface.ts";

const initialState: ProductContextType = {
    products: [],
    loading: false,
    error: null,
};

function productStateReducer(state: ProductContextType, action: ProductStoreAction): ProductContextType {
    switch (action.type) {
        case ProductAction.PRODUCT_REQUEST_START:
            return {...state, loading: true, error: null}
        case ProductAction.PRODUCT_REQUEST_FAILURE:
            return {...state, loading: false, error: action.payload}
        case ProductAction.GET_PRODUCTS_SUCCESS:
            return {...state, loading: false, products: action.payload}
        case ProductAction.ADD_PRODUCT_SUCCESS:
            return {...state, loading: false, products: [...state.products, action.payload]}
        case ProductAction.REMOVE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: state.products.filter((product) => product._id !== action.payload)
            }
        case ProductAction.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: state.products.map((product) => product._id === action.payload._id ? action.payload : product)
            }
        default:
            return state
    }
}

export default function ProductProvider({children}: { children: ReactNode }) {
    const [state, dispatch] = useReducer(productStateReducer, initialState);
    const api = useApiRequest()

    const removeProduct = async (id: string) => {
        const response = await fetchRequest(() => api.ApiProductsDelete(id))
        if (response.errorMessage) return
        dispatch({type: ProductAction.REMOVE_PRODUCT_SUCCESS, payload: id})
    }

    const addProduct = async (product: IProduct) => {
        console.log("product", product)
        const response = await fetchRequest(() => api.ApiProductsCreate(product))
        console.log("response", response)
        if (response.errorMessage) return
        dispatch({type: ProductAction.REMOVE_PRODUCT_SUCCESS, payload: response})
    }

    return <ProductContext.Provider
        value={{
            state,
            dispatch,
            removeProduct,
            addProduct
        }}>{children}</ProductContext.Provider>
}