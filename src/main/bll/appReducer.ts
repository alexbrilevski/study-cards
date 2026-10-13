// Types
type InitStateType = typeof initState;

// Initial state
const initState = {
  isLoading: false,
};

type SetAppIsLoadingAction = ReturnType<typeof setAppIsLoading>;
export type AppActions = SetAppIsLoadingAction;

export const appReducer = (
  state: InitStateType = initState,
  action: AppActions,
): InitStateType => {
  switch (action.type) {
    case 'app/SET-IS-LOADING':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// Action creators
export const setAppIsLoading = (value: boolean) =>
  ({ type: 'app/SET-IS-LOADING', payload: { isLoading: value } }) as const;
