import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import sprite from '../../img/sprite.svg';
import { format } from 'date-fns';
import { getDataMonth } from '../../redux/transactions-operations';
import s from './CurrentMonth.module.css';

const CurrentMonth = () => {
  const [curMonth, setCurMon] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const dispatch = useDispatch();

  useEffect(() => {
    if (curMonth < 10) {
      const month = `0${curMonth}`;
      console.log(month);
      dispatch(getDataMonth(`${year}-${month}`));
    } else {
      dispatch(getDataMonth(`${year}-${curMonth}`));
    }
  }, [dispatch, year, curMonth]);

  const handlePrevMonth = () => {
    if (curMonth === 1) {
      setYear(year => (year -= 1));
      setCurMon(12);
    } else {
      setCurMon(curMonth => (curMonth -= 1));
    }
  };
  const handleNextMonth = () => {
    if (curMonth === 12) {
      setYear(year => (year += 1));
      setCurMon(1);
    } else {
      setCurMon(curMonth => (curMonth += 1));
    }
  };

  // const mothLit = format(curMonth, 'mmmm');
  // console.log(mothLit);

  return (
    <div className={s.currentMonthBlock}>
      <span className={s.currentMonth}>Текущий период</span>
      <div className={s.monthBlock}>
        <svg viewBox="0 0 10 10" onClick={handlePrevMonth} width="10" height="10" fill="red">
          <use href={sprite + '#icon-arrowLeft'}></use>
        </svg>
        <span className={s.currentMonthText}>
          {curMonth} / {year}
        </span>
        <svg onClick={handleNextMonth} width="10" height="10">
          <use href={sprite + '#icon-arrowRight'}></use>
        </svg>
      </div>
    </div>
  );
};

export default CurrentMonth;
