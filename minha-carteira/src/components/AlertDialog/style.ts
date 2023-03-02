import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  //background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    align-items: start;
    justify-content: start;
    padding-left: 30px;
  }
`;

interface IModelWrapperProps {
  showModal: boolean;
}
export const ModalWrapper = styled.div<IModelWrapperProps>`
  width: 600px;
  height: 300px;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.white};
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 10;
  border-radius: 10px;

  @media (max-width: 1270px) {
    width: 300px;
    height: min-content;
    padding: 20px;
  }
`;

export const ModalContent = styled.div`
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  p {
    margin-bottom: 1rem;
  }
`;

export const InlineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  > button {
    height: 44px;
    width: 200px;
    font-size: 14px;
  }

  @media (max-width: 1270px) {
    flex-direction: column;
  }
`;

export const BlueButton = styled.span`
  > button {
    height: 44px;
    width: 200px;
    font-size: 14px;
    background-color: ${(props) => props.theme.colors.success};
    margin-left: 20px;
  }
`;

export const CloseModalButton = styled.button`
  background-color: #fff;
  color: #000;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;
