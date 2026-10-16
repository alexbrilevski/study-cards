import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../main/bll/store";
import { setNewPassword } from "../bll/newPasswordReducer";
import { PATH } from "../../../../main/ui/Main/Pages";
import InputText from "../../../../main/ui/common/components/InputText/InputText";
import Button from "../../../../main/ui/common/components/Button/Button";

export const NewPassword = () => {
  const [password, setPassword] = useState<string>('');
  const success = useAppSelector<boolean>((state) => state.newPassword.success);
  const error = useAppSelector<null | string>((state) => state.newPassword.error);
  const dispatch = useAppDispatch();
  const { token } = useParams<{ token: string }>();

  const handleSetNewPassword = () => {
    if (token) {
      dispatch(setNewPassword(password, token));
    }
  };

  if (success) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div>
      <p>Study Cards</p>
      <h1>Create new password</h1>
      <InputText
        type={'password'}
        placeholder={'Password'}
        value={password}
        onChangeText={setPassword}
      />
      <p>Create new password and we will send you further instructions to email</p>
      <Button onClick={handleSetNewPassword}>Create new password</Button>
      {error && <p>{error}</p>}
    </div>
  );
};
