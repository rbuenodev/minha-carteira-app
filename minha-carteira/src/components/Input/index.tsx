import React, { InputHTMLAttributes } from "react";
import { CustomInput } from "./styles";

type IInputProps = InputHTMLAttributes<HTMLInputElement>;
const Input: React.FC<IInputProps> = ({ ...rest }) => (
  <CustomInput {...rest}></CustomInput>
);

export default Input;
