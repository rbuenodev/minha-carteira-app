import React, { ButtonHTMLAttributes } from "react";
import { CustomButton } from "./styles";

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<IButtonProps> = ({ children, ...rest }) => (
  <CustomButton {...rest}>{children}</CustomButton>
);

export default Button;
