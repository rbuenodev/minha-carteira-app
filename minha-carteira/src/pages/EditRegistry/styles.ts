import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;
export const ContainerForm = styled.div``;

export const Form = styled.form`
  padding: 30px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.tertiary};
`;

export const FormTitle = styled.h4`
  color: ${(props) => props.theme.colors.white};
`;

export const ContainerInline = styled.div`
  display: flex;
`;
