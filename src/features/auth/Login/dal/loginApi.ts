import { baseInstance } from '../../../../main/dal/instance';

type APIResponseData = {
  _id: string,
  email: string,
  name: string,
  avatar: string,
  publicCardPacksCount: number,
  created: number,
  updated: number,
  isAdmin: boolean,
  verified: boolean,
  rememberMe: boolean,
  error: string,
};

export const loginAPI = {
  login(email: string, password: string, rememberMe: boolean) {
    return baseInstance
      .post<APIResponseData>('auth/login', { email, password, rememberMe })
      .then((res) => res.data);
  },
};
