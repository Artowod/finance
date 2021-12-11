import sprite from '../../../img/icon.svg';
import s from '../Report.module.css';
import { useSelector } from 'react-redux';
import { getMonthStatsExpenses } from '../../../redux/selectors';

const ReportExpensesList = ({ category, sum, chartDataHandler }) => {

  const expensesMonthData = useSelector(getMonthStatsExpenses);
  const categoryHandler = e => {
    const result = expensesMonthData.filter(obj => Object.keys(obj)[0] === category);
    console.log(result);
    chartDataHandler(result);
  };

  return (
    <>
      {category && (
        <li className={s.reportCard}>
          <p>{`${sum}.00`}</p>
          <svg className={s.iconSvg} title={category} onClick={categoryHandler}>
            <use xlinkHref={`${sprite}#${category}`} title={category} />
          </svg>
          <p className={s.reportCardTitle}>{category}</p>
        </li>
      )}
    </>
  );
};
export default ReportExpensesList;
