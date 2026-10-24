import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../../main/bll/store';
import { register, setRegistrationFormError } from '../bll/registrationReducer';
import InputText from '../../../../main/ui/common/components/InputText/InputText';
import Button from '../../../../main/ui/common/components/Button/Button';

type RegistrationFormErrors = {
  email?: string;
  password?: string;
  passwordConfirm?: string;
};

export const RegistrationFrom = () => {
  const isLoading = useAppSelector<boolean>((state) => state.app.isLoading);
  const error = useAppSelector<string | null>((state) => state.registration.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      if (error) dispatch(setRegistrationFormError(null));
    };
  }, [error]);

  const registrationForm = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },

    validate: ({ email, password, passwordConfirm }) => {
      const errors: RegistrationFormErrors = {};

      if (!email) {
        errors.email = 'Required';
      } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = 'Invalid email address';
      }

      if (!password) {
        errors.password = 'Required';
      }

      if (!passwordConfirm) {
        errors.passwordConfirm = 'Required';
      }

      return errors;
    },

    onSubmit: ({ email, password, passwordConfirm }) => {
      if (error) dispatch(setRegistrationFormError(null));
      dispatch(register({ email, password, passwordConfirm }));
    },
  });

  return (
    <form onSubmit={registrationForm.handleSubmit}>
      <span>Email</span>
      <InputText type={'email'} {...registrationForm.getFieldProps('email')} />
      {registrationForm.errors.email && registrationForm.touched.email && (
        <div>{registrationForm.errors.email}</div>
      )}
      <span>Password</span>
      <InputText type={'password'} {...registrationForm.getFieldProps('password')} />
      {registrationForm.errors.password && registrationForm.touched.password && (
        <div>{registrationForm.errors.password}</div>
      )}
      <span>Confirm password</span>
      <InputText
        type={'password'}
        {...registrationForm.getFieldProps('passwordConfirm')}
      />
      {registrationForm.errors.passwordConfirm &&
        registrationForm.touched.passwordConfirm && (
          <div>{registrationForm.errors.passwordConfirm}</div>
        )}
      <div className='form-actions'>
        <Button disabled={isLoading} type={'submit'}>
          Register
        </Button>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
};
