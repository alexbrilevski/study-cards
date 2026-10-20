import { useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import type { User } from '../../../main/types/user';
import { useAppDispatch, useAppSelector } from '../../../main/bll/store';
import { saveUpdatedUserData, setEditProfileFormError } from '../bll/profileReducer';
import InputText from '../../../main/ui/common/components/InputText/InputText';
import Button from '../../../main/ui/common/components/Button/Button';

type EditProfileFormProps = {
  user: User;
};

type EditProfileFormErrors = {
  name?: string;
  avatar?: string;
};

export const EditProfileForm: FC<EditProfileFormProps> = ({ user }) => {
  const isLoading = useAppSelector<boolean>((state) => state.app.isLoading);
  const error = useAppSelector<string | null>((state) => state.profile.error);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) dispatch(setEditProfileFormError(null));
  }, [error]);

  const editProfileForm = useFormik({
    initialValues: {
      avatar: user.avatar || '',
      name: user.name,
      email: user.email,
    },

    validate: ({ name }) => {
      const errors: EditProfileFormErrors = {};

      if (name.trim().length === 0) {
        errors.name = 'Required';
      }

      return errors;
    },

    onSubmit({ name, avatar }) {
      if (error) dispatch(setEditProfileFormError(null));
      dispatch(saveUpdatedUserData(name, avatar));
    },
  });

  const handleCancelEdit = () => {
    navigate('/');
  };

  return (
    <form onSubmit={editProfileForm.handleSubmit}>
      <span>Name</span>
      <InputText {...editProfileForm.getFieldProps('name')} />
      {editProfileForm.errors.name && editProfileForm.touched.name && (
        <div>{editProfileForm.errors.name}</div>
      )}
      <span>Email</span>
      <InputText {...editProfileForm.getFieldProps('email')} readOnly />
      <div>
        <Button type={'button'} onClick={handleCancelEdit} disabled={isLoading}>
          Cancel
        </Button>
        <Button type={'submit'} disabled={isLoading}>
          Save
        </Button>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
};
