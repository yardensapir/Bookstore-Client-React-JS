import cartActionTypes from "../actions/cart.actions";
export const CART_INIT_STATE = {
  items: [],
  price: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case cartActionTypes.INIT_CART: {
      const cartItems = action.payload.cartItems;
      const price = action.payload.price;
      return { items: cartItems, price: price };
    }
    case cartActionTypes.REMOVE_ITEM: {
      const bookID = action.payload.bookID;
      const price = action.payload.price;
      const updatedCartItems = [...state.items].filter(
        (item) => item.bookID._id !== bookID
      );
      const bookPrice = state.price;
      const updatedPrice = bookPrice - price;

      return {
        items: updatedCartItems,
        price: updatedPrice < 0 ? 0 : updatedPrice,
      };
    }
    case cartActionTypes.CHECKOUT: {
      return CART_INIT_STATE;
    }
    default:
      return state;
  }
};

export default cartReducer;
