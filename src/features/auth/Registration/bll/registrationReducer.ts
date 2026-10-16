import { setAppIsLoading } from '../../../../main/bll/appReducer';
import type { RootThunk } from '../../../../main/bll/store';
import { registrationAPI } from '../dal/registrationApi';

// Types
type InitState = typeof initState;
type SetSuccessAction = ReturnType<typeof setSuccess>;
type SetErrorAction = ReturnType<typeof setError>;
export type RegistrationActions = SetSuccessAction | SetErrorAction;
export type SignUpFormData = {
  email: string;
  password: string;
  passwordConfirm: string;
};

// Initial state
const initState = {
  isLoading: false,
  success: false,
  error: null as null | string,
};

export const registrationReducer = (
  state: InitState = initState,
  action: RegistrationActions,
): InitState => {
  switch (action.type) {
    case 'registration/SET-SUCCESS':
      return { ...state, success: action.value };
    case 'registration/SET-ERROR':
      return { ...state, error: action.value };
    default:
      return state;
  }
};

// Action creators
export const setIsLoading = (value: boolean) =>
  ({ type: 'registration/SET-IS-LOADING', value }) as const;
export const setSuccess = (value: boolean) =>
  ({ type: 'registration/SET-SUCCESS', value }) as const;
export const setError = (value: null | string) =>
  ({ type: 'registration/SET-ERROR', value }) as const;

// Thunk creators
export const register =
  (formData: SignUpFormData): RootThunk =>
  (dispatch) => {
    const { email, password, passwordConfirm } = formData;

    if (password !== passwordConfirm) {
      dispatch(setError("Passwords don't match!"));
      return;
    }

    dispatch(setAppIsLoading(true));
    registrationAPI
      .register(email, password)
      .then(() => {
        dispatch(setSuccess(true));
      })
      .catch((error) => {
        dispatch(setError(error.response.data.error));
      })
      .finally(() => {
        dispatch(setAppIsLoading(false));
      });
  };
