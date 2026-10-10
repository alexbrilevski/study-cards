type InitState = typeof initState;

type TestAction = ReturnType<typeof testAC>;

const initState = {};

export const testReducer = (
  state: InitState = initState,
  action: TestAction,
): InitState => {
  switch (action.type) {
    case 'TEST-ACTION':
      return { ...state };
    default:
      return state;
  }
};

export const testAC = () => ({ type: 'TEST-ACTION' }) as const;
