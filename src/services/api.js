import axios from 'axios';

axios.defaults.baseURL = 'https://kapusta-backend.goit.global';

export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const AddUser = async user => axios.post('/auth/register', user);

export const LoginUser = async user => axios.post('/auth/login', user);
export const LogOutUser = async () => axios.post('/auth/logout');
export const CheckUser = async id => axios.post('/auth/refresh', id);
export const LoginUserFromGoogle = async () => axios.get('/auth/google');
export const GetUserAfterRefresh = async () => axios.get('/user');
