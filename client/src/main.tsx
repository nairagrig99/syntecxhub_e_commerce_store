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
import AuthProvider from "./store/auth/AuthProvider.tsx";
import CartPage from "./pages/CartPage.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import ProductGrid from "./features/cart/product/ProductGrid.tsx";
import ErrorPage from "./components/ui/ErrorPage.tsx";
import AdminProductPage from "./features/admin/page/AdminProductPage.tsx";
import AdminOrderPage from "./features/admin/page/AdminOrderPage.tsx";
import AdminUserPage from "./features/admin/page/AdminUserPage.tsx";
import ProductProvider from "./store/product/ProductProvider.tsx";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute>
            <HomePage/>
        </ProtectedRoute>,
        children: [
            {index: true, element: <ProductGrid/>},
            {path: '/products/:id', element: <ProductDetail/>},
            {path: '/cart', element: <CartPage/>},
            {
                path: "/admin",
                element: <ProtectedRoute allowedRole={['admin']}>
                    <Dashboard/>
                </ProtectedRoute>,
                children: [
                    {index: true, element: <AdminProductPage/>},
                    {path: '/admin/order', element: <AdminOrderPage/>},
                    {path: '/admin/user', element: <AdminUserPage/>}
                ]
            }
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
        path: '*',
        element: <ErrorPage/>
    }
])


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <ProductProvider>
                <RouterProvider router={routes}/>
            </ProductProvider>
        </AuthProvider>
    </StrictMode>,
)
