import {createContext} from "react";
import type {ProductStoreContextType} from "../../interface/product-store-context-type.ts";

export const ProductContext = createContext<ProductStoreContextType | undefined>(undefined);