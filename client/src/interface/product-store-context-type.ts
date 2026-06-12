import type {ProductContextType} from "./product-context-type.ts";
import type {ActionDispatch} from "react";
import type {ProductStoreAction} from "./product-store-action.ts";
import type {IProduct} from "./product-interface.ts";

export type ProductStoreContextType = {
    state: ProductContextType,
    removeProduct: (id: string) => void,
    addProduct: (product:IProduct) => void,
    dispatch: ActionDispatch<[action: ProductStoreAction]>
}