import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { thunk, type ThunkAction, type ThunkDispatch } from 'redux-thunk';
import { appReducer, type AppActions } from './appReducer';
import {
  registrationReducer,
  type RegistrationActions,
} from '../../features/auth/Registration/registrationReducer';
import { loginReducer, type LoginActions } from '../../features/auth/Login/loginReducer';
import {
  newPasswordReducer,
  type NewPasswordActions,
} from '../../features/auth/NewPassword/newPasswordReducer';
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
  | AppActions
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
export type AppDispatch = ThunkDispatch<RootState, unknown, RootAction>;

// Custom useDispatch and useSelector: Use throughout app instead of plain useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const rootReducer = combineReducers({
  app: appReducer,
  registration: registrationReducer,
  login: loginReducer,
  profile: profileReducer,
  newPassword: newPasswordReducer,
  passwordRecovery: passwordRecoveryReducer,
});

export const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
