import type { RootThunk } from '../../main/bll/store';

// Types
type InitState = typeof initState;
type SomeAction = ReturnType<typeof someActionAC>;
export type ProfileActions = SomeAction;

// Initial state
const initState = {};

export const profileReducer = (
  state: InitState = initState,
  action: ProfileActions,
): InitState => {
  switch (action.type) {
    case 'profile/SOME-ACTION':
      return { ...state };
    default:
      return state;
  }
};

// Action creators
export const someActionAC = () => ({ type: 'profile/SOME-ACTION' }) as const;

// Thunk creators
export const someThunkTC = (): RootThunk => (dispatch) => {
  dispatch(someActionAC());
};
