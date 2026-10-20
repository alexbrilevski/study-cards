import type { User } from '../../../main/types/user';
import type { RootThunk } from '../../../main/bll/store';
import { profileAPI } from '../dal/profileApi';
import { setAppIsLoading } from '../../../main/bll/appReducer';

// Constants
const ACTION_TYPES = {
  SET_AUTH_USER: 'profile/SET-AUTH-USER',
  SET_FORM_ERROR: 'profile/SET-FORM-ERROR',
} as const;

// Types
type InitState = typeof initState;
type SetAuthUserAction = ReturnType<typeof setAuthUser>;
type SetEditProfileFormErrorAction = ReturnType<typeof setEditProfileFormError>;
export type ProfileActions = SetAuthUserAction | SetEditProfileFormErrorAction;

// Initial state
const initState = {
  user: null as User | null,
  error: null as string | null,
};

export const profileReducer = (
  state: InitState = initState,
  action: ProfileActions,
): InitState => {
  switch (action.type) {
    case ACTION_TYPES.SET_AUTH_USER:
    case ACTION_TYPES.SET_FORM_ERROR: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

// Action creators
export const setAuthUser = (user: User | null) =>
  ({ type: ACTION_TYPES.SET_AUTH_USER, payload: { user } }) as const;
export const setEditProfileFormError = (error: string | null) =>
  ({ type: ACTION_TYPES.SET_FORM_ERROR, payload: { error } }) as const;

// Thunk creators
export const saveUpdatedUserData =
  (name: string, avatar: string): RootThunk =>
  (dispatch) => {
    dispatch(setAppIsLoading(true));
    profileAPI
      .updateUserData(name, avatar)
      .then((data) => {
        dispatch(setAuthUser(data.updatedUser));
      })
      .catch((error) => {
        const errorMessage = error.response
          ? error.response.data.error
          : error.message + ', more details in the console';
        dispatch(setEditProfileFormError(errorMessage));
      })
      .finally(() => {
        dispatch(setAppIsLoading(false));
      });
  };
