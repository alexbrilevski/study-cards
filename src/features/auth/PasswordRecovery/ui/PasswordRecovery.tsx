import { Navigate, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../../main/bll/store';
import { PATH } from '../../../../main/ui/Main/Pages';
import { PasswordRecoveryForm } from './PasswordRecoveryForm';

export const PasswordRecovery = () => {
  const recoveryEmail = useAppSelector<string>(
    (state) => state.passwordRecovery.recoveryEmail,
  );

  if (recoveryEmail) {
    return <Navigate to={PATH.PASSWORD_RECOVERY_CONFIRM} />;
  }

  return (
    <div>
      <p>Study Cards</p>
      <h1>Forgot your password?</h1>
      <PasswordRecoveryForm />
      <p>Did you remember your password?</p>
      <NavLink to={PATH.LOGIN}>Try logging in</NavLink>
    </div>
  );
};
