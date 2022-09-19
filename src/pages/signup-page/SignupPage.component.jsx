import React, { useEffect, useState, useContext } from "react";
import "./signup-page.styles.css";
import Loader from "../../componets/shared/loader/Loader.component";
import { useNavigate } from "react-router-dom";
import signupReducer, {
  SIGNUP_FORM_INITIAL_STATE,
} from "../../reducers/signup-form.reducer";
import { useReducer } from "react";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import {
  updateEmailAction,
  updateFirstNameAction,
  updateLastNameAction,
  updatePasswordAction,
  updatePasswordRepeatedAction,
} from "../../actions/signup-form.actions";
import { AuthContext } from "../../contexts/Auth.context";
import environments from "../../environments/environments.js";
const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const authContextValue = useContext(AuthContext);
  const navigate = useNavigate();
  const [signupFormState, dispatchSignupFormState] = useReducer(
    signupReducer,
    SIGNUP_FORM_INITIAL_STATE
  );

  const handelFirstNameInput = (event) => {
    const firstNameInput = event.target.value.trim();
    return dispatchSignupFormState(
      updateFirstNameAction(firstNameInput, true, "")
    );
  };

  const handelLastNameInput = (event) => {
    const lastNameInput = event.target.value.trim();
    return dispatchSignupFormState(
      updateLastNameAction(lastNameInput, true, "")
    );
  };

  const handelEmailInput = (event) => {
    const emailInput = event.target.value.toLowerCase().trim();

    if (emailInput === "") {
      dispatchSignupFormState(updateEmailAction(emailInput, true, ""));
      return;
    }

    if (!isEmail(emailInput)) {
      dispatchSignupFormState(
        updateEmailAction(
          emailInput,
          false,
          "Please enter a valid email adress"
        )
      );
      return;
    }

    dispatchSignupFormState(updateEmailAction(emailInput, true, ""));
  };

  const handelPasswordInput = (event) => {
    const passwordInput = event.target.value.trim();
    if (passwordInput === "") {
      dispatchSignupFormState(updatePasswordAction(passwordInput, true, ""));
      return;
    }

    if (!isStrongPassword(passwordInput)) {
      dispatchSignupFormState(
        updatePasswordAction(
          passwordInput,
          false,
          "You must enter a password with at least 8 characters which includes one captial letter, number and specail character"
        )
      );
      return;
    }
    dispatchSignupFormState(updatePasswordAction(passwordInput, true, ""));
  };

  const handelPasswordRepeatedInput = (event) => {
    const passwordInput = event.target.value.trim();

    if (passwordInput === "") {
      dispatchSignupFormState(
        updatePasswordRepeatedAction(passwordInput, true, "")
      );
      return;
    }
    if (passwordInput !== signupFormState.values.password) {
      dispatchSignupFormState(
        updatePasswordRepeatedAction(
          passwordInput,
          false,
          "Passwords must be match!"
        )
      );
      return;
    }
    dispatchSignupFormState(
      updatePasswordRepeatedAction(passwordInput, true, "")
    );
  };

  const handelSubmit = async (event) => {
    event.preventDefault();

    const data = {
      firstName: signupFormState.values.firstName,
      lastName: signupFormState.values.lastName,
      email: signupFormState.values.email,
      password: signupFormState.values.password,
    };

    const values = signupFormState.validities;
    if (
      values.password === true &&
      values.email === true &&
      values.repeatedPassword === true
    ) {
      try {
        const response = await fetch(`${environments.API_URL}/users/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.status !== 201) {
          throw new Error();
        }

        const responeData = await response.json();

        const token = responeData.data.token;
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
    <div className="signup-page">
      <form onSubmit={handelSubmit} action="">
        <div className="signup-container">
          <h1>Hello New User !</h1>

          <div className="signup-info-container">
            <label htmlFor="">First Name:</label>
            <input onInput={handelFirstNameInput} required type="text" />
            <label htmlFor="">Last Name:</label>
            <input onInput={handelLastNameInput} required type="text" />
            <label htmlFor="">Email:</label>
            <input onInput={handelEmailInput} required type="email" />
            {signupFormState.validities.email ? null : (
              <div className="error-msg">
                {signupFormState.errorMessages.email}{" "}
              </div>
            )}
            <label htmlFor="">Password</label>
            <input onInput={handelPasswordInput} required type="password" />
            {signupFormState.validities.password ? null : (
              <div className="error-msg">
                {signupFormState.errorMessages.password}{" "}
              </div>
            )}
            <label htmlFor="">Repeated Password</label>
            <input
              onInput={handelPasswordRepeatedInput}
              required
              type="password"
            />
            {signupFormState.validities.repeatedPassword ? null : (
              <div className="error-msg">
                {signupFormState.errorMessages.repeatedPassword}{" "}
              </div>
            )}
          </div>
          <span onClick={() => navigate("/login")}>
            Have an account already..? Login !{" "}
          </span>

          <button>Signup !</button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
