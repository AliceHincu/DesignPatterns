import { useContext, useState, FormEvent } from "react";
import { TProduct } from "../../patterns/builder/ProductBuilder";
import { ProductContext, ProductContextType } from "../../context/ProductContext";
import { ProductType } from "./Product";

export const AddProduct = () => {
  const { saveProduct } = useContext(ProductContext) as ProductContextType;
  const [formData, setFormData] = useState<TProduct | {}>();
  const handleForm = (e: FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };
  const handleSaveProduct = (e: FormEvent, formData: TProduct | any) => {
    e.preventDefault();
    var select = document.getElementById("selectedProduct") as HTMLSelectElement;
    if (select) {
      var selectedType = select.options[select.selectedIndex].value as ProductType;
      saveProduct(formData, selectedType);
    }

    saveProduct(formData, ProductType.FOOD);
  };
  return (
    <form className="Form" onSubmit={(e) => handleSaveProduct(e, formData)}>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input onChange={handleForm} type="text" id="name" />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input onChange={handleForm} type="number" id="price" />
        </div>
        <label>
          Pick type of product:
          <select id="selectedProduct" name="selectedProduct" defaultValue="food">
            <option value={ProductType.FOOD}>{ProductType.FOOD}</option>
            <option value={ProductType.CLOTHES}>{ProductType.CLOTHES}</option>
          </select>
        </label>
      </div>
      <button disabled={formData === undefined ? true : false}>Add Product</button>
    </form>
  );
};
