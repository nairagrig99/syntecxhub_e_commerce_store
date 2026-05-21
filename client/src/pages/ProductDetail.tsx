import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ApiProductsById} from "../services/server.ts";
import useAuth from "../features/auth/hooks/useAuth.ts";
import type {IProduct} from "../interface/product-interface.ts";
import styles from "../features/cart/ProductGrid.module.scss";

export default function ProductDetail() {

    const {id} = useParams()
    const {state} = useAuth()
    const [product, setProduct] = useState<IProduct>()

    useEffect(() => {
        (async () => {
            const productById = state.token && id && await ApiProductsById(state.token, id);
            if (!productById && productById.errorMessage) return;
            setProduct(productById.product)
        })()
    }, [state, id]);

    console.log("product", product);

    return product && <div className="">
        <div className={styles.product_flex} style={{display: 'flex'}}>
            <div className={styles.product_imagewrapper}>
                <img src={product.image} className='' alt="Shoes"/>
            </div>
            <div className={styles.product_info}>
                <p className={styles.product_name}>{product.title}</p>
                <p className={styles.product_price}>${product.price}</p>
            </div>
        </div>
    </div>
}