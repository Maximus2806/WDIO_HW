import { ICreds } from '../../data/types/user.types.js';
export const adminCreds: ICreds = {
  email: `${process.env.ADMIN_USER_NAME}`,
  password: `${process.env.ADMIN_PASSWORD}`
};
