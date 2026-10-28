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
      <InputText
        type={'email'}
        label={'Email'}
        error={
          registrationForm.errors.email && registrationForm.touched.email
            ? registrationForm.errors.email
            : ''
        }
        {...registrationForm.getFieldProps('email')}
      />
      <InputText
        type={'password'}
        label={'Password'}
        error={
          registrationForm.errors.password && registrationForm.touched.password
            ? registrationForm.errors.password
            : ''
        }
        {...registrationForm.getFieldProps('password')}
      />
      <InputText
        type={'password'}
        label={'Confirm password'}
        error={
          registrationForm.errors.passwordConfirm &&
          registrationForm.touched.passwordConfirm
            ? registrationForm.errors.passwordConfirm
            : ''
        }
        {...registrationForm.getFieldProps('passwordConfirm')}
      />
      <div className="form-actions">
        <Button
          type={'submit'}
          variant={'contained'}
          color={'primary'}
          disabled={isLoading}
        >
          Register
        </Button>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
};
