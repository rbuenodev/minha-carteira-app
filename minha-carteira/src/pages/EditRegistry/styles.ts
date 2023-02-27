import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

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
  align-items: center;
  justify-content: space-between;

  select {
    width: 100%;
    margin: 7px 0;
    padding: 10px;
  }

  @media (max-width: 890px) {
    flex-direction: column;
    align-items: start;
    justify-content: start;
  }
`;

export const ContainerFooter = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.warning};
  }

  > div {
    display: flex;
    width: 50%;

    @media (max-width: 400px) {
      flex-direction: column;
    }
  }
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  color: ${(props) => props.theme.colors.warning};
  &:hover {
    opacity: 0.7;
  }
`;

export const BlueButton = styled.span`
  > button {
    background-color: ${(props) => props.theme.colors.success};
  }
`;
