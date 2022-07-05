import signupFormActionTypes from "../actions/signup-form.actions";

export const SIGNUP_FORM_INITIAL_STATE = {
  values: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatedPassword: "",
  },
  validities: {
    firstName: "",
    lastName: "",
    email: true,
    password: true,
    repeatedPassword: true,
  },

  errorMessages: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatedPassword: "",
  },
};

const signupReducer = (state, action) => {
  switch (action.type) {
    case signupFormActionTypes.UPDATE_FIRST_NAME: {
      const updatedFirstNameValue = action.payload.value;
      const updatedFirstNameValid = action.payload.isValid;
      const updatedFirstNameErrorMessage = action.payload.errorMessage;

      const updatedValues = {
        ...state.values,
        firstName: updatedFirstNameValue,
      };
      const updatedValidities = {
        ...state.validities,
        firstName: updatedFirstNameValid,
      };
      const updatedErrorMesages = {
        ...state.errorMessages,
        firstName: updatedFirstNameErrorMessage,
      };

      const updatedState = {
        values: updatedValues,
        validities: updatedValidities,
        errorMessages: updatedErrorMesages,
      };

      return updatedState;
    }

    case signupFormActionTypes.UPDATE_LAST_NAME: {
      const updatedLastNameValue = action.payload.value;
      const updatedLastNameValid = action.payload.value;
      const updatedLastNameErrorMessage = action.payload.errorMessage;

      const updatedValues = { ...state.values, lastName: updatedLastNameValue };
      const updatedValidities = {
        ...state.validities,
        lastName: updatedLastNameValid,
      };
      const updatedErrorMesages = {
        ...state.errorMessages,
        lastName: updatedLastNameErrorMessage,
      };

      const updatedState = {
        values: updatedValues,
        validities: updatedValidities,
        errorMessages: updatedErrorMesages,
      };

      return updatedState;
    }

    case signupFormActionTypes.UPDATE_EMAIL: {
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

    case signupFormActionTypes.UPDATE_PASSWORD: {
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

    case signupFormActionTypes.UPDATE_PASSWORD_REPEATED: {
      const updatedPasswordRepeatedValue = action.payload.value;
      const updatedPassowrdRepeatedValid = action.payload.isValid;
      const updatedPasswordRepeatedErrorMessage = action.payload.errorMessage;

      const updatedValues = {
        ...state.values,
        repeatedPassword: updatedPasswordRepeatedValue,
      };
      const updatedValidities = {
        ...state.validities,
        repeatedPassword: updatedPassowrdRepeatedValid,
      };
      const updateddErrorMessages = {
        ...state.errorMessages,
        repeatedPassword: updatedPasswordRepeatedErrorMessage,
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

export default signupReducer;
