import s from './Balance.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import UnifiedModal from '../../shared/UnifiedModal';
import {
  getBalance,
  getUserBalance,
  getIsSystemInitialised,
  isGetUserFulfilledAfterRefresh,
} from '../../redux/selectors';
import { getIncomes, getExpenses } from '../../redux/transactions-selectors';
import { updateBalance } from '../../redux/transactions-operations';
import Notiflix from 'notiflix';

const Balance = () => {
  const [balanceState, setBalanceState] = useState('unset');
  const [timerId, setTimerId] = useState(null);
  const [isReminderShown, setIsReminderShown] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);

  const userBalanceFromAuth = useSelector(getUserBalance);
  const [balance, setBalance] = useState(Math.round(userBalanceFromAuth) + ' UAH'); //то что отображается в инпуте

  const dispatch = useDispatch();
  const pushIsSystemStartedMarkerToState = marker => dispatch(actions.setIsSystemStarted(marker));
  const pushBalanceToState = newBalance => dispatch(actions.setBalance(newBalance)); //if it`s beginning

  const balanceInTransactionState = useSelector(getBalance); //transactions.balance

  const isSystemStarted = useSelector(getIsSystemInitialised);
  const expenses = useSelector(getExpenses).length;
  const incomes = useSelector(getIncomes).length;

  const zeroReminding = () => {
    const timerId = setTimeout(() => {
      setIsReminderShown(true);
    }, 4000);
    setTimerId(timerId);
  };

  useEffect(() => {
    console.log('first time');
    console.log('balanceInTransactionState', balanceInTransactionState);
    console.log('userBalanceFromAuth', userBalanceFromAuth);

    if (userBalanceFromAuth || isSystemStarted || expenses || incomes) {
      balanceInTransactionState === null && pushBalanceToState(userBalanceFromAuth);

      // balanceInTransactionState === null
      //   ? pushBalanceToState(userBalanceFromAuth)
      //   : pushBalanceToState(balanceInTransactionState); //  - to state only
      balanceInTransactionState === null
        ? setBalance(userBalanceFromAuth + ' UAH')
        : setBalance(balanceInTransactionState + ' UAH');

      pushIsSystemStartedMarkerToState(true);
      setBalanceState('set');
    } else if (balanceState === 'unset') {
      zeroReminding();
    }
    console.log('INIT');
    console.log('userBalanceFromAuth', userBalanceFromAuth);
    console.log('balanceInTransactionState', balanceInTransactionState);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   console.log('UseEFFECT-isGetUserFulfilledAfterRefresh');
  //   if (isGetUserFulfilledAfterRefresh) {
  //     setTimeout(console.log('5 SEC!!!!'), 15000);
  //     pushBalanceToState(userBalanceFromAuth);
  //   }
  //   console.log('userBalanceFromAuth', userBalanceFromAuth);
  //   console.log('balanceInTransactionState', balanceInTransactionState);
  // }, [isGetUserFulfilledAfterRefresh]);

  useEffect(() => {
    console.log(balanceInTransactionState);
    setBalance(Math.round(balanceInTransactionState) + ' UAH');
  }, [balanceInTransactionState]);

  useEffect(() => {
    if (balanceState === 'set') {
      clearTimeout(timerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balanceState]);

  const responseHandling = response => {
    setIsModalShown(false);
    console.log(response);
    if (response) {
      prepareDataForBackend();
    }
    return response;
  };

  const prepareDataForBackend = () => {
    const balanceDigit = balance.slice(0, balance.length - 4).trim();
    if (Number(balanceDigit) && Number(balanceDigit) > 0) {
      console.log('Output Balance :', balanceDigit);
      finalInitializing();
      sendDataToState(Number(balanceDigit));
    } else {
      Notiflix.Notify.warning('Неверные данные! Повторите ввод.');
      console.log('Wrong balance!');
      setBalance('0 UAH');
    }
  };

  const finalInitializing = () => {
    setIsReminderShown('false');
    setBalanceState('set');
  };

  const sendDataToState = balanceDigit => {
    /* Send marker and balance to STATE */
    pushIsSystemStartedMarkerToState(true);
    //pushBalanceToState(userBalanceFromAuth); //  - to state only
    dispatch(
      updateBalance({
        newBalance: balanceDigit,
      }),
    );
  };

  const submitBalanceHandler = event => {
    event.preventDefault();
    console.log(balance);
    setIsModalShown(true);
  };

  const clickBalanceHandler = event => {
    if (event.target.value === '0 UAH') {
      setBalance('');
    } else if (event.target.value.slice(event.target.value.length - 3) === 'UAH')
      setBalance(event.target.value.slice(0, event.target.value.length - 4));
  };

  const looseFocusBalanceHandler = event => {
    if (event.target.value === '') {
      setBalance('0 UAH');
    } else setBalance(prev => prev + ' UAH');
  };

  const changeBalanceHandler = event => {
    setBalance(event.target.value.trim());
  };

  const confirmBtnMarkup = isEnabled => {
    return isEnabled ? (
      <button type="submit" className={s.confirmBtn}>
        Подтвердить
      </button>
    ) : (
      <button type="submit" className={s.confirmBtn_disabled} disabled>
        Подтвердить
      </button>
    );
  };

  const inputMarkup = isEnabled => {
    return isEnabled ? (
      <input
        type="input"
        value={balance}
        className={s.balance}
        onChange={changeBalanceHandler}
        onClick={clickBalanceHandler}
        onBlur={looseFocusBalanceHandler}
      />
    ) : (
      <input
        type="input"
        value={balance}
        className={s.balance}
        onChange={changeBalanceHandler}
        onClick={clickBalanceHandler}
        onBlur={looseFocusBalanceHandler}
        disabled
      />
    );
  };

  return (
    <>
      {/* <div className={s.wrapper}> */}
      {/* <section className={s.goHomeSection}> */}
      {/* <GoHome /> */}
      {/* </section> */}
      <section className={s.balanceSection}>
        <span className={s.title}>Баланс:</span>
        <form onSubmit={submitBalanceHandler}>
          <div className={s.formWrapper}>
            <div className={s.inputsWrapper}>
              {balanceState === 'set' ? inputMarkup(false) : inputMarkup(true)}
              {balanceState === 'set' ? confirmBtnMarkup(false) : confirmBtnMarkup(true)}
            </div>
            {isReminderShown === true && (
              <div className={s.reminding}>
                <div className={s.triangle} />
                <p>Привет! Для начала работы внеси текущий баланс своего счета!</p>
                <p className={s.remindingSubMessage}>
                  Ты не можешь тратить деньги пока их у тебя нет!{' '}
                </p>
              </div>
            )}
          </div>
        </form>
      </section>
      {isModalShown && <UnifiedModal title={'Вы уверены?'} response={responseHandling} />}
    </>
  );
};

/***************** HOW TO USE UNIFIED MODAL WINDOW *****************/
//   const [isModalShown, setIsModalShown] = useState(false);

//   const responseHandling = response => {
//     setIsModalShown(false);

//     if (response) {
//       // POSITIVE ACTION;
//     }
//     return response;
//   };

// return
//   { isModalShown && <UnifiedModal title={'Вы уверены?'} response={responseHandling} />}
/*******************************************************************/

export default Balance;
