import { useEffect, type FC } from "react";
import { useAppDispatch } from "../../../../bll/store";
import { setAppNotification, type AppNotification } from "../../../../bll/appReducer";
import s from "./Snackbar.module.css";

type SnackbarProps = {
  notification: AppNotification,
};

export const Snackbar: FC<SnackbarProps> = ({ notification }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeout_ID = setTimeout(() => {
      dispatch(setAppNotification(null));
    }, 3000);
    return () => {
      clearTimeout(timeout_ID);
    }
  }, []);

  return (
    <div className={`${s['snackbar']} ${s[notification.type]}`}>
      {notification.message}
    </div>
  );
};
