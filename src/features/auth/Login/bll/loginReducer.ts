import type { RootThunk } from '../../../../main/bll/store';
import { setAppIsLoading } from '../../../../main/bll/appReducer';
import { loginAPI } from '../dal/loginApi';
import { setAuthUser } from '../../../profile/bll/profileReducer';

// Types
type InitState = typeof initState;
type LoginAction = ReturnType<typeof setErrorMessageAC>;
export type LoginActions = LoginAction;

// Initial state
const initState = {};

export const loginReducer = (
  state: InitState = initState,
  action: LoginActions,
): InitState => {
  switch (action.type) {
    case 'login/SET_ERROR_MESSAGE': {
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
};

// Action creators
export const setErrorMessageAC = (payload: string) =>
  ({ type: 'login/SET_ERROR_MESSAGE', payload }) as const;

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
      .catch((e) => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console';

        dispatch(setErrorMessageAC(error));
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
    })
    .catch((e) => {
      const error = e.response
        ? e.response.data.error
        : e.message + ', more details in the console';

      dispatch(setErrorMessageAC(error));
    })
    .finally(() => {
      dispatch(setAppIsLoading(false));
    });
};
