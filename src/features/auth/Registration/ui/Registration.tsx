import { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../main/bll/store';
import { register, setSuccess } from '../bll/registrationReducer';
import { PATH } from '../../../../main/ui/Main/Pages';
import InputText from '../../../../main/ui/common/components/InputText/InputText';
import Button from '../../../../main/ui/common/components/Button/Button';

export const Registration = () => {
  const isLoading = useAppSelector<boolean>((state) => state.app.isLoading);
  const success = useAppSelector<boolean>((state) => state.registration.success);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [passwordConfirmError, setPasswordConfirmError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      dispatch(setSuccess(false));
    };
  }, []);

  const handleRegister = useCallback(() => {
    if (password !== passwordConfirm) {
      setPasswordConfirmError('Passwords don\'t match');
      return;
    }
    if (passwordConfirmError) {
      setPasswordConfirmError(null);
    }
    dispatch(register({ email, password, passwordConfirm }));
  }, [email, password, passwordConfirm, passwordConfirmError]);

  if (success) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div>
      <p>Study Cards</p>
      <h1>Sign Up</h1>
      <span>Email</span>
      <InputText type={'email'} value={email} onChangeText={setEmail} />
      <span>Password</span>
      <InputText type={'password'} value={password} onChangeText={setPassword} />
      <span>Confirm password</span>
      <InputText
        type={'password'}
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
      />
      <Button>Cancel</Button>
      <Button onClick={handleRegister} disabled={isLoading}>
        Register
      </Button>
      {passwordConfirmError && <p>{passwordConfirmError}</p>}
    </div>
  );
};
