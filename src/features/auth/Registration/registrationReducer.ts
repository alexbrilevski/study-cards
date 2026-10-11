import type { RootThunk } from '../../../main/bll/store';

// Types
type InitState = typeof initState;
type SomeAction = ReturnType<typeof someActionAC>;
export type RegistrationActions = SomeAction;

// Initial state
const initState = {};

export const registrationReducer = (
  state: InitState = initState,
  action: RegistrationActions,
): InitState => {
  switch (action.type) {
    case 'registration/SOME-ACTION':
      return { ...state };
    default:
      return state;
  }
};

// Action creators
export const someActionAC = () => ({ type: 'registration/SOME-ACTION' }) as const;

// Thunk creators
export const someThunkTC = (): RootThunk => (dispatch) => {
  dispatch(someActionAC);
};
