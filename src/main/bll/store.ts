import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk, type ThunkAction } from 'redux-thunk';
import { loginReducer, type LoginActions } from '../../features/auth/Login/loginReducer';
import {
  newPasswordReducer,
  type NewPasswordActions,
} from '../../features/auth/NewPassword/newPasswordReducer';
import {
  registrationReducer,
  type RegistrationActions,
} from '../../features/auth/Registration/registrationReducer';
import {
  passwordRecoveryReducer,
  type PasswordRecoveryActions,
} from '../../features/auth/PasswordRecovery/passwordRecoveryReducer';
import {
  profileReducer,
  type ProfileActions,
} from '../../features/profile/profileReducer';

export type RootState = ReturnType<typeof rootReducer>;

export type RootAction =
  | RegistrationActions
  | LoginActions
  | ProfileActions
  | NewPasswordActions
  | PasswordRecoveryActions;

export type RootThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  RootAction
>;

const rootReducer = combineReducers({
  registration: registrationReducer,
  login: loginReducer,
  profile: profileReducer,
  newPassword: newPasswordReducer,
  passwordRecovery: passwordRecoveryReducer,
});

export const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
