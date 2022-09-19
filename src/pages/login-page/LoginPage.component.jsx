import React, { useEffect, useState, useReducer, useContext } from "react";
import "./login-page.styles.css";
import Loader from "../../componets/shared/loader/Loader.component";
import { useNavigate } from "react-router-dom";
import loginReducer, {
  LOGIN_FORM_INITIAL_STATE,
} from "../../reducers/login-form.reducer";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import {
  updateEmailAction,
  updatePasswordAction,
} from "../../actions/login-form.action";
import { AuthContext } from "../../contexts/Auth.context";
import environments from "../../environments/environments.js";
const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(true);


  const authContextValue = useContext(AuthContext)

  const navigate = useNavigate();

  const [loginFormState, dispatchLoginFormState] = useReducer(
    loginReducer,
    LOGIN_FORM_INITIAL_STATE
  );

  const handelEmailInput = (event) => {
    const emailInput = event.target.value.toLowerCase().trim();

    if (emailInput === "") {
      dispatchLoginFormState(updateEmailAction(emailInput, true, ""));
      return;
    }

    if (!isEmail(emailInput)) {
      dispatchLoginFormState(
        updateEmailAction(
          emailInput,
          false,
          "Please enter a valid email adress"
        )
      );
      return;
    }

    dispatchLoginFormState(updateEmailAction(emailInput, true, ""));
  };

  const handelPasswordInput = (event) => {
    const passwordInput = event.target.value.trim();
    if (passwordInput === "") {
      dispatchLoginFormState(updatePasswordAction(passwordInput, true, ""));
      return;
    }

    if (!isStrongPassword(passwordInput)) {
      dispatchLoginFormState(
        updatePasswordAction(
          passwordInput,
          false,
          "You must enter a password with at least 8 characters which includes one captial letter, number and specail character"
        )
      );
      return;
    }
    dispatchLoginFormState(updatePasswordAction(passwordInput, true, ""));
  };

  const handelSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: loginFormState.values.email,
      password: loginFormState.values.password,
    };

    const values = loginFormState.validities;
    if (values.password === true && values.email === true) {
      try {
        const response = await fetch(`${environments.API_URL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.status !== 200) {
          throw new Error();
        }
        const responseData = await response.json();

        const token = responseData.data.token;
        localStorage.setItem("userToken", token);
        authContextValue.setUserToken(token)

        navigate("/cart");
      } catch (err) {
        alert("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if(authContextValue.userToken){
      navigate('/cart')
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="login-page">
      <form action="" onSubmit={handelSubmit}>
        <div className="login-container">
          <h1>Welcome Back !</h1>
          <div className="info-container">
            <label htmlFor="">Email</label>
            <input required type="email" onInput={handelEmailInput} />
            {loginFormState.validities.email ? null : (
              <div className="error-msg">
                {loginFormState.errorMessages.email}{" "}
              </div>
            )}
            <label htmlFor="">Password</label>
            <input required type="password" onInput={handelPasswordInput} />
            {loginFormState.validities.password ? null : (
              <div className="error-msg">
                {loginFormState.errorMessages.password}{" "}
              </div>
            )}
          </div>
          <span onClick={() => navigate("/signup")}>
            Don't have an account?.. Signup !
          </span>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
