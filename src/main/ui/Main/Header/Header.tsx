import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../bll/store';
import { logout } from '../../../../features/auth/Login/bll/loginReducer';
import { PATH } from '../Pages';
import Button from '../../common/components/Button/Button';
import s from './Header.module.css';

export const Header = () => {
  const userId = useAppSelector<string>(state => state.login._id);
  const dispatch = useAppDispatch();

  const getNavLinkStyle = (NavData: { isActive: boolean }) => {
    return NavData.isActive ? `${s['item']} ${s['active']}` : s['item'];
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <div className={s['navbar']}>
        <NavLink to={PATH.LOGIN} className={(NavData) => getNavLinkStyle(NavData)}>
          Login
        </NavLink>
        <NavLink to={PATH.REGISTRATION} className={(NavData) => getNavLinkStyle(NavData)}>
          Registration
        </NavLink>
        <NavLink to={PATH.PROFILE} className={(NavData) => getNavLinkStyle(NavData)}>
          Profile
        </NavLink>
        <NavLink to={PATH.PASSWORD_RECOVERY} className={(NavData) => getNavLinkStyle(NavData)}>
          Password recovery
        </NavLink>
        <NavLink to={PATH.CREATE_NEW_PASSWORD} className={(NavData) => getNavLinkStyle(NavData)}>
          Create new password
        </NavLink>
        <NavLink to={PATH.TEST} className={(NavData) => getNavLinkStyle(NavData)}>
          Test
        </NavLink>
        {userId && <Button onClick={handleLogout}>Logout</Button>}
      </div>
    </header>
  );
};
