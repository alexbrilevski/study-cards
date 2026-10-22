import { Navigate, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../../main/bll/store';
import { PATH } from '../../../../main/ui/Main/Pages';
import { Logo } from '../../../../main/ui/common/components/Logo/Logo';
import { PasswordRecoveryForm } from './PasswordRecoveryForm';

export const PasswordRecovery = () => {
  const recoveryEmail = useAppSelector<string>(
    (state) => state.passwordRecovery.recoveryEmail,
  );

  if (recoveryEmail) {
    return <Navigate to={PATH.PASSWORD_RECOVERY_CONFIRM} />;
  }

  return (
    <div className='form-container'>
      <div className='form-header'>
        <Logo />
        <h1>Forgot your password?</h1>
      </div>
      <PasswordRecoveryForm />
      <div className='form-footer'>
        <p>Did you remember your password?</p>
        <NavLink to={PATH.LOGIN}>Try logging in</NavLink>
      </div>
    </div>
  );
};
