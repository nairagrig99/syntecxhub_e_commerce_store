import type {CoreStore} from "./core-store.ts";
import type {Dispatch} from "react";
import type {StoreAction} from "./store-action.ts";

export type CoreStoreContextType = {
    state: CoreStore,
    dispatch: Dispatch<StoreAction>
}