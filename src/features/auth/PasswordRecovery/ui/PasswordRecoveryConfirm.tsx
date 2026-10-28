import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../main/bll/store';
import { setRecoveryEmail } from '../bll/passwordRecoveryReducer';
import { PATH } from '../../../../main/ui/Main/Pages';
import { Logo } from '../../../../main/ui/common/components/Logo/Logo';
import checkEmailImg from '../../../../assets/images/check-email.svg';
import Button from '../../../../main/ui/common/components/Button/Button';

export const PasswordRecoveryConfirm = () => {
  const recoveryEmail = useAppSelector<string>(
    (state) => state.passwordRecovery.recoveryEmail,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleBackToLoginClick = () => {
    dispatch(setRecoveryEmail(''));
    navigate(PATH.LOGIN);
  };

  if (!recoveryEmail) {
    return <Navigate to={PATH.PASSWORD_RECOVERY} />;
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <Logo />
        <h1>Check Email</h1>
      </div>
      <p className="form-image text-center">
        <img src={checkEmailImg} width="108" height="108" alt="" />
      </p>
      <p className="form-note text-center">
        {`We've sent an Email with instructions to ${recoveryEmail}`}
      </p>
      <div className="form-actions">
        <Button variant={'contained'} color={'primary'} onClick={handleBackToLoginClick}>
          Back to login
        </Button>
      </div>
    </div>
  );
};
