import React from "react";
import { Button } from "./styles";

interface IButtonProps {
  children: React.ReactNode;
  isSuccess: boolean;
  onClick(): void;
}

const CustomButton: React.FC<IButtonProps> = ({
  children,
  onClick,
  isSuccess,
}) => (
  <Button isSuccess={isSuccess} onClick={onClick}>
    {children}
  </Button>
);

export default CustomButton;
