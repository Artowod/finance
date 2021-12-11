/* ---- selectors for mapStateToProps only ! ---- */

export const getBalance = state => state?.transactions?.balance;
export const getUserBalance = state => state?.auth?.userBalance;
export const getIsSystemInitialised = state => state.isSystemStarted;

export const isCurrentUser = state => state.auth.isCheckingUser;

export const isGetUserFulfilledAfterRefresh = state => state.isGetUserFulfilledAfterRefresh;


export const isUserLoggedIn = state => state.auth.isLoggedIn;

export const getIncomesMonth = state => state?.transactions?.transactions?.getMonth?.getIncomesMonth;
export const getExpensesMonth = state => state?.transactions?.transactions?.getMonth?.getExpensesMonth;

export const getMonthData = state => state?.transactions?.transactions?.dataMonth;

export const getMonthStatsIncomes = state => {
  const monthIncomesData = getMonthData(state)?.incomes?.incomesData;
  return Object.keys(monthIncomesData)?.length
    ? Object.entries(monthIncomesData).map(item => ({
        [item[0]]: Object.entries(item[1]).filter(element => element[0] !== 'total'),
      }))
    : [];
};

export const getMonthStatsExpenses = state => {
  const monthExpensesData = getMonthData(state)?.expenses?.expensesData;
  return Object.keys(monthExpensesData)?.length
    ? Object.entries(monthExpensesData).map(item => ({
        [item[0]]: Object.entries(item[1]).filter(element => element[0] !== 'total'),
      }))
    : [];
};

export const getLoader = state => state.auth.isLoader;
