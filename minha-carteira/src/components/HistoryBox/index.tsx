import React from "react";
import {
  Container,
  ChartContainer,
  Header,
  SubtittleContainer,
  Subtittle,
} from "./styles";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import formatCurrency from "../../utils/formatCurrency";

interface IHistoryBoxProps {
  data: {
    monthNumber: number;
    month: string;
    amountInput: number;
    amountOutput: number;
  }[];
  lineColorAmountInput: string;
  lineColorAmountOutput: string;
}

const HistoryBox: React.FC<IHistoryBoxProps> = ({
  data,
  lineColorAmountInput,
  lineColorAmountOutput,
}) => (
  <Container>
    <Header>
      <h2>Histórico de saldo</h2>
      <SubtittleContainer>
        <Subtittle color={lineColorAmountOutput}>
          <div></div>
          <span>Saídas</span>
        </Subtittle>
        <Subtittle color={lineColorAmountInput}>
          <div></div>
          <span>Entrada</span>
        </Subtittle>
      </SubtittleContainer>
    </Header>
    <ChartContainer>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#cecece" />
          <XAxis dataKey="month" stroke="#cecece"></XAxis>
          <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
          <Line
            type="monotone"
            dataKey="amountInput"
            name="Entradas"
            stroke={lineColorAmountInput}
            strokeWidth={5}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />

          <Line
            type="monotone"
            dataKey="amountOutput"
            name="Saídas"
            stroke={lineColorAmountOutput}
            strokeWidth={5}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  </Container>
);

export default HistoryBox;
