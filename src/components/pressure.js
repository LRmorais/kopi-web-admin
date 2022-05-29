import React from 'react';
import { Chart } from 'react-google-charts';

const Pressure = () => (
  <Chart
    width="100%"
    height="100%"
    chartType="LineChart"
    loader={<div>Carregando Grafico</div>}
    data={[
      ['x', 'Bombeamento'],
      [0, 50],
      [1, 0],
      [2, 45],
      [3, 0],
      [4, 63],
      [5, 0],
      [6, 30],
      [7, 0],
      [8, 33],
      [9, 40],
      [10, 32],
      [11, 35],
    ]}
    options={{
      hAxis: {
        title: 'Time',
      },
      vAxis: {
        title: 'Frequencia',
      },
    }}
    rootProps={{ 'data-testid': '1' }}
  />
);
export default Pressure;
