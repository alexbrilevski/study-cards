import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../bll/store';
import { initializeApp, type AppNotification } from '../../bll/appReducer';
import { Header } from './Header/Header';
import { Pages } from './Pages';
import { Spinner } from '../common/components/Spinner/Spinner';
import { Snackbar } from '../common/components/Snackbar/Snackbar';

export const Main = () => {
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized);
  const notification = useAppSelector<AppNotification | null>(state => state.app.notification);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  if (!isInitialized) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <Pages />
      {notification && <Snackbar notification={notification} />}
    </>
  );
};
