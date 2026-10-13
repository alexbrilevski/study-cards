import { baseInstance } from '../../../../main/dal/instance';

type APIResponse = {
  error: string,
};

export const registrationAPI = {
  register(email: string, password: string) {
    return baseInstance.post<APIResponse>('auth/register', { email, password });
  },
};
