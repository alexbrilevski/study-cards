import type { User } from '../../../main/types/user';
import { useAppDispatch, useAppSelector } from '../../../main/bll/store';
import { logout } from '../../auth/Login/bll/loginReducer';
import { Navigate, useNavigate } from 'react-router-dom';
import { PATH } from '../../../main/ui/Main/Pages';
import { EditProfileForm } from './EditProfileForm';
import ButtonBack from '../../../main/ui/common/components/ButtonBack/ButtonBack';
import Button from '../../../main/ui/common/components/Button/Button';
import { IconSvg } from '../../../main/ui/common/components/IconSvg/IconSvg';
import logoutIcon from '../../../assets/icons/logout.svg';

export const Profile = () => {
  const user = useAppSelector<User | null>((state) => state.profile.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  const handleBackButtonClick = () => {
    navigate(PATH.PACK_LIST);
  };

  if (!user) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <ButtonBack caption={'Back to Pack List'} onClick={handleBackButtonClick} />
      <div className="card form-container">
        <div className="form-header">
          <h1>Personal Information</h1>
        </div>
        <EditProfileForm user={user} />
        <div className="form-footer">
          <Button variant={'contained'} color={'white'} onClick={handleLogoutClick}>
            <IconSvg src={logoutIcon} size={16} />
            <span>Log out</span>
          </Button>
        </div>
      </div>
    </>
  );
};
