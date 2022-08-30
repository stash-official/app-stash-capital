import React from "react";
import { useAccountData } from "src/hooks/useAccountData";
import { useInitData } from "src/hooks/useInitData";
import styled from "styled-components";
import Loading from "../Loading/Loading2";
import SocialLinks from "../SocialLinks";
import SuspenseWithChunkError from "../SuspenseWithChunkError";

import BottomBar from "./BottomBar";
import Header from "./Header";

const MainLayout: React.FC<{ children: any }> = ({ children }) => {
  const isDone = useInitData();
  useAccountData();

  // TODO should display page loading when !isDone
  return isDone ? (
    <StyledWrapper>
      <Header />
      <StyledContainer>
        <SuspenseWithChunkError fallback={<Loading />}>
          {children}
        </SuspenseWithChunkError>
      </StyledContainer>

      <SocialLinks />
      <BottomBar />
    </StyledWrapper>
  ) : (
    <Loading />
  );
};

const StyledWrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 808px) {
    padding-bottom: 72px;
  }
`;
const StyledContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: calc(100vh - 250px);
  height: 100%;
  margin: auto;
  margin-top: 32px;
  flex-grow: 1;
`;

export default MainLayout;
