import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const token = localStorage.getItem("userToken");
  const INITIAL_STATE = token ? token : null;

  const [userToken, setUserToken] = useState(INITIAL_STATE);

  const value = { userToken, setUserToken };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export default AuthContextProvider;