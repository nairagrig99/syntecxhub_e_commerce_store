import type {User} from "./core-store.ts";
import type {ActionEnum} from "../enums/action-enum.ts";

export type StoreAction =
    | { type: 'AUTH_START' }
    | { type: ActionEnum.LOGIN_SUCCESS; payload: { user: User; token: string } }
    | { type: ActionEnum.LOGIN_FAILURE; payload: string }
    | { type: ActionEnum.AUTH_FAILURE; payload: string }
    | { type: ActionEnum.LOGOUT };