import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../../main/bll/store';
import { login } from '../bll/loginReducer';
import { PATH } from '../../../../main/ui/Main/Pages';
import InputText from '../../../../main/ui/common/components/InputText/InputText';
import Checkbox from '../../../../main/ui/common/components/Checkbox/Checkbox';
import Button from '../../../../main/ui/common/components/Button/Button';

type LoginFormError = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: (values) => {
      const errors: LoginFormError = {};

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
      dispatch(login(values.email, values.password, values.rememberMe));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <span>Email</span>
      <InputText type="email" {...formik.getFieldProps('email')} />
      {formik.errors.email && formik.touched.email && <div>{formik.errors.email}</div>}
      <span>Password</span>
      <InputText type="password" {...formik.getFieldProps('password')} />
      {formik.errors.password && formik.touched.password && (
        <div>{formik.errors.password}</div>
      )}
      <label>
        <Checkbox {...formik.getFieldProps('rememberMe')} />
        Remember me
      </label>
      <NavLink to={PATH.PASSWORD_RECOVERY}>Forget password?</NavLink>
      <Button type={'submit'}>Login</Button>
    </form>
  );
};
