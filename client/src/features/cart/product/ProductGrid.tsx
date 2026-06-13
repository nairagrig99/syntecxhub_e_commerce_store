import styles from './ProductGrid.module.scss'
import '../../../index.css';
import {useEffect, useState} from "react";
import type {IProduct} from "../../../interface/product-interface.ts";
import {Link} from "react-router-dom";
import useProductContext from "../../admin/hooks/useProductContext.tsx";
import {API_BASE_URL} from "../../../constants/constant.ts";
import {useCart} from "../../../hooks/useCart.ts";

export default function ProductGrid() {
    const useProduct = useProductContext();

    const [products, setProducts] = useState<IProduct[]>([]);
    const useCartProduct = useCart();

    useEffect(() => {
        setProducts([...useProduct.state.products])
    }, [useProduct.state]);


    return <div className={styles.product_grid}>
        {products.length && products.map((product) => (
            <div className={styles.product_card} key={product._id}>
                <Link to={`/products/${product._id}`}>
                    <div className={styles.product_imagewrapper}>
                        <img src={`${API_BASE_URL}${product.image}`} className='' alt="Product Image"/>
                    </div>
                    <div className={styles.product_info}>
                        <p className={styles.product_name}>{product.title}</p>
                        <p className={styles.product_price}>${product.price}.00</p>
                    </div>
                </Link>
                <button className="button"  onClick={() => useCartProduct.addProduct(product)}>

                    Add to cart
                </button>
            </div>
        ))
        }
    </div>
}