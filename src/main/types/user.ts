export type User = {
  _id: string,
  email: string,
  name: string,
  avatar?: string,
  publicCardPacksCount: number,
  created: number,
  updated: number,
  isAdmin: boolean,
  verified: boolean,
  rememberMe: boolean,
  error?: string,
}
