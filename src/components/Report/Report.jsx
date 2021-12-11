import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CompareMonth from '../CompareMonth/CompareMonth';
import s from './Report.module.css';

import Chart from '../Chart';
import ReportAmount from './ReportAmount';
import { useSelector } from 'react-redux';
import {
  getExpenses,
  getExpensesCategories,
  getIncomes,
  getInomesCategories,
  getTotalExpensesByCategory,
  getTotalIncomesByCategory,
  getTotalCompareIncomesByCategory,
  getTotalCompareExpensesByCategory
} from '../../redux/transactions-selectors';
import { getMonthData } from '../../redux/selectors';
import { useEffect, useState } from 'react';
import ReportIncomesList from './ReportIncomesList/ReportIncomesList';
import ReportExpensesList from './ReportExpensesList/ReportExpensesList';

const Report = () => {
  const [category, setCategory] = useState('');
  const [reportTypeRender, setReportTypeRender] = useState('incomes');
  const [type, setType] = useState('expenses');
  const [dataForChartSubCategories, setDataForChartSubCategories] = useState(null);

  const transactionExpenses = useSelector(getExpenses);
  const transactionIncomes = useSelector(getIncomes);
  const getIncomesCategoties = useSelector(getInomesCategories);
  const getExpensesCategoties = useSelector(getExpensesCategories);

  const onHandleChangeType = () => {
    if (reportTypeRender === 'incomes') setReportTypeRender('expenses');
    else setReportTypeRender('incomes');
    setDataForChartSubCategories(null);
  };
  const dataMonth = useSelector(getMonthData);


  useEffect(() => {
    setDataForChartSubCategories(null);
    console.log(dataForChartSubCategories);
  }, [dataMonth]);


  const getInomesCategory = useSelector(getInomesCategories);
  console.log(`getInomesCategory`, getInomesCategory);

  const getTotalIncomesByCategories = useSelector(getTotalIncomesByCategory);
 


  const newIncomes = getInomesCategory.map(item => {
    if (getTotalIncomesByCategories[item]) {
      return {
        sum: getTotalIncomesByCategories[item].total,
        category: item,
        //  [item] : getTotalExpensesByCategories[item].total,
      };
    }
    return false;
  });

  const getTotalExpensesByCategories = useSelector(getTotalExpensesByCategory);
  console.log(`getTotalIncomesByCategories`, getTotalExpensesByCategories);
  const fullDataAboutExpenses = Object.entries(getTotalExpensesByCategories);
  console.log(fullDataAboutExpenses);

  const getExpensesCategory = useSelector(getExpensesCategories);
  console.log(`getInomesCategory`, getExpensesCategory);
  const newExensescomes = getExpensesCategory.map(item => {
    console.log(`item`, item);
    if (getTotalExpensesByCategories[item]) {
      return {
        sum: getTotalExpensesByCategories[item].total,
        category: item,
      };
    }
    return false;
  });

  const chartDataHandler = data => {
    setDataForChartSubCategories(data);
    console.log(dataForChartSubCategories);
  };


  return (
    
      <div className={s.reportContainer}>
        <ReportAmount />
        <div className={`${s.navigation} ${s.section}`}>
          <div className={s.navigationWrapper}></div>
        </div>


              {/* {type === reportTypeRender ? (
                <h1 className={s.reportTitle}>расходы</h1>
              ) : (
                <h1 className={s.reportTitle}>доходы</h1>
              )}

              <ArrowForwardIosIcon
                style={{ color: '#FF751D', cursor: 'pointer' }}
                fontSize="small"
                onClick={onHandleChangeType}
              />
            </div>
            {reportTypeRender === 'incomes' && (
              <ul className={s.reportList}>
                {transactionIncomes.length === 0 ? (
                  <p>Доходы</p>
                ) : (
                  newIncomes.map(item => (
                    <ReportIncomesList
                      category={item.category}
                      sum={item.sum}
                      chartDataHandler={chartDataHandler}
                    />
                  ))
                )}
              </ul>
            )}
            {reportTypeRender === 'expenses' && (
              <ul className={s.reportList}>
                {transactionExpenses.length === 0 ? (
                  <p>Расходы</p>
                ) : (
                  newExensescomes.map(item => (
                    <ReportExpensesList
                      category={item.category}
                      sum={item.sum}
                      type={reportTypeRender}
                      chartDataHandler={chartDataHandler}
                    />
                  ))
                )}
              </ul> */}

         <div className={`${s.reportWrapper} ${s.section}`}>
           <div className={`${s.transactionWrapper} ${s.sectionReportTitle}`}>
             <ArrowBackIosIcon
               style={{ color: '#FF751D', cursor: 'pointer' }}
               fontSize="small"
               onClick={onHandleChangeType}
               className={s.btnFocus}
             />

             {type === reportTypeRender ? (
               <h1 className={s.reportTitle}>расходы</h1>
             ) : (
               <h1 className={s.reportTitle}>доходы</h1>

            )}
            <ArrowForwardIosIcon
              style={{ color: '#FF751D', cursor: 'pointer' }}
              fontSize="small"
              onClick={onHandleChangeType}
              className={s.btnFocus}
            />
          </div>
          {reportTypeRender === 'incomes' && (
            <ul className={s.reportList}>
              {transactionIncomes.length === 0 ? (
                <p>Доходы</p>
              ) : (
                newIncomes.map(item => (
                  <ReportIncomesList
                    category={item.category}
                    sum={item.sum}
                    chartDataHandler={chartDataHandler}
                  />
                ))
              )}
            </ul>
          )}
          {reportTypeRender === 'expenses' && (
            <ul className={s.reportList}>
              {transactionExpenses.length === 0 ? (
                <p>Расходы</p>
              ) : (
                newExensescomes.map(item => (
                  <ReportExpensesList
                    category={item.category}
                    sum={item.sum}
                    type={reportTypeRender}
                    chartDataHandler={chartDataHandler}
                  />
                ))
              )}
            </ul>
          )}
        </div>


        {dataForChartSubCategories && (
          <div className={s.chart}>
            <Chart
              chartTypeRender={reportTypeRender}
              data={dataForChartSubCategories}
              /* newExensescomes={newExensescomes} */
            />
          </div>
      )}
      {/* <CompareMonth/> */}
      </div>
    
  );
};
export default Report;
