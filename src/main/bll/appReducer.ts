import type { RootThunk } from './store';
import { appAPI } from '../dal/appApi';
import { setAuthUser } from '../../features/profile/bll/profileReducer';

// Constants
const ACTION_TYPES = {
  SET_IS_INITIALIZED: 'app/SET-IS-INITIALIZED',
  SET_IS_LOADING: 'app/SET-IS-LOADING',
} as const;

// Types
type InitStateType = typeof initState;

// Initial state
const initState = {
  isInitialized: false,
  isLoading: false,
};

type SetAppIsInitializedAction = ReturnType<typeof setAppIsInitialized>;
type SetAppIsLoadingAction = ReturnType<typeof setAppIsLoading>;
export type AppActions = SetAppIsInitializedAction | SetAppIsLoadingAction;

export const appReducer = (
  state: InitStateType = initState,
  action: AppActions,
): InitStateType => {
  switch (action.type) {
    case ACTION_TYPES.SET_IS_INITIALIZED:
    case ACTION_TYPES.SET_IS_LOADING:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// Action creators
export const setAppIsInitialized = (value: boolean) =>
  ({
    type: ACTION_TYPES.SET_IS_INITIALIZED,
    payload: { isInitialized: value },
  }) as const;
export const setAppIsLoading = (value: boolean) =>
  ({ type: ACTION_TYPES.SET_IS_LOADING, payload: { isLoading: value } }) as const;

// Thunk creators
export const initializeApp = (): RootThunk => (dispatch) => {
  appAPI
    .me()
    .then((data) => {
      dispatch(setAuthUser(data));
    })
    .catch((error) => {
      const errorMessage = error.response
        ? error.response.data.error
        : error.message + ', more details in the console';
      console.log('Error: ', errorMessage);
    })
    .finally(() => dispatch(setAppIsInitialized(true)));
};
