import { useEffect } from 'react';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../main/bll/store';
import { login, setLoginFormError } from '../bll/loginReducer';
import { PATH } from '../../../../main/ui/Main/Pages';
import InputText from '../../../../main/ui/common/components/InputText/InputText';
import Checkbox from '../../../../main/ui/common/components/Checkbox/Checkbox';
import Button from '../../../../main/ui/common/components/Button/Button';

type LoginFormErrors = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

export const LoginForm = () => {
  const error = useAppSelector<string | null>((state) => state.login.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      if (error) dispatch(setLoginFormError(null));
    };
  }, [error]);

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },

    validate: (values) => {
      const errors: LoginFormErrors = {};

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.trim().length < 3) {
        errors.password = 'Min 3 symbols';
      }
      return errors;
    },

    onSubmit: (values) => {
      if (error) dispatch(setLoginFormError(null));
      dispatch(login(values.email, values.password, values.rememberMe));
    },
  });

  return (
    <form onSubmit={loginForm.handleSubmit}>
      <span>Email</span>
      <InputText type="email" {...loginForm.getFieldProps('email')} />
      {loginForm.errors.email && loginForm.touched.email && (
        <div>{loginForm.errors.email}</div>
      )}
      <span>Password</span>
      <InputText type="password" {...loginForm.getFieldProps('password')} />
      {loginForm.errors.password && loginForm.touched.password && (
        <div>{loginForm.errors.password}</div>
      )}
      <label>
        <Checkbox {...loginForm.getFieldProps('rememberMe')} />
        Remember me
      </label>
      <NavLink to={PATH.PASSWORD_RECOVERY}>Forgot password</NavLink>
      <Button type={'submit'}>Login</Button>
      {error && <p>{error}</p>}
    </form>
  );
};
