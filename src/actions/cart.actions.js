const cartActionTypes = {
  INIT_CART: "INIT_CART",
  CHECKOUT: "CHECKOUT",
  REMOVE_ITEM: "REMOVE_ITEM",
};

export const initCartAction = (cartItems, price) => {
  const action = {
    type: cartActionTypes.INIT_CART,
    payload: {
      cartItems: cartItems,
      price: price,
    },
  };

  return action;
};

export const removeItem = (bookID, price) => {
  const action = {
    type: cartActionTypes.REMOVE_ITEM,
    payload: {
      bookID: bookID,
      price: price,
    },
  };
  return action;
};

export const chekout = () => {
  const action = {
    type: cartActionTypes.CHECKOUT,
    payload: {},
  };
  return action;
};

export default cartActionTypes;
