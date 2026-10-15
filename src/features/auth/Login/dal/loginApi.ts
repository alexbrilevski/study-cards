import { baseInstance } from '../../../../main/dal/instance';
import type { User } from '../../../../main/types/user';

export const loginAPI = {
  login(email: string, password: string, rememberMe: boolean) {
    return baseInstance
      .post<User>('auth/login', { email, password, rememberMe })
      .then((res) => res.data);
  },
};
