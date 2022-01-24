import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { token } from '../services/api';

export const addIncomeTransaction = createAsyncThunk(
  'transactions/addIncome',
  async (transaction, thunkAPI) => {
    const state = thunkAPI.getState();
    token.set(state.auth.token);
    try {
      const { data } = await axios.post('/transaction/income', transaction);
      const {
        data: { monthsStats },
      } = await axios.get('/transaction/income');
      return { data, monthsStats };
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const getIncomeTransactions = createAsyncThunk(
  'transactions/getIncomes',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    token.set(state.auth.token);
    try {
      const { data } = await axios.get('/transaction/income');
      // we receive incomes and monthly stats - I use only incomes so far
      return data;
    } catch (error) {
      alert(error.message);
    }
  },
);

export const addExpenseTransaction = createAsyncThunk(
  'transactions/addExpense',
  async (transaction, thunkAPI) => {
    const state = thunkAPI.getState();
    token.set(state.auth.token);

    try {
      const { data } = await axios.post('/transaction/expense', transaction);
      const {
        data: { monthsStats },
      } = await axios.get('/transaction/expense');
      // returns newBalance and new transaction
      console.log('Its balance', data);
      return { data, monthsStats };
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const getExpensesTransactions = createAsyncThunk(
  'transactions/getExpenses',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    token.set(state.auth.token);
    console.log('token', state.auth.token);
    try {
      const { data } = await axios.get('/transaction/expense');
      console.log('expenses', data);
      // we receive expenses and monthly stats - I use only incomes so far
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async props => {
    try {
      const { itemId, transactionsType } = props;
      console.log('TRANSAC', transactionsType);

      const { data } = await axios.delete(`/transaction/${itemId}`);
      let { data: expenseStats } = await axios.get('/transaction/expense');
      let { data: incomeStats } = await axios.get('/transaction/income');

      let updStats =
        transactionsType === 'expenses' ? expenseStats : incomeStats;

      console.log(data, itemId, updStats);
      return { data, itemId, updStats };
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const getIncomesCategories = createAsyncThunk(
  'transactions/getIncomesCategories',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    token.set(state.auth.token);
    try {
      const { data } = await axios.get('/transaction/income-categories');
      // we receive incomes and monthly stats - I use only incomes so far

      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const getExpensesCategories = createAsyncThunk(
  'transactions/getExpensesCategories',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    token.set(state.auth.token);
    try {
      const { data } = await axios.get('/transaction/expense-categories');
      // we receive incomes and monthly stats - I use only incomes so far

      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const updateBalance = createAsyncThunk(
  'transactions/updateBalance',
  async (balance, thunkAPI) => {
    const state = thunkAPI.getState();
    token.set(state.auth.token);
    try {
      const { data } = await axios.patch('/user/balance', balance);
      console.log('!!!!!!!!!!!!!', data);
      return data.newBalance;
    } catch (error) {
      alert(error.message);
    }
  },
);

export const getDataMonth = createAsyncThunk(
  'transactions/getDataMonth',
  async credentials => {
    console.log('Credentials DATAMONTH', credentials);
    try {
      // const { data } = await axios.get(
      //   `/transaction/period-data?date=${credentials}`,
      const { data } = await axios.get(
        `/transaction/period-data?date=${credentials}`,
      );
      console.log('DATAMONTH', data);
      return data;
    } catch (error) {
      console.log('DataMonth error', error.message);
    }
  },
);

export const getDataCompareMonth = createAsyncThunk(
  'transactions/getDataCompareMonth',
  async credentials => {
    console.log(credentials);
    try {
      const { data } = await axios.get(
        `/transaction/period-data?date=${credentials}`,
      );

      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
);
