import cookie from 'js-cookie';
import { ACCESS_TOKEN_NAME } from 'constants/app';

export const getToken = () => cookie.get(ACCESS_TOKEN_NAME);
export const setToken = token => cookie.set(ACCESS_TOKEN_NAME, token);
export const removeToken = () => cookie.remove(ACCESS_TOKEN_NAME);

export default {
  getToken,
  setToken,
  removeToken,
};
