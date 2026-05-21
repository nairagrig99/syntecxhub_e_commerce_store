import styles from './ProductGrid.module.scss'
import {useEffect, useState} from "react";
import {ApiProducts, ApiProductsAddToCart} from "../../services/server.ts";
import useAuth from "../auth/hooks/useAuth.ts";
import type {IProduct} from "../../interface/product-interface.ts";
import {Link} from "react-router-dom";

export default function ProductGrid() {
    const {state} = useAuth();
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        (async () => {
            const products = state.token && await ApiProducts(state.token)
            if (!products || products.errorMessage) return
            setProducts([...products])
        })()
    }, [state]);

    console.log("products", products);
    const create = async () => {
        const products = {
            "title": "High-Precision Wireless Mouse",
            "description": "Ergonomic productivity mouse featuring an adjustable 8000 DPI optical sensor, silent clicks, and hyper-fast horizontal and vertical scrolling controls.",
            "image": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500",
            "price": 79.99,
            "countInStock": 60,
            "rating": 4.5,
            "numReviews": 53
        }
        // state.token && await ApiProductsAdd(state.token, products)
    }

    const addToCart = async (item) => {
        const response = state.token && await ApiProductsAddToCart(state.token, item);
        console.log("response",response)
    }

    return <div className={styles.product_grid}>
        {products.length && products.map((product) => (
            <div className={styles.product_card}  key={product._id}>
                <Link to={`/products/${product._id}`}>
                    <div className={styles.product_imagewrapper}>
                        <img src={product.image} className='' alt="Shoes"/>
                    </div>
                    <div className={styles.product_info}>
                        <p className={styles.product_name}>{product.title}</p>
                        <p className={styles.product_price}>${product.price}</p>
                    </div>
                </Link>
                <button className={styles["product_flex_add_product"]} onClick={() => addToCart(product)}>Add to cart
                </button>
            </div>

        ))
        }
    </div>
}