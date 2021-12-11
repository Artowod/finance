export const getIncomes = state => state?.transactions?.transactions?.incomes;

export const getExpenses = state => state?.transactions?.transactions?.expenses;
export const getTransaction = state => state?.transactions?.transactions;
export const getInomesCategories = state => state?.transactions?.transactions?.incomeCategories;
export const getExpensesCategories = state => state?.transactions?.transactions?.expenseCategories;
export const getExpensesCategoriesMonsts = state =>
  state?.transactions?.transactions?.dataMonth?.expenses?.expenseTotal;
export const getInomesCategoriesMonsts = state =>
  state?.transactions?.transactions?.dataMonth?.incomes?.incomeTotal;

export const getTotalIncomesByCategory = state =>
  state?.transactions?.transactions?.dataMonth?.incomes?.incomesData;
export const getTotalExpensesByCategory = state =>
  state?.transactions?.transactions?.dataMonth?.expenses?.expensesData;
export const getTotalCompareIncomesByCategory = state =>
  state?.transactions?.transactions?.dataCompareMonth?.incomes?.incomesData;
export const getTotalCompareExpensesByCategory = state =>
  state?.transactions?.transactions?.dataCompareMonth?.expenses?.expensesData;
export const getLoader = state => state?.transactions?.isloading;
