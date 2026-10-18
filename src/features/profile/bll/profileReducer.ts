import type { User } from '../../../main/types/user';
import type { RootThunk } from '../../../main/bll/store';
import { profileAPI } from '../dal/profileApi';
import { setAppIsLoading } from '../../../main/bll/appReducer';
import { handleApiRequestError } from '../../../utils/notificationUtils';

// Constants
const ACTION_TYPES = {
  SET_AUTH_USER: 'profile/SET-AUTH-USER',
  UPDATE_USER: 'profile/UPDATE-USER',
} as const;

// Types
type InitState = typeof initState;
type SetAuthUserAction = ReturnType<typeof setAuthUser>;
export type ProfileActions = SetAuthUserAction;

// Initial state
const initState = { user: null as User | null };

export const profileReducer = (
  state: InitState = initState,
  action: ProfileActions,
): InitState => {
  switch (action.type) {
    case ACTION_TYPES.SET_AUTH_USER: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

// Action creators
export const setAuthUser = (user: User | null) =>
  ({ type: ACTION_TYPES.SET_AUTH_USER, payload: { user } }) as const;

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
        handleApiRequestError(error, dispatch);
      })
      .finally(() => {
        dispatch(setAppIsLoading(false));
      });
  };
