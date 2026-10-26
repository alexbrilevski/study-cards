import type { User } from '../../../main/types/user';
import { useAppDispatch, useAppSelector } from '../../../main/bll/store';
import { logout } from '../../auth/Login/bll/loginReducer';
import { Navigate } from 'react-router-dom';
import { EditProfileForm } from './EditProfileForm';
import Button from '../../../main/ui/common/components/Button/Button';
import { IconSvg } from '../../../main/ui/common/components/IconSvg/IconSvg';
import logoutIcon from '../../../assets/icons/logout.svg';

export const Profile = () => {
  const user = useAppSelector<User | null>((state) => state.profile.user);
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  if (!user) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Personal Information</h1>
      </div>
      <EditProfileForm user={user} />
      <div className="form-footer">
        <Button onClick={handleLogoutClick}>
          <IconSvg src={logoutIcon} size={16} />
          Log out
        </Button>
      </div>
    </div>
  );
};
