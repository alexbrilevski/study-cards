import type { RootThunk } from '../../../../main/bll/store';
import { setAppIsLoading } from '../../../../main/bll/appReducer';
import { passwordAPI } from '../dal/passwordApi';

// Constants
const ACTION_TYPES = {
  SET_SUCCESS: 'newPassword/SET-SUCCESS',
  SET_FORM_ERROR: 'newPassword/SET-FORM-ERROR',
} as const;

// Types
type InitState = typeof initState;
type SetNewPasswordSuccessAction = ReturnType<typeof setNewPasswordSuccess>;
type SetNewPasswordFormErrorAction = ReturnType<typeof setNewPasswordFormError>;
export type NewPasswordActions =
  | SetNewPasswordSuccessAction
  | SetNewPasswordFormErrorAction;

// Initial state
const initState = {
  success: false,
  error: null as string | null,
};

export const newPasswordReducer = (
  state: InitState = initState,
  action: NewPasswordActions,
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
export const setNewPasswordSuccess = (success: boolean) =>
  ({ type: ACTION_TYPES.SET_SUCCESS, payload: { success } }) as const;
export const setNewPasswordFormError = (error: string | null) =>
  ({ type: ACTION_TYPES.SET_FORM_ERROR, payload: { error } }) as const;

// Thunk creators
export const setNewPassword =
  (password: string, token: string): RootThunk =>
  (dispatch) => {
    dispatch(setAppIsLoading(true));
    passwordAPI
      .setNewPassword(password, token)
      .then(() => {
        dispatch(setNewPasswordSuccess(true));
      })
      .catch((error) => {
        const errorMessage = error.response
          ? error.response.data.error
          : error.message + ', more details in the console';
        dispatch(setNewPasswordFormError(errorMessage));
      })
      .finally(() => {
        dispatch(setAppIsLoading(false));
      });
  };
