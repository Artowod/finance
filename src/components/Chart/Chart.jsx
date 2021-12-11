import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import s from './Chart.module.css';
import React, { Fragment, useState } from 'react';
import Media from 'react-media';

// {
//   name: 'Page G',
//   uv: 3490,
//   pv: 4300,
//   amt: 2100,
// },

const Chart = ({ chartTypeRender, data /* newIncomes, newExensescomes */ }) => {
  // const incomesData = useSelector(state => state.transactions.transactions.incomesByCategory);
  // const expencesData = useSelector(state => state.transactions.transactions.expensesByCategory);

  const [chartRotate, setChartRotate] = useState(false);

  console.log(data);
  //   [ { z/p:[ [name:pv][name:pv]] } ]
  const incomesDataFromReport = Object.values(data[0]);
  //  [ [name:pv][name:pv] ]
  let resultedDataForChart = incomesDataFromReport[0].map(
    ([subCategoryName, subCategoryValue], index) => {
      const obj = {
        name: subCategoryName,
        Сумма: subCategoryValue,
      };
      return obj;
    },
  );
  //  [ {name:pv}{name:pv} ]
  console.log('1', resultedDataForChart);

  resultedDataForChart.sort(
    function (a, b) {
      return b.Сумма - a.Сумма;
    },
    // (a, b) => parseFloat(a.marker) - parseFloat(b.marker),
  );
  console.log('2', resultedDataForChart);

  // let chartData;
  // const incomesData = newIncomes
  //   .filter(item => item !== false)
  //   .map(item => {
  //     return {
  //       name: item.category,
  //       Сумма: item.sum,
  //     };
  //   });

  // const expencesData = newExensescomes
  //   .filter(item => item !== false)
  //   .map(item => {
  //     console.log(item);
  //     return {
  //       name: item.category,
  //       Сумма: item.sum,
  //     };
  //   });

  //chartTypeRender === 'incomes' ? (chartData = incomesData) : (chartData = expencesData);

  const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    // console.log(payload);
    // const result = resultedDataForChart.map(item => item.name);
    return (
      <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`${value} грн`}</text>
    );
  };

  //   return (
  //     <>
  //       {chartRotate ? (
  //         <BarChart
  //           width={700}
  //           height={500}
  //           data={resultedDataForChart}
  //           margin={{
  //             top: 25,
  //             right: 30,
  //             left: 20,
  //             bottom: 5,
  //           }}
  //         >
  //           <CartesianGrid strokeDasharray="3 3" />
  //           <XAxis dataKey="name" />
  //           <YAxis />
  //           <Tooltip />

  //           <Bar dataKey="Сумма" className={s.color} label={renderCustomBarLabel} /* fill="red" */ />
  //         </BarChart>
  //       ) : (
  //         <BarChart
  //           width={700}
  //           height={500}
  //           data={resultedDataForChart}
  //           layout="vertical"
  //           margin={{
  //             top: 25,
  //             right: 30,
  //             left: 20,
  //             bottom: 5,
  //           }}
  //         >
  //           <CartesianGrid strokeDasharray="3 3" />
  //           <XAxis type="number" />
  //           <YAxis type="category" dataKey="name" />
  //           <Tooltip />
  //           <Bar dataKey="Сумма" className={s.color} label={renderCustomBarLabel} /* fill="red" */ />
  //         </BarChart>
  //       )}
  //     </>
  //   );
  // };

  return (
    <div className={s.wrapper}>
      <Media
        queries={{
          small: '(min-width: 320px) and (max-width: 767px)',
          medium: '(min-width: 768px)',
        }}
      >
        {matches => (
          <Fragment>
            {matches.medium && (
              <ResponsiveContainer>
                <BarChart
                  /*                   width={700}
                  height={500} */
                  data={resultedDataForChart}
                  margin={{
                    top: 25,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />

                  <Bar
                    dataKey="Сумма"
                    className={s.color}
                    label={renderCustomBarLabel} /* fill="red" */
                  />
                </BarChart>
              </ResponsiveContainer>
            )}

            {matches.small && (
              <ResponsiveContainer>
                <BarChart
                  /*                   width={400}
                  height={500} */
                  data={resultedDataForChart}
                  layout="vertical"
                  margin={{
                    top: 25,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Bar
                    dataKey="Сумма"
                    className={s.color}
                    label={renderCustomBarLabel} /* fill="red" */
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Fragment>
        )}
      </Media>
    </div>
  );
};
export default Chart;
