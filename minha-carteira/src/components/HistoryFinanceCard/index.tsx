import React from "react";
import { MdEdit } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Container, ContainerInline, Tag } from "./styles";

interface IHistoryCardFinanceProps {
  id: string;
  tagColor: string;
  title: string;
  subtitle: string;
  amount: string;
}

const HistoryCardFinance: React.FC<IHistoryCardFinanceProps> = ({
  id,
  tagColor,
  title,
  subtitle,
  amount,
}) => {
  return (
    <Container>
      <Tag color={tagColor} />
      <div>
        <span>{title}</span>
        <small>{subtitle}</small>
      </div>

      <ContainerInline>
        <h3>{amount}</h3>
        <NavLink to={`/edit/${id}`}>
          <MdEdit height="40" width="40" />
        </NavLink>
      </ContainerInline>
    </Container>
  );
};

export default HistoryCardFinance;
