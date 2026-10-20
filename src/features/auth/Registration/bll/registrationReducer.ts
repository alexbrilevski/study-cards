import { setAppIsLoading } from '../../../../main/bll/appReducer';
import type { RootThunk } from '../../../../main/bll/store';
import { registrationAPI } from '../dal/registrationApi';

// Constants
const ACTION_TYPES = {
  SET_SUCCESS: 'registration/SET-SUCCESS',
  SET_FORM_ERROR: 'registration/SET-FORM-ERROR',
} as const;

// Types
type InitState = typeof initState;
type SetRegistrationSuccessAction = ReturnType<typeof setRegistrationSuccess>;
type SetRegistrationFormErrorAction = ReturnType<typeof setRegistrationFormError>;
export type RegistrationActions =
  | SetRegistrationSuccessAction
  | SetRegistrationFormErrorAction;
export type SignUpFormData = {
  email: string;
  password: string;
  passwordConfirm: string;
};

// Initial state
const initState = {
  success: false,
  error: null as string | null,
};

export const registrationReducer = (
  state: InitState = initState,
  action: RegistrationActions,
): InitState => {
  switch (action.type) {
    case ACTION_TYPES.SET_SUCCESS:
    case ACTION_TYPES.SET_FORM_ERROR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// Action creators
export const setRegistrationSuccess = (success: boolean) =>
  ({ type: ACTION_TYPES.SET_SUCCESS, payload: { success } }) as const;
export const setRegistrationFormError = (error: string | null) =>
  ({ type: ACTION_TYPES.SET_FORM_ERROR, payload: { error } }) as const;

// Thunk creators
export const register =
  (formData: SignUpFormData): RootThunk =>
  (dispatch) => {
    const { email, password, passwordConfirm } = formData;

    if (password !== passwordConfirm) {
      dispatch(setRegistrationFormError("Passwords don't match"));
      return;
    }

    dispatch(setAppIsLoading(true));
    registrationAPI
      .register(email, password)
      .then(() => {
        dispatch(setRegistrationSuccess(true));
      })
      .catch((error) => {
        const errorMessage = error.response
          ? error.response.data.error
          : error.message + ', more details in the console';
        dispatch(setRegistrationFormError(errorMessage));
      })
      .finally(() => {
        dispatch(setAppIsLoading(false));
      });
  };
