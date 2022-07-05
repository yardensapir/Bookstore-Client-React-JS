import { createContext, useReducer } from "react";
import cartReducer, { CART_INIT_STATE } from "../reducers/cart.reducer";
export const CartContext = createContext();

const CartContextProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    CART_INIT_STATE
  );
  const value = {
    cartState: cartState,
    dispatchCartState: dispatchCartState,
  };
  return <CartContext.Provider value={value}>{props.children}</CartContext.Provider>;
};

export default CartContextProvider;
