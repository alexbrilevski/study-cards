import { NavLink } from 'react-router-dom';
import { PATH } from '../../../../main/ui/Main/Pages';
import { LoginForm } from './LoginForm';

export const Login = () => {
  return (
    <div>
      <p>Study Cards</p>
      <h1>Sign In</h1>
      <LoginForm />
      <p>Don’t have an account?</p>
      <NavLink to={PATH.REGISTRATION}>Sign Up</NavLink>
    </div>
  );
};
