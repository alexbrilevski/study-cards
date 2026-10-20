import axios, { AxiosError } from 'axios';
import type { Dispatch } from 'redux';
import { setAppNotification } from '../main/bll/appReducer';

export const handleApiRequestError = (error: Error | AxiosError, dispatch: Dispatch) => {
  const errorMessage = axios.isAxiosError(error)
    ? (error.response?.data as { error: string }).error
    : error.message + ', more details in the console';
  console.log('Error: ', errorMessage);

  dispatch(setAppNotification({ type: 'error', message: errorMessage }));
};
