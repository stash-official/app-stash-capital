import styled from "styled-components";
import { colors } from "./colors";

export const theme = {
  colors,
};

export const shadowFlatNeumorphism = ` -5px -5px 10px${theme.colors.shadowLeft},
5px 5px 10px ${theme.colors.shadowRight}`;

export const shadowFlatPressNeumorphism = ` -2px -2px 7px${theme.colors.shadowLeft},
2px 2px 7px ${theme.colors.shadowRight}`;

export const shadowPressedNeumorphism = `inset -5px -5px 10px${theme.colors.shadowLeft},
inset 5px 5px 10px ${theme.colors.shadowRight}`;

export const StyledNeumorphism = styled.div`
  transition: all 0.2s ease-in-out;

  background: ${(props) => props.theme.colors.background};
  box-shadow: ${shadowFlatNeumorphism};
  transition: all 0.5s ease-in-out;
`;

export const MetaButton = styled.button`
  text-align: center;
  outline: none;
  border: none;
  outline: none;
  text-decoration: none;
  justify-content: center;
  position: relative;
  z-index: 1;
  font-size: 12px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0.5rem;
  border-radius: 16px;
  cursor: pointer;
  user-select: none;

  font-weight: 500;
  max-width: 200px;
  width: 100%;
  font-weight: 600;
  background-color: ${(props) => props.theme.colors.background};
  background: ${(props) => props.theme.colors.red[100]};
  color:  ${(props) => props.theme.colors.text.secondary}; 
  box-shadow: ${shadowFlatNeumorphism};
  transition: all 0.2s ease-in-out;

  @media (min-width: 1250px) {
    &:hover {
      background-color: ${(props) => props.theme.colors.red[100]};
      color: ${(props) => props.theme.colors.background};
    }
  }

  &:active {
    box-shadow: ${shadowFlatPressNeumorphism};
    transition: all 0.1s ease-in-out;
  }
`;

export const StyledTextTitleA = styled.div`
  font-weight: 400;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text.secondary};
  padding: 3px 0;
  font-size: 16px;

  @media (max-width: 950px) {
    font-size: 14px;
  }
  @media (max-width: 420px) {
    font-size: 12px;
  }
`;

export const StyledTextContentA = styled.div`
  font-family: 'Bebas Neue', cursive;
  font-weight: 500;
  font-size: 32px;
  font-weight: 600;
  background: ${(props) => props.theme.colors.text.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  @media (max-width: 950px) {
    font-size: 28px;
  }

  @media (max-width: 450px) {
    font-size: 24px;
  }
`;
