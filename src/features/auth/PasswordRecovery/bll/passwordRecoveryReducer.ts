import type { RootThunk } from '../../../../main/bll/store';
import { passwordAPI } from '../dal/passwordApi';
import { setAppIsLoading } from '../../../../main/bll/appReducer';

// Constants
const ACTION_TYPES = {
  SET_RECOVERY_EMAIL: 'passwordRecovery/SET-RECOVERY-EMAIL',
  SET_ERROR: 'passwordRecovery/SET-ERROR',
} as const;

// Types
type InitState = typeof initState;
type RedirectAction = ReturnType<typeof setRecoveryEmailAC>;
type SetPasswordErrorAction = ReturnType<typeof setPasswordErrorAC>;
export type PasswordRecoveryActions = RedirectAction | SetPasswordErrorAction;

// Initial state
const initState = {
  info: '',
  error: null as null | string,
  recoveryEmail: '',
};

export const passwordRecoveryReducer = (
  state: InitState = initState,
  action: PasswordRecoveryActions,
): InitState => {
  switch (action.type) {
    case ACTION_TYPES.SET_RECOVERY_EMAIL: {
      return { ...state, recoveryEmail: action.recoveryEmail };
    }
    case ACTION_TYPES.SET_ERROR: {
      return { ...state, error: action.value };
    }
    default:
      return state;
  }
};

// Action creators
export const setRecoveryEmailAC = (recoveryEmail: string) =>
  ({
    type: ACTION_TYPES.SET_RECOVERY_EMAIL,
    recoveryEmail,
  }) as const;
export const setPasswordErrorAC = (value: null | string) =>
  ({ type: ACTION_TYPES.SET_ERROR, value }) as const;

// Thunk creators
export const recoverPassword =
  (email: string, message: string): RootThunk =>
  (dispatch) => {
    dispatch(setAppIsLoading(true));
    passwordAPI
      .forgot(email, message)
      .then((response) => {
        console.log(response);
        dispatch(setRecoveryEmailAC(email));
      })
      .catch((e) => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console';
        dispatch(setPasswordErrorAC(error));
      })
      .finally(() => {
        dispatch(setAppIsLoading(false));
      });
  };
