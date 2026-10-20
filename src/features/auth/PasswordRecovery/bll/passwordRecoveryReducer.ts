import type { RootThunk } from '../../../../main/bll/store';
import { passwordAPI } from '../dal/passwordApi';
import { setAppIsLoading } from '../../../../main/bll/appReducer';

// Constants
const ACTION_TYPES = {
  SET_RECOVERY_EMAIL: 'passwordRecovery/SET-RECOVERY-EMAIL',
  SET_FORM_ERROR: 'passwordRecovery/SET-FORM-ERROR',
} as const;

// Types
type InitState = typeof initState;
type SetRecoveryEmailAction = ReturnType<typeof setRecoveryEmail>;
type SetPasswordRecoveryFormErrorAction = ReturnType<typeof setPasswordRecoveryFormError>;
export type PasswordRecoveryActions =
  | SetRecoveryEmailAction
  | SetPasswordRecoveryFormErrorAction;

// Initial state
const initState = {
  recoveryEmail: '',
  error: null as string | null,
};

export const passwordRecoveryReducer = (
  state: InitState = initState,
  action: PasswordRecoveryActions,
): InitState => {
  switch (action.type) {
    case ACTION_TYPES.SET_RECOVERY_EMAIL:
    case ACTION_TYPES.SET_FORM_ERROR: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

// Action creators
export const setRecoveryEmail = (recoveryEmail: string) =>
  ({
    type: ACTION_TYPES.SET_RECOVERY_EMAIL,
    payload: { recoveryEmail },
  }) as const;
export const setPasswordRecoveryFormError = (error: string | null) =>
  ({ type: ACTION_TYPES.SET_FORM_ERROR, payload: { error } }) as const;

// Thunk creators
export const recoverPassword =
  (email: string): RootThunk =>
  (dispatch) => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const message = `<div>Password recovery link:<a href='${baseURL}/#/create-new-password/$token$'>link</a></div>`;

    dispatch(setAppIsLoading(true));
    passwordAPI
      .forgot(email, message)
      .then(() => {
        dispatch(setRecoveryEmail(email));
      })
      .catch((error) => {
        const errorMessage = error.response
          ? error.response.data.error
          : error.message + ', more details in the console';
        dispatch(setPasswordRecoveryFormError(errorMessage));
      })
      .finally(() => {
        dispatch(setAppIsLoading(false));
      });
  };
