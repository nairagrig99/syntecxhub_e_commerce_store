import {Navbar} from "../components/layout/Navbar/NavBar.tsx";
import {Outlet} from "react-router-dom";
import "../index.css";
import useAuth from "../features/auth/hooks/useAuth.ts";
import useProductContext from "../features/admin/hooks/useProductContext.tsx";
import {useEffect} from "react";
import {ProductAction} from "../enums/product-action.ts";
import {fetchRequest} from "../services/fetch-request-server.ts";
import {useApiRequest} from "../hooks/useApiRequest.ts";

export default function HomePage() {

    const {state} = useAuth();

    const useProduct = useProductContext();
    const api = useApiRequest();

    useEffect(() => {
        (async () => {
            const products = state.token && await fetchRequest(() => api.ApiProducts())
            if (!products || products.errorMessage) return
            useProduct.dispatch({type: ProductAction.GET_PRODUCTS_SUCCESS, payload: products})
        })()
    }, []);


    return <div>
        <header className="header">
            <Navbar/>
        </header>
        <main className="content">
            <Outlet/>
        </main>
    </div>
}