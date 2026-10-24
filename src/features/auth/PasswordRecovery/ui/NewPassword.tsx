import { useEffect, useState, type SubmitEvent } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../main/bll/store';
import { setNewPassword, setNewPasswordFormError } from '../bll/newPasswordReducer';
import { PATH } from '../../../../main/ui/Main/Pages';
import { Logo } from '../../../../main/ui/common/components/Logo/Logo';
import InputText from '../../../../main/ui/common/components/InputText/InputText';
import Button from '../../../../main/ui/common/components/Button/Button';

export const NewPassword = () => {
  const [password, setPassword] = useState<string>('');
  const success = useAppSelector<boolean>((state) => state.newPassword.success);
  const error = useAppSelector<string | null>((state) => state.newPassword.error);
  const dispatch = useAppDispatch();
  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    return () => {
      if (error) dispatch(setNewPasswordFormError(null));
    };
  }, [error]);

  const handleSetNewPassword = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (token) {
      dispatch(setNewPassword(password, token));
    }
  };

  if (success) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div className='form-container'>
      <div className='form-header'>
        <Logo />
        <h1>Create new password</h1>
      </div>
      <form onSubmit={handleSetNewPassword}>
        <span>Password</span>
        <InputText type={'password'} value={password} onChangeText={setPassword} />
        <p className='form-note'>
          Create new password and we will send you further instructions to email
        </p>
        <div className='form-actions'>
          <Button>Create new password</Button>
        </div>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};
