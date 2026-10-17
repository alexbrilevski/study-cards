import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../../../features/auth/Login/ui/Login';
import { Registration } from '../../../features/auth/Registration/ui/Registration';
import { Profile } from '../../../features/profile/ui/Profile';
import { PasswordRecovery } from '../../../features/auth/PasswordRecovery/ui/PasswordRecovery';
import { PasswordRecoveryConfirm } from '../../../features/auth/PasswordRecovery/ui/PasswordRecoveryConfirm';
import { NewPassword } from '../../../features/auth/PasswordRecovery/ui/NewPassword';
import { Test } from '../../../features/test/Test';
import { Error404 } from './pages/Error404/Error404';

export const PATH = {
  LOGIN: '/login',
  REGISTRATION: '/registration',
  PROFILE: '/profile',
  PASSWORD_RECOVERY: '/password-recovery',
  PASSWORD_RECOVERY_CONFIRM: '/password-recovery-confirm',
  CREATE_NEW_PASSWORD: '/create-new-password',
  TEST: '/test',
  ERROR404: '/error-404',
};

export const Pages = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Navigate to={PATH.LOGIN} />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTRATION} element={<Registration />} />
      <Route path={PATH.PROFILE} element={<Profile />} />
      <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery />} />
      <Route path={PATH.PASSWORD_RECOVERY_CONFIRM} element={<PasswordRecoveryConfirm />} />
      <Route path={PATH.CREATE_NEW_PASSWORD + '/:token'} element={<NewPassword />} />
      <Route path={PATH.TEST} element={<Test />} />
      <Route path={PATH.ERROR404} element={<Error404 />} />
      <Route path={'*'} element={<Navigate to={PATH.ERROR404} />} />
    </Routes>
  );
};
