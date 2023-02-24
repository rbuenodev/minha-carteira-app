import React from "react";
import CountUp from "react-countup";
import { Container } from "./styles";
import dolarImg from "../../assets/dolar.svg";
import arrowUpImg from "../../assets/arrow-up.svg";
import arrowDownImg from "../../assets/arrow-down.svg";

interface IWalletBoxProps {
  title: string;
  amount: number;
  footerLabel: string;
  icon: "dolar" | "arrowUp" | "arrowDown";
  color: string;
}

const WalletBox: React.FC<IWalletBoxProps> = ({
  title,
  amount,
  footerLabel,
  icon,
  color,
}) => {
  const iconSelected = () => {
    switch (icon) {
      case "dolar":
        return dolarImg;
      case "arrowUp":
        return arrowUpImg;
      case "arrowDown":
        return arrowDownImg;
    }
  };
  return (
    <Container color={color}>
      <span>{title}</span>
      <h1>
        <strong>R$ </strong>
        <CountUp end={amount} separator="." decimal="," decimals={2} />
      </h1>
      <small>{footerLabel}</small>
      {iconSelected() && <img src={iconSelected()} alt={title}></img>}
    </Container>
  );
};

export default WalletBox;
