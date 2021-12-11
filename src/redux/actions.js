import { createAction } from '@reduxjs/toolkit';

export const setIsSystemStarted = createAction('transactions/setIsSystemStarted');
export const setBalance = createAction('transactions/setBalance');
export const setExpenses = createAction('transactions/setExpenses');
export const setIncomes = createAction('transactions/setIncomes');
export const addTransactions = createAction('transactions/addTransactions');
export const getIncomesCategories = createAction('transactions/getIncomesCategories');
export const getExpensesCategories = createAction('transactions/getExpensesCategories');
export const setIncomesByCategories = createAction('transactions/setIncomesByCategories');
export const setExpensesByCategories = createAction('transactions/setExpensesByCategories');
