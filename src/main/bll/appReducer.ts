import type { RootThunk } from './store';
import { appAPI } from '../dal/appApi';
import { setAuthUser } from '../../features/profile/bll/profileReducer';
import { handleApiRequestError } from '../../utils/notificationUtils';

// Constants
const ACTION_TYPES = {
  SET_IS_INITIALIZED: 'app/SET-IS-INITIALIZED',
  SET_IS_LOADING: 'app/SET-IS-LOADING',
  SET_NOTIFICATION: 'app/SET-NOTIFICATION',
} as const;

// Types
type InitStateType = typeof initState;
export type AppNotification = {
  type: 'error' | 'info' | 'success';
  message: string;
};

// Initial state
const initState = {
  isInitialized: false,
  isLoading: false,
  notification: null as AppNotification | null,
};

type SetAppIsInitializedAction = ReturnType<typeof setAppIsInitialized>;
type SetAppIsLoadingAction = ReturnType<typeof setAppIsLoading>;
type SetAppErrorAction = ReturnType<typeof setAppNotification>;
export type AppActions =
  | SetAppIsInitializedAction
  | SetAppIsLoadingAction
  | SetAppErrorAction;

export const appReducer = (
  state: InitStateType = initState,
  action: AppActions,
): InitStateType => {
  switch (action.type) {
    case ACTION_TYPES.SET_IS_INITIALIZED:
    case ACTION_TYPES.SET_IS_LOADING:
    case ACTION_TYPES.SET_NOTIFICATION:
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
export const setAppNotification = (notification: AppNotification | null) =>
  ({ type: ACTION_TYPES.SET_NOTIFICATION, payload: { notification } }) as const;

// Thunk creators
export const initializeApp = (): RootThunk => (dispatch) => {
  appAPI
    .me()
    .then((data) => {
      dispatch(setAuthUser(data));
    })
    .catch((error) => {
      if (error.response) {
        const { status, statusText, data } = error.response;
        if (status === 401 && statusText === 'Unauthorized') {
          console.log('Error: ', data.error);
        } else {
          handleApiRequestError(error, dispatch);
        }
      } else {
        handleApiRequestError(error, dispatch);
      }
    })
    .finally(() => dispatch(setAppIsInitialized(true)));
};
