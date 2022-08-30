import React, { useEffect } from "react";
import { useWeb3Context } from "src/hooks/web3Context";
import { StyledNeumorphism } from "src/styles";
import styled from "styled-components";
import ConnectButton from "../ConnectButton";
import TokenInfo from "../TokenInfo";
import Navigation from "./Nav";

const Header: React.FC = () => {
  const { connect, hasCachedProvider } = useWeb3Context();

  useEffect(() => {
    if (hasCachedProvider()) {
      connect();
    }
  }, []);

  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledNavigationContainer>
          <StyledWrapLogoWeb
            onClick={() => {
              window.open("https://stash.capital/", "_self");
            }}
          >
            <StyledWrapLogo alt="logo-web" src="logo.png" />
          </StyledWrapLogoWeb>
          <Navigation />
        </StyledNavigationContainer>
        <StyledWrapButtonConnectAndAddress>
          <TokenInfo />
          <ConnectButton />
        </StyledWrapButtonConnectAndAddress>
      </StyledContainer>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  max-width: 1369px;
  padding: 0px 8px;
  box-sizing: border-box;
  width: 100%;
  margin: auto;
  position: relative;
`;

const StyledNavigationContainer = styled.div`
  display: flex;
  height: 48px;

  @media (max-width: 808px) {
    .navigation {
      display: none;
    }
  }
`;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0px 0px;
  padding: 8px 0px;

  @media (max-width: 1369px) {
    justify-content: flex-start;
  }
`;

const StyledWrapLogoWeb = styled(StyledNeumorphism)`
  position: absolute;
  left: 0px;
  height: 48px;
  width: 48px;
  min-width: 48px;
  align-items: center;
  border-radius: 16px;
  justify-content: center;
  margin-right: 24px;
  display: flex;

  background: unset;

  @media (max-width: 1369px) {
    position: static;
    margin-right: 16px;
  }

  @media (max-width: 420px) {
    display: none;
  }
`;

const StyledWrapLogo = styled.img`
  height: 24px;
`;

const StyledWrapButtonConnectAndAddress = styled.div`
  display: flex;
  align-items: center;
`;

export default Header;
