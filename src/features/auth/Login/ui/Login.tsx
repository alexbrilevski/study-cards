import { Navigate, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../../main/bll/store';
import type { User } from '../../../../main/types/user';
import { PATH } from '../../../../main/ui/Main/Pages';
import { Logo } from '../../../../main/ui/common/components/Logo/Logo';
import { LoginForm } from './LoginForm';

export const Login = () => {
  const authUser = useAppSelector<User | null>((state) => state.profile.user);

  if (authUser) {
    return <Navigate to={PATH.PROFILE} />;
  }

  return (
    <div className="card form-container">
      <div className="form-header">
        <Logo />
        <h1>Sign In</h1>
      </div>
      <LoginForm />
      <div className="form-footer">
        <p className="form-note">Don’t have an account?</p>
        <NavLink to={PATH.REGISTRATION}>Sign Up</NavLink>
      </div>
    </div>
  );
};
