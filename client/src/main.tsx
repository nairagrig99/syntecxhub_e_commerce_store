import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/Home.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import Register from "./features/auth/compoentns/Register.tsx";
import AuthPage from "./pages/Login.tsx";
import ProtectedRoute from "./utils/protect-route.tsx";
import Login from "./features/auth/compoentns/Login.tsx";
import AuthProvider from "./store/AuthProvider.tsx";
import CartPage from "./pages/CartPage.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import ProductGrid from "./features/cart/ProductGrid.tsx";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute>
            <HomePage/>
        </ProtectedRoute>,
        children: [

            {path: '/products', element: <ProductGrid/>},
            {path: '/products/:id', element: <ProductDetail/>},
            {path: '/cart', element: <CartPage/>},
        ]
    },
    {
        path: "/auth",
        element: <AuthPage/>,
        children: [
            {index: true, element: <Login/>},
            {path: '/auth/login', element: <Login/>},
            {path: '/auth/register', element: <Register/>}
        ]
    },
    {
        path: "/admin",
        element: <Dashboard/>
    }
])


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={routes}/>
        </AuthProvider>
    </StrictMode>,
)
