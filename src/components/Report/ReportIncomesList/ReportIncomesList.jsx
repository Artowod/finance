import { useSelector } from 'react-redux';
import { getMonthStatsIncomes } from '../../../redux/selectors';

import sprite from '../../../img/icon.svg';
import s from '../Report.module.css';

const ReportIncomesList = ({ category, sum, chartDataHandler, type }) => {


  const incomesMonthData = useSelector(getMonthStatsIncomes);
  const categoryHandler = e => {
    const result = incomesMonthData.filter(obj => Object.keys(obj)[0] === category);
    console.log(result);
    chartDataHandler(result);
  };

  return (
    <>
      {category && (
        <li className={s.reportCard}>
          <p>{sum}.00</p>
          <svg className={s.iconSvg} title={category} onClick={categoryHandler}>
            <use xlinkHref={`${sprite}#${category}`} title={category} />
          </svg>
          <p className={s.reportCardTitle}>{category}</p>
        </li>
      )}
    </>
  );
};
export default ReportIncomesList;
