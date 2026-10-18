import { setAppIsLoading } from '../../../../main/bll/appReducer';
import type { RootThunk } from '../../../../main/bll/store';
import { registrationAPI } from '../dal/registrationApi';
import { handleApiRequestError } from '../../../../utils/notificationUtils';

// Types
type InitState = typeof initState;
type SetSuccessAction = ReturnType<typeof setSuccess>;
export type RegistrationActions = SetSuccessAction;
export type SignUpFormData = {
  email: string;
  password: string;
  passwordConfirm: string;
};

// Initial state
const initState = {
  success: false,
};

export const registrationReducer = (
  state: InitState = initState,
  action: RegistrationActions,
): InitState => {
  switch (action.type) {
    case 'registration/SET-SUCCESS':
      return { ...state, success: action.value };
    default:
      return state;
  }
};

// Action creators
export const setSuccess = (value: boolean) =>
  ({ type: 'registration/SET-SUCCESS', value }) as const;

// Thunk creators
export const register =
  (formData: SignUpFormData): RootThunk =>
  (dispatch) => {
    const { email, password } = formData;

    dispatch(setAppIsLoading(true));
    registrationAPI
      .register(email, password)
      .then(() => {
        dispatch(setSuccess(true));
      })
      .catch((error) => {
        handleApiRequestError(error, dispatch);
      })
      .finally(() => {
        dispatch(setAppIsLoading(false));
      });
  };
