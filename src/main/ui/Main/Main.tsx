import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../bll/store';
import { initializeApp } from '../../bll/appReducer';
import { Header } from './Header/Header';
import { Pages } from './Pages';
import { Spinner } from '../common/components/Spinner/Spinner';

export const Main = () => {
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized);
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
    </>
  );
};
