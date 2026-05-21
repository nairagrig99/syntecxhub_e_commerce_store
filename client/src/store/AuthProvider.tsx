import {createContext, type ReactNode, useEffect, useReducer} from "react";
import {ActionEnum} from "../enums/action-enum.ts";
import type {CoreStore} from "../interface/core-store.ts";
import type {StoreAction} from "../interface/store-action.ts";
import type {CoreStoreContextType} from "../interface/core-store-context-type.ts";

const initialState: CoreStore = {
    user: null,
    token: null,
    isLoading: true,
    error: null,
};

function stateReducer(state: CoreStore, action: StoreAction): CoreStore {
    switch (action.type) {
        case ActionEnum.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload.user,
                token: action.payload.token,
                error: null
            }
        case ActionEnum.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                user: null,
                token: null,
                error: null
            }
        case ActionEnum.AUTH_FAILURE:
            return {
                isLoading: false,
                user: null,
                token: null,
                error: action.payload,
            }
        case ActionEnum.LOGOUT:
            return {
                isLoading: false,
                user: null,
                token: null,
                error: null
            }
        default:
            return state
    }
}

export const AuthContext = createContext<CoreStoreContextType | undefined>(undefined);

export default function AuthProvider({children}: { children: ReactNode }) {
    const [state, dispatch] = useReducer(stateReducer, initialState);

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('_token');
            if (!token) return;
            try {
                const response = await fetch('http://localhost:5000/auth/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    dispatch({type: ActionEnum.LOGIN_SUCCESS, payload: {user: data.user, token: data.token}})
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error("Network error", error);
            }

        })();
    }, []);

    // console.log('state', state);
    return <AuthContext.Provider value={{state, dispatch}}>{children}</AuthContext.Provider>
}