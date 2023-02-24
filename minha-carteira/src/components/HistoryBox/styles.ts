import styled, { keyframes } from "styled-components";

interface ISubtitleProps {
  color: string;
}

const animate = keyframes`
  0%{
    transform: translateX(-100px);
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

export const Container = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme.colors.tertiary};

  margin: 10px 0;
  padding: 30px 20px;
  border-radius: 7px;

  animation: ${animate} 0.5s;
`;

export const ChartContainer = styled.div`
  flex: 1;
  height: 260px;
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;

  > h2 {
    margin-bottom: 20px;
    padding-left: 17px;
  }

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

export const SubtittleContainer = styled.ul`
  list-style: none;
  display: flex;
`;

export const Subtittle = styled.li<ISubtitleProps>`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  margin-left: 7px;
  padding-right: 17px;

  > div {
    background-color: ${(props) => props.color};
    width: 40px;
    height: 40px;
    border-radius: 5px;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
  }

  > span {
    margin-left: 5px;
  }

  @media (max-width: 1200px) {
    margin-left: 17px;
    > div {
      width: 30px;
      height: 30px;
    }
  }
`;
