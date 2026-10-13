import { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../main/bll/store';
import { register } from '../bll/registrationReducer';
import { PATH } from '../../../../main/ui/Main/Pages';
import InputText from '../../../../main/ui/common/components/InputText/InputText';
import Button from '../../../../main/ui/common/components/Button/Button';

export const Registration = () => {
  const isLoading = useAppSelector<boolean>(state => state.app.isLoading);
  const success = useAppSelector<boolean>(state => state.registration.success);
  const error = useAppSelector<null | string>(state => state.registration.error);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleRegister = useCallback(() => {
    dispatch(register({ email, password, passwordConfirm }));
  }, [email, password, passwordConfirm]);

  if (success) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div>
      <p>Study Cards</p>
      <h1>Sign Up</h1>
      <InputText type={'email'} value={email} onChangeText={setEmail} />
      <InputText type={'password'} value={password} onChangeText={setPassword} />
      <InputText type={'password'} value={passwordConfirm} onChangeText={setPasswordConfirm} />
      <Button>Cancel</Button>
      <Button onClick={handleRegister} disabled={isLoading}>Register</Button>
      {error && <p>{error}</p>}
    </div>
  );
};
