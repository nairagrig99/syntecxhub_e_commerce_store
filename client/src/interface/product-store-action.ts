import {ProductAction} from "../enums/product-action.ts";
import type {IProduct} from "./product-interface.ts";

export type ProductStoreAction =
    | { type: ProductAction.PRODUCT_REQUEST_START }
    | { type: ProductAction.PRODUCT_REQUEST_FAILURE; payload: string }
    | { type: ProductAction.GET_PRODUCTS_SUCCESS; payload: IProduct[] }
    | { type: ProductAction.ADD_PRODUCT_SUCCESS; payload: IProduct }
    | { type: ProductAction.REMOVE_PRODUCT_SUCCESS; payload: string }
    | { type: ProductAction.UPDATE_PRODUCT_SUCCESS; payload: IProduct }