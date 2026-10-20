import { baseInstance } from '../../../../main/dal/instance';

type APIResponseData = {
  error: string;
};

export const registrationAPI = {
  register(email: string, password: string) {
    return baseInstance
      .post<APIResponseData>('auth/register', { email, password })
      .then((response) => response.data);
  },
};
