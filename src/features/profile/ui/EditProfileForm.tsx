import { useEffect, type FC } from 'react';
import type { User } from '../../../main/types/user';
import { useAppDispatch, useAppSelector } from '../../../main/bll/store';
import { saveUpdatedUserData, setEditProfileFormError } from '../bll/profileReducer';
import { EditableText } from '../../../main/ui/common/components/EditableTextField/EditableTextField';
import { IconSvg } from '../../../main/ui/common/components/IconSvg/IconSvg';
import defaultAvatar from '../../../assets/images/default-avatar.svg';
import photoIcon from '../../../assets/icons/photo.svg';
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
      <div className={s['user-avatar-container']}>
        <img
          className={s['user-avatar']}
          src={user.avatar || defaultAvatar}
          alt=""
          width="96"
          height="96"
        />
        <button className={s['upload-photo-button']}>
          <IconSvg src={photoIcon} size={18} />
        </button>
      </div>
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
