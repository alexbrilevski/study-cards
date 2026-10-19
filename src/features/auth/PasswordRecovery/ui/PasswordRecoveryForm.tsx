import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../../main/bll/store';
import {
  recoverPassword,
  setPasswordRecoveryFormError,
} from '../bll/passwordRecoveryReducer';
import InputText from '../../../../main/ui/common/components/InputText/InputText';
import Button from '../../../../main/ui/common/components/Button/Button';

type PasswordRecoveryFormError = {
  email?: string;
};

export const PasswordRecoveryForm = () => {
  const error = useAppSelector<string | null>((state) => state.passwordRecovery.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      if (error) dispatch(setPasswordRecoveryFormError(null));
    };
  }, [error]);

  const passwordRecoveryForm = useFormik({
    initialValues: {
      email: '',
    },

    validate: ({ email }) => {
      const errors: PasswordRecoveryFormError = {};

      if (!email) {
        errors.email = 'Required';
      } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = 'Invalid email address';
      }

      return errors;
    },

    onSubmit: ({ email }) => {
      if (error) dispatch(setPasswordRecoveryFormError(null));
      dispatch(recoverPassword(email));
    },
  });

  return (
    <form onSubmit={passwordRecoveryForm.handleSubmit}>
      <span>Email</span>
      <InputText type={'email'} {...passwordRecoveryForm.getFieldProps('email')} />
      {passwordRecoveryForm.errors.email && passwordRecoveryForm.touched.email && (
        <div>{passwordRecoveryForm.errors.email}</div>
      )}
      <p>Enter your email address and we will send you further instructions</p>
      <Button>Send Instructions</Button>
      {error && <p>{error}</p>}
    </form>
  );
};
