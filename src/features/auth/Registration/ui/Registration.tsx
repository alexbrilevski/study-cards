import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../main/bll/store';
import { setRegistrationSuccess } from '../bll/registrationReducer';
import { PATH } from '../../../../main/ui/Main/Pages';
import { Logo } from '../../../../main/ui/common/components/Logo/Logo';
import { RegistrationFrom } from './RegistrationFrom';

export const Registration = () => {
  const success = useAppSelector<boolean>((state) => state.registration.success);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(setRegistrationSuccess(false));
    };
  }, []);

  if (success) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div className='form-container'>
      <Logo />
      <h1>Sign Up</h1>
      <RegistrationFrom />
    </div>
  );
};
