import { setAppIsLoading } from '../../../../main/bll/appReducer';
import type { RootThunk } from '../../../../main/bll/store';
import { passwordAPI } from '../dal/passwordApi';

// Constants
const ACTION_TYPES = {
  SET_NEW_PASSWORD_SUCCESS: 'newPassword/SET-NEW-PASSWORD-SUCCESS',
  SET_NEW_PASSWORD_ERROR: 'newPassword/SET-NEW-PASSWORD-ERROR',
} as const;

// Types
type InitState = typeof initState;
type SetNewPasswordSuccessAction = ReturnType<typeof setNewPasswordSuccessAC>;
type SetNewPasswordErrorAction = ReturnType<typeof setNewPasswordErrorAC>;
export type NewPasswordActions = SetNewPasswordSuccessAction | SetNewPasswordErrorAction;

// Initial state
const initState = {
  info: '',
  error: null as null | string,
  success: false,
};

export const newPasswordReducer = (
  state: InitState = initState,
  action: NewPasswordActions,
): InitState => {
  switch (action.type) {
    case ACTION_TYPES.SET_NEW_PASSWORD_SUCCESS:
      return { ...state, success: action.success };
    case ACTION_TYPES.SET_NEW_PASSWORD_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

// Action creators
export const setNewPasswordSuccessAC = (success: boolean) =>
  ({ type: ACTION_TYPES.SET_NEW_PASSWORD_SUCCESS, success }) as const;
export const setNewPasswordErrorAC = (error: string | null) =>
  ({ type: ACTION_TYPES.SET_NEW_PASSWORD_ERROR, error }) as const;

// Thunk creators
export const setNewPassword =
  (password: string, token: string): RootThunk =>
  (dispatch) => {
    dispatch(setAppIsLoading(true));
    passwordAPI
      .setNewPassword(password, token)
      .then((response) => {
        console.log(response);
        dispatch(setNewPasswordSuccessAC(true));
      })
      .catch((e) => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console';
        dispatch(setNewPasswordErrorAC(error));
      })
      .finally(() => {
        dispatch(setAppIsLoading(false));
      });
  };
