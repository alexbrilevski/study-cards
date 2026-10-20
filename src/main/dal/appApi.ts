import type { User } from '../types/user';
import { baseInstance } from './instance';

export const appAPI = {
  me() {
    return baseInstance.post<User>('auth/me', {}).then((response) => response.data);
  },
};
