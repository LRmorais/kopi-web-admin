import React from "react";
import { Chart } from "react-google-charts";



export const options = {
  chart: {
    title: "Relatório de atividades",
    subtitle: "Quantidade de acertos e erros por questão",
  },
};

export function ChartBar({data}) {
  return (
    <Chart
      chartType="Bar"
      width="90%"
      height="400px"
      data={data}
      options={options}
    />
  );
}