import { useAppSelector } from "../../../../main/bll/store";

export const PasswordRecoveryConfirm = () => {
  const recoveryEmail = useAppSelector<string>(state => state.passwordRecovery.recoveryEmail)

  return (
    <div>
      <p>Study Cards</p>
      <h1>Check Email</h1>
      <p>{`We've sent an Email with instructions to ${recoveryEmail}`}</p>
    </div>
  );
};
