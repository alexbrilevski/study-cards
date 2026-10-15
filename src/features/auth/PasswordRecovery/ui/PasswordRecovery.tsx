import { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../main/bll/store';
import { recoverPassword } from '../bll/passwordRecoveryReducer';
import { PATH } from '../../../../main/ui/Main/Pages';
import Button from '../../../../main/ui/common/components/Button/Button';
import InputText from '../../../../main/ui/common/components/InputText/InputText';

export const PasswordRecovery = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [email, setEmail] = useState<string>('');
  const recoveryEmail = useAppSelector<string>(
    (state) => state.passwordRecovery.recoveryEmail,
  );
  const error = useAppSelector<null | string>((state) => state.passwordRecovery.error);
  const dispatch = useAppDispatch();
  const message = `<div>Password recovery link:<a href='${baseURL}/#/create-new-password/$token$'>link</a></div>`;

  if (recoveryEmail) {
    return <Navigate to={PATH.PASSWORD_RECOVERY_CONFIRM} />;
  }

  const onClickHandler = () => {
    dispatch(recoverPassword(email, message));
  };

  return (
    <div>
      <p>Study Cards</p>
      <h1>Forgot your password?</h1>
      <InputText
        type={'email'}
        placeholder={'Email'}
        value={email}
        onChangeText={setEmail}
      />
      <p>
        Enter your email address and we will send you further instructions
      </p>
      <Button onClick={onClickHandler}>Send Instructions</Button>
      {error && <p>{error}</p>}
      <p>Did you remember your password?</p>
      <NavLink to={PATH.LOGIN}>
        Try logging in
      </NavLink>
    </div>
  );
};
