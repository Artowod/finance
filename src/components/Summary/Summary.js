import s from './Summary.module.css';
import './customScroll.css';

import { useSelector } from 'react-redux';
import { getExpensesMonth, getIncomesMonth } from '../../redux/selectors';

import { getLoader } from '../../redux/transactions-selectors';
import Loader from '../Loader';



import CustomScroll from 'react-custom-scroll';


const Summary = ({ isExpenses }) => {
  let summary = null;
  const incomesSummary = useSelector(getIncomesMonth);
  const expensesSummary = useSelector(getExpensesMonth);

  summary = isExpenses === "expenses"? expensesSummary : incomesSummary

  const loader = useSelector(getLoader);

  return (
    <>
     

        <div className="scrollWrapper">

          <div className={s.summarySection}>
            {loader && <Loader/>}
            <h3 className={s.title}>Сводка</h3>
            <CustomScroll className="rcs-inner-handle">

              <ul className={s.list}>
                {Object.entries(summary)
                  .filter(([key, value]) => value !== 'N/A')
                  .map(([key, value]) => (
                    <li className={s.item} key={key}>
                      <span className={s.itemMonthSum}>{key}</span>
                      <span className={s.itemMonthSum}>{value}</span>
                    </li>
                  ))}
              </ul>

            </CustomScroll>
          </div>

        </div>
      
    </>
  );
};

export default Summary;
