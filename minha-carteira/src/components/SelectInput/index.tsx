import React from "react";

import { Container } from "./styles";

interface ISelectInputProps {
  options: {
    label: string | number;
    value: string | number;
  }[];
  OnChange(event: React.ChangeEvent<HTMLSelectElement>): void | undefined;
  defaultValue?: string | number;
}

const SelectInput: React.FC<ISelectInputProps> = ({
  options,
  OnChange,
  defaultValue,
}) => (
  <Container>
    <select onChange={OnChange} defaultValue={defaultValue}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </Container>
);

export default SelectInput;
