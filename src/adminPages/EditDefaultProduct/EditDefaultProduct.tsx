import EditDefaultProductForm from "./EditDefaultProductForm"

const EditDefaultProduct = () => {
    return <section className="edit-default-product">
        <div className="edit-default-product__card">
            <h1 className="edit-default-product__heading"> 
                Edit this product
            </h1>
            <EditDefaultProductForm />
        </div>
    </section>
}

export default EditDefaultProduct
