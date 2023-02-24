import styled, { keyframes } from "styled-components";

interface IContainerProps {
  color: string;
}

const animate = keyframes`
  0%{
    transform: translateX(100px);
    opacity: 0;

  }
  50%{
    opacity: 0.3;

  }
  100%{
    transform: translateX(0px);
    opacity: 1;
  } 
`;

export const Container = styled.div<IContainerProps>`
  height: 150px;
  width: 32%;

  margin: 10px 0px;
  background-color: ${(props) => props.color};
  color: ${(props) => props.theme.colors.white};
  border-radius: 7px;
  padding: 10px 20px;
  position: relative;
  overflow: hidden;

  > img {
    height: 110%;
    position: absolute;
    top: -10px;
    right: -30px;
    opacity: 0.3;
  }

  > span {
    font-size: 18px;
    font-weight: 500;
  }

  > small {
    font-size: 12px;
    position: absolute;
    bottom: 10px;
  }

  animation: ${animate} 0.5s;

  @media (max-width: 770px) {
    > span {
      font-size: 14px;
    }

    > h1 {
      word-wrap: break-word;
      font-size: 20px;

      > strong {
        font-size: 16px;
        display: inline-block;
        width: 100%;
      }
    }
  }

  @media (max-width: 420px) {
    width: 100%;

    > h1 {
      display: flex;
      font-size: 24px;
      > strong {
        position: initial;
        width: auto;
        font-size: 22px;
      }
      > strong::after {
        display: inline-block;
        content: " ";
        width: 1px;
      }
    }
  }
`;
