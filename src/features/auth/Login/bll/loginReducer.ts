import type { RootThunk } from '../../../../main/bll/store';
import { setAppIsLoading, setAppNotification } from '../../../../main/bll/appReducer';
import { loginAPI } from '../dal/loginApi';
import { setAuthUser } from '../../../profile/bll/profileReducer';
import { handleApiRequestError } from '../../../../utils/notificationUtils';

// Constants
const ACTION_TYPES = {
  SET_FORM_ERROR: 'login/SET-FORM-ERROR',
} as const;

// Types
type InitState = typeof initState;
type LoginAction = ReturnType<typeof setLoginFormError>;
export type LoginActions = LoginAction;

// Initial state
const initState = {
  error: null as string | null,
};

export const loginReducer = (
  state: InitState = initState,
  action: LoginActions,
): InitState => {
  switch (action.type) {
    case ACTION_TYPES.SET_FORM_ERROR: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

// Action creators
export const setLoginFormError = (error: string | null) =>
  ({ type: ACTION_TYPES.SET_FORM_ERROR, payload: { error } }) as const;

// Thunk creators
export const login =
  (email: string, password: string, rememberMe: boolean): RootThunk =>
  (dispatch) => {
    dispatch(setAppIsLoading(true));
    loginAPI
      .login(email, password, rememberMe)
      .then((data) => {
        dispatch(setAuthUser(data));
      })
      .catch((error) => {
        const errorMessage = error.response
          ? error.response.data.error
          : error.message + ', more details in the console';
        dispatch(setLoginFormError(errorMessage));
      })
      .finally(() => {
        dispatch(setAppIsLoading(false));
      });
  };
export const logout = (): RootThunk => (dispatch) => {
  dispatch(setAppIsLoading(true));
  loginAPI
    .logout()
    .then(() => {
      dispatch(setAuthUser(null));
      dispatch(
        setAppNotification({
          type: 'success',
          message: 'You logged out successfully',
        }),
      );
    })
    .catch((error) => {
      handleApiRequestError(error, dispatch);
    })
    .finally(() => {
      dispatch(setAppIsLoading(false));
    });
};
