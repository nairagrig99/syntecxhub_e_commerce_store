import {createContext} from "react";
import type {CoreStoreContextType} from "../../interface/core-store-context-type.ts";

export const AuthContext = createContext<CoreStoreContextType | undefined>(undefined);