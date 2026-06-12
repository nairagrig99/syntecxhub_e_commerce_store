import styles from "./AddProduct.module.scss";
import Modal from "../../../../components/ui/Modal.tsx";
import {useState} from "react";
import type {IProduct} from "../../../../interface/product-interface.ts";
import useProductContext from "../../hooks/useProductContext.tsx";

export default function AddProduct() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {addProduct} = useProductContext()

    const [form, setForm] = useState<IProduct>({
        title: '',
        description: '',
        price: 1,
        countInStock: 1,
        image: ''
    });
    const createProduct = () => {
        setIsOpen(!isOpen)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        addProduct(formData)
    }

    return <div className={styles.add_product}>
        <h3 className={styles.text_heading}>Add product for sale</h3>
        <button onClick={createProduct} className={styles.button}>Add product +</button>

        <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(!isOpen)}
            title="Add Product"
        >
            <form onSubmit={onSubmit}>
                <input type="text" name='title' placeholder="Title" value={form.title} onChange={handleChange}/>
                <textarea name='description' placeholder="Description" value={form.description}
                          onChange={handleChange}/>
                <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange}/>
                <input type="number" name="countInStock" placeholder="Count in stock" value={form.countInStock}
                       onChange={handleChange}/>
                <input type="file" name="image" placeholder="Image" value={form.image} onChange={handleChange}/>
                <div className={styles.button_form}>
                    <input type="submit" value='Create'/>
                    <input type="button" value="Close"/>
                </div>
            </form>

        </Modal>
    </div>
}