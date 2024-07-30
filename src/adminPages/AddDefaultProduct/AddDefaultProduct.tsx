import AddDefaultProductForm from "./AddDefaultProductForm"

const AddDefaultProduct = () => {
    return <section className="add-default-product">
        <div className="add-default-product__card">
            <h1 className="heading center add-default-product__heading"> 
                Add new default product!
            </h1>
            <AddDefaultProductForm />
        </div>
    </section>
}

export default AddDefaultProduct
