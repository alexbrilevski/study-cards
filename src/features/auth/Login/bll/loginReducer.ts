import type { RootThunk } from '../../../../main/bll/store';
import { setAppIsLoading } from '../../../../main/bll/appReducer';
import { loginAPI } from '../dal/loginApi';
import type { User } from '../../../../main/types/user';

// Types
type InitState = typeof initState;
type LoginAction = ReturnType<typeof loginAC> | ReturnType<typeof setErrorMessageAC>;
export type LoginActions = LoginAction;

// Initial state
const initState = {
  _id: '',
  email: '',
  name: '',
  avatar: '',
  publicCardPacksCount: 0,
  created: 0,
  updated: 0,
  isAdmin: false,
  verified: false,
  rememberMe: false,
  error: '',
};

export const loginReducer = (
  state: InitState = initState,
  action: LoginActions,
): InitState => {
  switch (action.type) {
    case 'login/LOGIN': {
      return { ...state, ...action.payload };
    }
    case 'login/SET_ERROR_MESSAGE': {
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
};

// Action creators
export const loginAC = (payload: User) => ({ type: 'login/LOGIN', payload }) as const;
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
        dispatch(loginAC(data));
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
      dispatch(loginAC(initState));
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
