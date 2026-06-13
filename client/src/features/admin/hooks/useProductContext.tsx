import {useContext} from "react";
import {ProductContext} from "../../../store/product/ProductContext.ts";

export default function useProductContext() {
    const context = useContext(ProductContext);

    if (context === undefined) {
        throw new Error('Something went wrong')
    }

    return context
}