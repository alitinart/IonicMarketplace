export interface User {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: Date;
  localId: string;
  registered?: boolean;
  userName?: string;
  address?: string;
  phoneNumber?: number;
}
