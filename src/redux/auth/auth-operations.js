import { createAsyncThunk } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';
import handerGoogleAuth from '../../components/Auth/Auth';
import {
  AddUser,
  token,
  LoginUser,
  LogOutUser,
  CheckUser,
  LoginUserFromGoogle,
  GetUserAfterRefresh,
} from '../../services/api';

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password, socialAuth, rejectWithValue }) => {
    try {
      const { data } = await AddUser({ email, password });
      return { data, socialAuth };
    } catch (error) {
      if (error.response.status === 409) {
        Notiflix.Notify.failure(
          'Данная почта уже зарегистрирована! Попробуйте ввести другую почту и повторить попытку.',
        );
        return rejectWithValue(
          'Упс...Что-то пошло не так, проверьте введенные данные и повторите попыту!)',
        );
      }
      return rejectWithValue(error.message);
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, socialAuth, rejectWithValue }) => {
    try {
      const { data } = await LoginUser({ email, password });
      token.set(data.accessToken);
      return { data, socialAuth };
    } catch (error) {
      if (error.response.status === 403) {
        Notiflix.Notify.failure(
          'Данная почта не зарегистрирована или не верный пароль! Проверьте данные и повторить попытку.',
        );
        return rejectWithValue(
          'Упс...Что-то пошло не так, проверьте введенные данные и повторите попыту!)',
        );
      }
      return rejectWithValue(error.message);
    }
  },
);

export const logOut = createAsyncThunk('auth/logout', async rejectWithValue => {
  try {
    await LogOutUser();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('sid');

    token.unset();
  } catch (error) {
    if (error.response.status === 400) {
      Notiflix.Notify.failure(
        'Упс...Что-то пошло не так, попробуйте обновить страницу и повторить попытку!)',
      );
      return rejectWithValue(
        'Упс...Что-то пошло не так, попробуйте обновить страницу и повторить попытку!)',
      );
    }
    return rejectWithValue(error.message);
  }
});

export const checkCurrentUser = createAsyncThunk(
  'auth/checkUser',
  async (rejectWithValue, thunkAPI) => {
    const state = thunkAPI.getState();

    const currentUserToken = state.auth.token;
    console.log(currentUserToken);

    const userSessionId = state.auth.sid;
    console.log(userSessionId);
    const id = {
      sid: userSessionId,
    };

    if (currentUserToken === null) return thunkAPI.rejectWithValue();

    token.set(currentUserToken);

    try {
      const { data } = await CheckUser(id);
      console.log(data);
      return data;
    } catch (error) {
      if (error.response.status === 400) {
        Notiflix.Notify.failure(
          'Упс...Что-то пошло не так, попробуйте выйти из аакаунта и зайти повторно!)',
        );
        return rejectWithValue(
          'Упс...Что-то пошло не так, попробуйте выйти из аакаунта и зайти повторно!)',
        );
      }
      return rejectWithValue(error.message);
    }
  },
);

export const loginFromGoogle = createAsyncThunk(
  'auth/google',
  async (handerGoogleAuth, rejectWithValue) => {
    try {
      const { data } = await LoginUserFromGoogle();
      console.log(data);
      handerGoogleAuth(data);
    } catch (error) {
      if (error.response.status === 400) {
        Notiflix.Notify.failure(
          'Упс...Что-то пошло не так, попробуйте выйти из аакаунта и зайти повторно!)',
        );
        return rejectWithValue(
          'Упс...Что-то пошло не так, попробуйте выйти из аакаунта и зайти повторно!)',
        );
      }
      return rejectWithValue(error.message);
    }
  },
);

export const getUser = createAsyncThunk(
  'auth/getUser',
  async ({ accessToken, refreshToken, sid, rejectWithValue }) => {
    try {
      token.set(accessToken);
      const { data } = await GetUserAfterRefresh();
      console.log('DataAfterRefresh-GetUser', data);
      return { data, refreshToken, sid, accessToken };
    } catch (error) {
      if (error.response.status === 400) {
        Notiflix.Notify.failure(
          'Упс...Что-то пошло не так, попробуйте выйти из аакаунта и зайти повторно!)',
        );
        return rejectWithValue(
          'Упс...Что-то пошло не так, попробуйте выйти из аакаунта и зайти повторно!)',
        );
      }
      return rejectWithValue(error.message);
    }
  },
);
