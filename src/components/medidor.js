import React from 'react';
import { Chart } from 'react-google-charts';
import { useData } from '../services/context';

const Config = () => {
  // const data = 10;
  const { msg } = useData();
  console.log(msg);
  if(Object.keys(msg).length === 0 ){
    return <p>sem dados</p>
  }else {
    return(
      <Chart
          width={'100%'}
          height={'100%'}
          chartType="Gauge"
          loader={<div>Loading Chart</div>}
          data={[
            ['Label', 'Value'],
            ['Pressão', msg.pressao],
            ['Oxigenação', msg.oxi],
            ['Cardio', msg.cardio],
          ]}
          options={{
            redFrom: 90,
            redTo: 100,
            yellowFrom: 75,
            yellowTo: 90,
            minorTicks: 5,
          }}
          rootProps={{ 'data-testid': '1' }}
        />
    )
  }
  // return (
  //   <div style={{marginLeft: '25%', }}>
  //     <Chart
  //       // width="100%"
  //       // height="100%"
  //       chartType="Gauge"
  //       loader={<div>Loading Chart</div>}
  //       data={[
  //         ['Label', 'Value'],
  //         ['Pressão', msg],
  //         // ['Pressão', 50],
  //         ['Oxigenação', 70],
  //         ['Cardio', 30],
  //         // ['Oxigenação', data],
  //         // ['Cardio', msg.cardio],
  //       ]}
  //       options={{
  //         redFrom: 90,
  //         redTo: 100,
  //         yellowFrom: 75,
  //         yellowTo: 90,
  //         minorTicks: 5,
  //       }}
  //       rootProps={{ 'data-testid': '1' }}
  //     />
  //   </div>
  // );
};

export default Config;
