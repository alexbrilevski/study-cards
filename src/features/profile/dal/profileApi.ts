import { baseInstance } from '../../../main/dal/instance';
import type { User } from '../../../main/types/user';

type APIResponseData = {
  updatedUser: User,
};

export const profileAPI = {
  updateUserData(name: string, avatar: string) {
    return baseInstance
      .put<APIResponseData>('auth/me', { name, avatar })
      .then((response) => response.data);
  },
};
