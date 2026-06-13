import type {IProduct} from "./product-interface.ts";

export interface ProductContextType {
    products: IProduct[],
    loading: boolean,
    error: string | null
}
