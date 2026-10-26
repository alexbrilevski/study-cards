import { useEffect, type FC } from 'react';
import type { User } from '../../../main/types/user';
import { useAppDispatch, useAppSelector } from '../../../main/bll/store';
import { saveUpdatedUserData, setEditProfileFormError } from '../bll/profileReducer';
import { EditableText } from '../../../main/ui/common/components/EditableTextField/EditableTextField';
import s from './EditProfileForm.module.css';

type EditProfileFormProps = {
  user: User;
};

export const EditProfileForm: FC<EditProfileFormProps> = ({ user }) => {
  const isLoading = useAppSelector<boolean>((state) => state.app.isLoading);
  const error = useAppSelector<string | null>((state) => state.profile.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) dispatch(setEditProfileFormError(null));
  }, [error]);

  const handleSaveName = (name: string) => {
    if (error) dispatch(setEditProfileFormError(null));
    dispatch(saveUpdatedUserData(name, user.avatar || ''));
  };

  return (
    <div className={s['user-info']}>
      <EditableText
        text={user.name}
        inputLabel={'Name'}
        inputName={'name'}
        disabled={isLoading}
        onSave={handleSaveName}
      />
      <p className={s['user-email']}>{user.email}</p>
      {error && <p>{error}</p>}
    </div>
  );
};
