import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import type { User } from '../../../main/types/user';
import { useAppDispatch } from '../../../main/bll/store';
import { saveUpdatedUserData } from '../bll/profileReducer';
import InputText from '../../../main/ui/common/components/InputText/InputText';
import Button from '../../../main/ui/common/components/Button/Button';

type EditProfileFormProps = {
  user: User,
};

type ProfileFormError = {
  name?: string;
  avatar?: string;
};

export const EditProfileForm: FC<EditProfileFormProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      avatar: user.avatar || '',
      name: user.name,
      email: user.email,
    },
    validate: (values) => {
      const errors: ProfileFormError = {};

      if (values.name.trim().length === 0) {
        errors.name = 'Required';
      }

      return errors;
    },
    onSubmit(values) {
      dispatch(saveUpdatedUserData(values.name, values.avatar));
    },
  });

  const handleCancelEdit = () => {
    navigate('/');
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <InputText {...formik.getFieldProps('name')} />
      <InputText {...formik.getFieldProps('email')} readOnly />
      <div>
        <Button type={'button'} onClick={handleCancelEdit}>
          Cancel
        </Button>
        <Button>Save</Button>
      </div>
    </form>
  );
};
