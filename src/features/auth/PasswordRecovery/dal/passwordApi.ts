import { baseInstance } from '../../../../main/dal/instance';

type APIResponseData = {
  info: string;
  error: string | null;
};

export const passwordAPI = {
  forgot(email: string, message: string) {
    return baseInstance.post<APIResponseData>('auth/forgot', { email, message }).then(response => response.data);
  },
};
