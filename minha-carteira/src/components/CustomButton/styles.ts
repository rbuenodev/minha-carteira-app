import styled from "styled-components";

interface IButtonProps {
  isSuccess: boolean;
}

export const Button = styled.button<IButtonProps>`
  width: 100%;

  margin: 7px 0;
  padding: 10px;

  border-radius: 5px;

  font-weight: bold;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) =>
    props.isSuccess ? props.theme.colors.success : props.theme.colors.warning};
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;
