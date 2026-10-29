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
} from '../../features/auth/Registration/bll/registrationReducer';
import {
  loginReducer,
  type LoginActions,
} from '../../features/auth/Login/bll/loginReducer';
import {
  newPasswordReducer,
  type NewPasswordActions,
} from '../../features/auth/PasswordRecovery/bll/newPasswordReducer';
import {
  passwordRecoveryReducer,
  type PasswordRecoveryActions,
} from '../../features/auth/PasswordRecovery/bll/passwordRecoveryReducer';
import {
  profileReducer,
  type ProfileActions,
} from '../../features/profile/bll/profileReducer';
import {
  packListReducer,
  type PackListActions,
} from '../../features/packList/bll/packListReducer';

export type RootState = ReturnType<typeof rootReducer>;

export type RootAction =
  | AppActions
  | RegistrationActions
  | LoginActions
  | ProfileActions
  | NewPasswordActions
  | PasswordRecoveryActions
  | PackListActions;

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
  packList: packListReducer,
});

export const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
