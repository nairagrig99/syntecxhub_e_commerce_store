import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useAuth from "../features/auth/hooks/useAuth.ts";
import type {IProduct} from "../interface/product-interface.ts";
import styles from "../features/cart/product/ProductGrid.module.scss";
import {fetchRequest} from "../services/fetch-request-server.ts";
import {useApiRequest} from "../hooks/useApiRequest.ts";
import {API_BASE_URL} from "../constants/constant.ts";
import {useCart} from "../hooks/useCart.ts";
import '../index.css'

export default function ProductDetail() {

    const {id} = useParams()
    const api = useApiRequest();
    const {state} = useAuth()
    const useCartProduct = useCart()
    const [product, setProduct] = useState<IProduct>()

    useEffect(() => {
        (async () => {
            const productById = state.token && id && await fetchRequest(() => api.ApiProductsById(id));
            if (!productById && productById.errorMessage) return;
            setProduct(productById.product)
        })()
    }, [state, id]);


    return product && <div className="">

            <div className={styles.product_flex}>
                <div className={styles.product_imagewrapper}>
                    <img src={`${API_BASE_URL}${product.image}`} className='' alt="Product image"/>
                </div>
                <div className={styles.product_info}>
                    <h3 className={styles.product_name}>{product.title}</h3>
                    <p className={styles.description}>{product.description}</p>
                    <p className={styles.product_price}>${product.price}</p>
                    <button className="button" onClick={() => useCartProduct.addProduct(product)}> Add product</button>
                </div>
            </div>


    </div>
}