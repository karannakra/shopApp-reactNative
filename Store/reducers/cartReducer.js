import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cartActions";
import { ADD_ORDER } from "../actions/orderActions";
import {DELETE_PRODUCT} from "../actions/productAction";
import CartItem from "../../models/Cart-item";
const initialState = {
  items: {},
  totalAmount: 0,
};
export default (state = initialState, actions) => {
  switch (actions.type) {
    case ADD_TO_CART: {
      const addedProduct = actions.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      let updatedOrNewCartItem;
      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
      };
    }
    case REMOVE_FROM_CART: {
      const selectedCartItem = state.items[actions.id];
      const currQuantity = selectedCartItem.quantity;
      let updatedCartItems;
      if (currQuantity > 1) {
        const updatedCartItem = new CartItem(
          currQuantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [actions.id]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[actions.id];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
    }
    case ADD_ORDER: {
      return initialState;
    }
    case DELETE_PRODUCT: {
      if (!state.items[actions.pid]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[actions.pid].sum;
      delete updatedItems[actions.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
    }
    default:
      return state;
  }
};
