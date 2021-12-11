import s from './IncomesAndExpensesList.module.css';
import './customScroll.css';

import CustomScroll from 'react-custom-scroll';
import IncomesAndExpensesListItem from './IncomesAndExpensesListItem';
import UnifiedModal from '../../shared/UnifiedModal';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteTransaction,
  getExpensesTransactions,
  getIncomeTransactions,
} from '../../redux/transactions-operations';

const IncomesAndExpensesList = ({ transactions, transactionsType, operationSign }) => {
  const dispatch = useDispatch();

  const [isModalShown, setIsModalShown] = useState(false);
  const [itemId, setItemId] = useState(null);

  const modalHandler = id => {
    setIsModalShown(true);
    setItemId(id);
  };

  const responseHandling = response => {
    setIsModalShown(false);

    if (response) {
      dispatch(deleteTransaction({itemId, transactionsType}));
    }
    setItemId(null);
  };

  return (
    <>
      {isModalShown && <UnifiedModal title={'Вы уверены?'} response={responseHandling} />}
      <div className={s.list}>
        <header className={s.header}>
          <div className={s.groupingDiv}>
            <span className={s.date}>Дата</span>
            <span className={s.description}>Описание</span>
          </div>
          <span className={s.category}>Категория</span>
          <span className={s.amount}>Сумма</span>
        </header>
        {transactions.length > 0 ? (
          <CustomScroll className="rcs-inner-handle">
            <ul className={s.transactionsList}>
              {transactions &&
                transactions.map(item => (
                  <IncomesAndExpensesListItem
                    key={item._id}
                    itemProps={item}
                    modalHandler={modalHandler}
                    transactionsType={transactionsType}
                    operationSign={operationSign}
                  />
                ))}
            </ul>
          </CustomScroll>
        ) : (
          <ul className={s.ulPlaceholder}></ul>
        )}
      </div>
    </>
  );
};

export default IncomesAndExpensesList;
