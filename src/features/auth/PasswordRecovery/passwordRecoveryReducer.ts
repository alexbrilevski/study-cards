import type { RootThunk } from '../../../main/bll/store';

// Types
type InitState = typeof initState;
type SomeAction = ReturnType<typeof someActionAC>;
export type PasswordRecoveryActions = SomeAction;

// Initial state
const initState = {};

export const passwordRecoveryReducer = (
  state: InitState = initState,
  action: PasswordRecoveryActions,
): InitState => {
  switch (action.type) {
    case 'passwordRecovery/SOME-ACTION':
      return { ...state };
    default:
      return state;
  }
};

// Action creators
export const someActionAC = () => ({ type: 'passwordRecovery/SOME-ACTION' }) as const;

// Thunk creators
export const someThunkTC = (): RootThunk => (dispatch) => {
  dispatch(someActionAC);
};
