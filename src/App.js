import './App.css';
import s from './App.module.css';

import { checkCurrentUser, getUser } from './redux/auth/auth-operations';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Switch, Redirect } from 'react-router';
import { Suspense } from 'react';
import { Home } from '@mui/icons-material';

import SwitchTheme from './shared/SwitchTheme/SwitchTheme';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage';
import TransactionsPage from './pages/TransactionsPage';
import ReportsPage from './pages/ReportsPage';
import Chart from './components/Chart';
import Loader from './components/Loader';
import PublicRoute from './components/Routes/PublicRoute';
import PrivateRoute from './components/Routes/PrivateRoute';
// import Loader from './components/Loader';
import Team from './components/Team/Team';
import { isCurrentUser } from './redux/selectors';

function App() {
  const dispatch = useDispatch();
  const sid = useSelector(state => state.auth.sid);
  const token = useSelector(state => state.auth.token);

  const isCheckCurrentUser = useSelector(isCurrentUser);

  const isRefreshFulfilled = useSelector(state => state.auth.isRefreshFullFilled);

  

  const sidUser = useSelector(state => state.auth.user.sid);
  const accessToken = useSelector(state => state.auth.user.accessToken);
  const refreshToken = useSelector(state => state.auth.user.refreshToken);


  
  useEffect(() => {
    
    if (token !== '') {
      dispatch(checkCurrentUser());
    }
    return;
  }, []);

  useEffect(() => {
    if (isRefreshFulfilled) {
      dispatch(getUser({ accessToken, refreshToken, sidUser }));
    }
  }, [isRefreshFulfilled]);

  // const { pathname } = useLocation();
  // let isSpend = '';
  // pathname === '/spend' ? (isSpend = true) : (isSpend = false);

  return (
    <div className="App">

      {/* <SwitchTheme /> */}
      {isCheckCurrentUser ? (
        <Loader />
      ) : (
        <>
          <header className="App-header"></header>
          <NavBar />

          {/* <IncomesPage/> */}
          <Suspense fallback={<Loader />} />
          <Switch>
            <PublicRoute exact path="/" restricted>
              <HomePage />
            </PublicRoute>

            <PublicRoute exact path="/team" redirectTo="/">
              <Team />
            </PublicRoute>
            <PrivateRoute exact path="/" />

            <PrivateRoute exact path="/transactions">
              <TransactionsPage />
            </PrivateRoute>
            <PrivateRoute exact path="/reports">
              <ReportsPage />
            </PrivateRoute>
          </Switch>
        </>
      )}

   
    </div>
  );
}

export default App;
