import loginFormActionTypes from "../actions/login-form.action";

export const LOGIN_FORM_INITIAL_STATE = {
  values: {
    email: "",
    password: "",
  },
  validities: {
    email: true,
    password: true,
  },

  errorMessages: {
    email: "",
    password: "",
  },
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case loginFormActionTypes.UPDATE_EMAIL: {
      const updatedEmailValue = action.payload.value;
      const updatedEmailValid = action.payload.isValid;
      const updatedEmailErrorMessage = action.payload.errorMessage;

      const updatedValues = { ...state.values, email: updatedEmailValue };
      const updatedValidities = {
        ...state.validities,
        email: updatedEmailValid,
      };
      const updatedErrorMesages = {
        ...state.errorMessages,
        email: updatedEmailErrorMessage,
      };

      const updatedState = {
        values: updatedValues,
        validities: updatedValidities,
        errorMessages: updatedErrorMesages,
      };

      return updatedState;
    }

    case loginFormActionTypes.UPDATE_PASSWORD: {
      const updatedPasswordValue = action.payload.value;
      const updatedPassowrdValid = action.payload.isValid;
      const updatedPasswordErrorMessage = action.payload.errorMessage;

      const updatedValues = { ...state.values, password: updatedPasswordValue };
      const updatedValidities = {
        ...state.validities,
        password: updatedPassowrdValid,
      };
      const updateddErrorMessages = {
        ...state.errorMessages,
        password: updatedPasswordErrorMessage,
      };

      const updatedState = {
        values: updatedValues,
        validities: updatedValidities,
        errorMessages: updateddErrorMessages,
      };
      return updatedState;
    }
    default: {
      return state;
    }
  }
};

export default loginReducer;
