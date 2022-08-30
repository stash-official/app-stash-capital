import React from "react";
import styled, { CSSProperties } from "styled-components";
import {
  StyledNeumorphism,
  StyledTextTitleA,
  StyledTextContentA,
} from "../../styles";
import Skeleton from "../Skeleton/Skeleton";

const CardData: React.FC<{
  title: string;
  content: string | number | any;
  style?: CSSProperties;
  className?: string;
  color: string;
  boxColor: string;
}> = ({ title, content, style, className, color, boxColor }) => {
  return (
    <StyledWrapper>
      <StyledContainer color={color} className={className} style={style}>
        <StyledWrapContent>
          <StyledTextTitleA>{title}</StyledTextTitleA>
          <StyledTextContentA className={`content ${!content && 'active-skeleton'}`}>
            {
              content ? content : <Skeleton className="skeleton" />
            }
          </StyledTextContentA>
        </StyledWrapContent>
      </StyledContainer>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  word-break: break-all;
`;
const StyledContainer = styled(StyledNeumorphism) <{ color: string }>`
  width: 100%;

  color: ${(props) => props.theme.colors.background};
  text-decoration: none;
  border-radius: 8px;
  transition: box-shadow 0.2s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  height: min-content;

  width: 100%;
  box-sizing: border-box;
  font-size: 2em;
  padding: 16px 28px;
  border-radius: 16px;

  @media (max-width: 580px) {
    padding: 0px;
  }
`;

const StyledWrapContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 14px;
  flex: 1;
  min-height: calc(100px - 26px);

 .active-skeleton {
    height: 40px;
    width: 100%;;

    .skeleton {
      width: 100%;
      height: 40px;
    }
  }
`;

export default CardData;
