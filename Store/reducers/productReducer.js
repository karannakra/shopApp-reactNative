import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import { DELETE_PRODUCT, ADD_OR_EDIT_PRO } from "../actions/productAction";
const initialState = {
  availableProduct: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};
export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProduct: state.availableProduct.filter(
          (prod) => prod.id !== action.pid
        ),
        userProducts: state.userProducts.filter(
          (prod) => prod.id !== action.pid
        ),
      };
    case ADD_OR_EDIT_PRO: {
      console.log('inside')
      const isProdAv = state.availableProduct.find(
        (prod) => prod.id == action.prodId
      );
      let editedOrNewProd;
      if (isProdAv) {
        editedOrNewProd = new Product(
          isProdAv.id,
          isProdAv.ownerId,
          action.product.title,
          action.product.imageUrl,
          action.product.description
        );
        state.availableProduct = state.availableProduct.filter(
          (prod) => prod.id !== action.prodId
        );
      } else {
        editedOrNewProd = new Product(
          action.product.id,
          "u1",
          action.product.title,
          action.product.imageUrl,
          action.product.description
        );
      }
      return {
        ...state,
        availableProduct: state.availableProduct.concat(editedOrNewProd),
      };
    }
    default:
      return state;
  }
};
