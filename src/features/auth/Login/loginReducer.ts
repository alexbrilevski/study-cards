import type { RootThunk } from '../../../main/bll/store';

// Types
type InitState = typeof initState;
type SomeAction = ReturnType<typeof someActionAC>;
export type LoginActions = SomeAction;

// Initial state
const initState = {};

export const loginReducer = (
  state: InitState = initState,
  action: LoginActions,
): InitState => {
  switch (action.type) {
    case 'login/SOME-ACTION':
      return { ...state };
    default:
      return state;
  }
};

// Action creators
export const someActionAC = () => ({ type: 'login/SOME-ACTION' }) as const;

// Thunk creators
export const someThunkTC = (): RootThunk => (dispatch) => {
  dispatch(someActionAC);
};
