import useProductContext from "../../hooks/useProductContext.tsx";
import styles from "./ProductTable.module.scss";
import type {IProduct} from "../../../../interface/product-interface.ts";
import {useEffect} from "react";
import {API_BASE_URL} from "../../../../constants/constant.ts";

export default function ProductTable() {
    const {state, removeProduct} = useProductContext();

    useEffect(() => {
        console.log(state);
    }, []);
    const onEdit = (product: IProduct) => {
        console.log("Editing:", product);
    };

    const onDelete = (id: string) => {
        console.log("Deleting ID:", id);
        return removeProduct(id);
    };


    return (

        <div className={styles.tableContainer}>

            <table className={styles.mainTable}>
                <thead>
                <tr>
                    <th style={{width: '15%'}}>Image</th>
                    <th style={{width: '25%'}}>Title</th>
                    <th style={{width: '35%'}}>Description</th>
                    <th style={{width: '10%'}}>Price</th>
                    <th style={{width: '15%', textAlign: 'center'}}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {state.products.length === 0 ? (
                    <tr>
                        <td colSpan={5} className={styles.emptyCell}>
                            No products found.
                        </td>
                    </tr>
                ) : (
                    state.products.map((product, index) => (
                        <tr key={product._id || index}>
                            <td>
                                <img
                                    src={`${API_BASE_URL}${product.image}`}
                                    alt={product.title}
                                    className={styles.productImage}
                                />
                            </td>

                            <td style={{fontWeight: '600'}}>
                                {product.title}
                            </td>

                            <td className={[styles.td, styles.truncate].join(' ')}>
                                {product.description}
                            </td>

                            <td style={{color: '#10b981', fontWeight: 'bold'}}>
                                ${product.price.toFixed(2)}
                            </td>

                            <td>
                                <div className={styles.actionGroup}>
                                    <button
                                        onClick={() => onEdit(product)}
                                        className={styles.editBtn}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(product._id || '')}
                                        className={styles.deleteBtn}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}