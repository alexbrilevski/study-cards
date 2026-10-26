import { useAppSelector } from '../../../main/bll/store';
import type { User } from '../../../main/types/user';
import { Navigate } from 'react-router-dom';
import { EditProfileForm } from './EditProfileForm';

export const Profile = () => {
  const user = useAppSelector<User | null>((state) => state.profile.user);

  if (!user) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Personal Information</h1>
      </div>
      <EditProfileForm user={user} />
    </div>
  );
};
