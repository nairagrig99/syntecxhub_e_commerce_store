import styles from './Cart.module.scss'
import {RemoveSvg} from "../../../components/ui/RemoveSvg.tsx";
import {useCart} from "../../../hooks/useCart.ts";
import {Quantity} from "../../../enums/quantity.ts";

export default function Cart() {
    const useCartHook = useCart()

    const incrementQTY = async (product: string) => {
        await useCartHook.setCartQty(product, Quantity.INCREMENT)
    }

    const decrementQTY = async (product: string) => {
        await useCartHook.setCartQty(product, Quantity.DECREMENT)
    }

    return <div className={styles.cart_content}>
        {useCartHook.cart && useCartHook.cart.map((item) =>
            (
                <div key={item._id} className={styles.cart_item}>

                    <img src={item.image} alt="" className={styles.cart_image}/>

                    <div>
                        <p className={styles.product_name}>{item.title}</p>
                        <p>{item.price}$</p>
                    </div>
                    <div className={styles.quantity_block}>
                        <button onClick={() => incrementQTY(item.product)} className={styles.cart_btn}>+
                        </button>
                        <input type="number"
                               value={item.qty}
                               readOnly
                               className={styles.quantity}/>
                        <button onClick={() => decrementQTY(item.product)} className={styles.cart_btn}>-
                        </button>
                    </div>
                    <RemoveSvg onClick={async () => useCartHook.removeCartItem(item.product)}/>
                </div>
            )
        )}
    </div>
}