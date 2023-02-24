import React from "react";
import {
  Container,
  LeftSide,
  Subtittle,
  SubtittleContainer,
  RightSide,
} from "./styles";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

interface ICustomPieChartProps {
  data: { name: string; value: number; percent: number; color: string }[];
}

const CustomPieChart: React.FC<ICustomPieChartProps> = ({ data }) => (
  <Container>
    <LeftSide>
      <h2>Relação</h2>

      <SubtittleContainer>
        {data.map((indicator) => (
          <Subtittle key={indicator.name} color={indicator.color}>
            <div>{indicator.percent >= 0 ? indicator.percent : 0}%</div>
            <span>{indicator.name}</span>
          </Subtittle>
        ))}
      </SubtittleContainer>
    </LeftSide>
    <RightSide>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} labelLine={false} dataKey="percent">
            {data.map((indicator) => (
              <Cell key={`cell-${indicator.name}`} fill={indicator.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </RightSide>
  </Container>
);

export default CustomPieChart;
