import ProductTable from "../components/table/ProductTable.tsx";
import AddProduct from "../components/add-product/AddProduct.tsx";

export default function AdminProductPage() {

    return <>
        <AddProduct/>
        <ProductTable/>
    </>
}