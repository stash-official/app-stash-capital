import React from "react";
import styled from "styled-components";
import Navigation from "./Nav";

const BottomBar: React.FC = () => {
  return (
    <StyledNavigationContainer>
      <Navigation bottomBar />
    </StyledNavigationContainer>
  );
};

const StyledNavigationContainer = styled.div`
  display: none;
  height: 48px;
  padding: 12px 8px;
  position: fixed;
  bottom: 0;
  z-index: 2;
  width: calc(100% - 16px);
  background-color: ${(props) => props.theme.colors.background};

  @media (max-width: 808px) {
    display: flex;
  }
`;

export default BottomBar;
