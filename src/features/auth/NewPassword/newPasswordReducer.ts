import type { RootThunk } from '../../../main/bll/store';

// Types
type InitState = typeof initState;
type SomeAction = ReturnType<typeof someActionAC>;
export type NewPasswordActions = SomeAction;

// Initial state
const initState = {};

export const newPasswordReducer = (
  state: InitState = initState,
  action: NewPasswordActions,
): InitState => {
  switch (action.type) {
    case 'newPassword/SOME-ACTION':
      return { ...state };
    default:
      return state;
  }
};

// Action creators
export const someActionAC = () => ({ type: 'newPassword/SOME-ACTION' }) as const;

// Thunk creators
export const someThunkTC = (): RootThunk => (dispatch) => {
  dispatch(someActionAC);
};
