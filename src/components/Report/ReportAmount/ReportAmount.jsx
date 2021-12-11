import s from './ReportAmount.module.css';
import iconSlash from '../../../img/slash.svg';
import { getExpensesTransactions } from '../../../redux/transactions-operations';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getExpensesCategoriesMonsts, getInomesCategoriesMonsts } from '../../../redux/transactions-selectors';



const ReportAmount = () => {
  const transactionExpenses = useSelector(getExpensesCategoriesMonsts);
  const transactionIncomes = useSelector(getInomesCategoriesMonsts);
  
  
 


  return (
    <div className={`${s.section} ${s.amountSection}`}>
      <div className={`${s.transactionWrapper} ${s.amountWrapper}`}>
        <p className={s.amountTitle}>Расходы:</p>
        <span className={`${s.amountText} ${s.amountExpense}`}>{`- ${transactionExpenses} грн.`}</span>
      </div>

      <img src={iconSlash} alt="React Logo" className={s.amountSlash} />
      <div className={`${s.transactionWrapper} ${s.amountWrapper}`}>
        <p className={s.amountTitle}>Доходы:</p>
        <span className={`${s.amountText} ${s.amountIncome}`}>{`+ ${transactionIncomes} грн.`}</span>
      </div>
    </div>
  );
};
export default ReportAmount;
