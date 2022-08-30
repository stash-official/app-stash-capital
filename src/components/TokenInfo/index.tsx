import React from "react";
import { useWeb3Context } from "src/hooks/web3Context";
import { addTokenToWallet } from "src/shared/services/helper";
import { shortAddress } from "src/utils";
import styled from "styled-components";
import {
  MetaButton,
  shadowFlatNeumorphism,
  shadowPressedNeumorphism,
  StyledNeumorphism,
} from "../../styles";

const TokenInfo: React.FC = () => {
  return (
    <>
      <StyledWrapper>
        <StyledTokenInfoContent>
          <StyledTokenIconIcon src="logo128.png" />
          STASH
        </StyledTokenInfoContent>

        <StyledWrapOptionUser className="dropdown">
          <StyledWrapOptionUser className="container">
            <StyledWrapOptionUser className="content">
              <StypedItemOption
                onClick={() => {
                  window.open(
                    "https://traderjoexyz.com/trade?outputCurrency=0x536e911b8BA66c9a8697bF7d7b9924456ABCC9e7#/"
                  );
                }}
              >
                Buy now
                <img
                  src="/icons/external-link.svg"
                  style={{ width: 16, marginLeft: 4 }}
                />
              </StypedItemOption>
              <StypedItemOption
                onClick={() => {
                  window.open(
                    "https://dexscreener.com/avalanche/0x6e390bdcc056446433d44b78e64f7720c810fd06"
                  );
                }}
              >
                Chart
                <img
                  src="/icons/external-link.svg"
                  style={{ width: 16, marginLeft: 4 }}
                />
              </StypedItemOption>
              <StypedItemOption
                onClick={addTokenToWallet}
                className="add-to-metamask"
              >
                Add STASH to Metamask
              </StypedItemOption>
            </StyledWrapOptionUser>
          </StyledWrapOptionUser>
        </StyledWrapOptionUser>
      </StyledWrapper>
    </>
  );
};

const StyledTokenIconIcon = styled.img`
  width: 26px;
  margin-right: 6px;

  @media (max-width: 420px) {
    width: 22px;
    margin-right: 4px;
  }
`;

const StyledTokenInfoContent = styled.div`
  font-family: "Bebas Neue", cursive;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 24px;

  @media (max-width: 420px) {
    font-size: 14px;
  }
`;

const StyledWrapper = styled(StyledNeumorphism)`
  cursor: pointer;
  height: 48px;
  box-sizing: border-box;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0px;
  border-radius: 16px;

  text-align: center;
  justify-content: center;

  position: absolute;
  top: 0px;
  right: 228px;

  max-width: 112px;
  width: 100%;
  font-weight: 600;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.white};
  margin-top: 8px;

  &:hover {
    z-index: 999;
    height: unset;
    max-width: 240px;
    .dropdown {
      height: 146px;
      margin-top: 12px,
      border-top: "1px solid #d1d1d1",
    }

    @media (max-width: 950px) {
      
      height: 146px;
      max-width: 146px;
      .dropdown {
        height: 100px;
      }
    }

    @media (max-width: 420px) {
      height: 126px;
      max-width: 120px;
     
      .dropdown {
        height: 100px;
        margin-top: 12px,
        border-top: "1px solid #d1d1d1",
      }
    }
  }

  @media (max-width: 420px) {
    font-size: 12px; 
    top: 8px;
    right: unset;
    left: 8px;
    height: 36px;
    max-width: 90px;
  }


  transition: 0.2s;
`;

const StyledWrapOptionUser = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  border-radius: 16px;

  &.dropdown {
    height: 0px;
    overflow: hidden;
    border-radius: 0px;
  }

  .container {
    position: relative;
    top: 0;
    padding: 0;
    .content {
      position: relative;
      top: 0;
      padding: 8px;
      width: calc(100% - 16px);
    }
  }
`;

const StypedItemOption = styled.div`
  padding: 12px 16px;
  width: calc(100% - 32px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: ${shadowPressedNeumorphism};
  }

  @media (max-width: 950px) {
    &.add-to-metamask {
      display: none;
    }
  }
`;

export default TokenInfo;
