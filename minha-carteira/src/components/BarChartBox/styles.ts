import styled, { keyframes } from "styled-components";

interface ISubtitleProps {
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

export const Container = styled.div`
  width: 48%;
  min-height: 260px;
  margin: 10px 0;

  background-color: ${(props) => props.theme.colors.tertiary};
  color: ${(props) => props.theme.colors.white};

  border-radius: 7px;

  display: flex;
  animation: ${animate} 0.5s;

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
  }
`;

export const SideLeft = styled.aside`
  flex: 1;
  padding: 30px 20px;

  > h2 {
    padding-left: 17px;
    margin-bottom: 10px;
  }
`;

export const SideRight = styled.main`
  min-height: 150px;
  display: flex;
  flex: 1;
  justify-content: center;

  padding-top: 35px;
`;

export const SubtittleContainer = styled.ul`
  list-style: none;
  max-height: 175px;
  padding-right: 15px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.secondary};
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.colors.tertiary};
  }

  @media (max-width: 1200px) {
    display: flex;
    height: auto;
  }
`;

export const Subtittle = styled.li<ISubtitleProps>`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  padding-left: 17px;

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
    > div {
      width: 30px;
      height: 30px;
      font-size: 10px;
      line-height: 30px;
    }
  }
`;
