import { useAppSelector } from '../../../../main/bll/store';
import { Logo } from '../../../../main/ui/common/components/Logo/Logo';

export const PasswordRecoveryConfirm = () => {
  const recoveryEmail = useAppSelector<string>(
    (state) => state.passwordRecovery.recoveryEmail,
  );

  return (
    <div>
      <Logo />
      <h1>Check Email</h1>
      <p>{`We've sent an Email with instructions to ${recoveryEmail}`}</p>
    </div>
  );
};
