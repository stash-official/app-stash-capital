import React, { useCallback, useState } from "react";
import { useWeb3Context } from "src/hooks/web3Context";
import { copyTextToClipboard, shortAddress } from "src/utils";
import styled from "styled-components";
import {
  MetaButton,
  shadowFlatNeumorphism,
  shadowPressedNeumorphism,
  StyledNeumorphism,
} from "../../styles";
import IconSuccess from "../../styles/iconSuccess";

const ConnectButton: React.FC = () => {
  const { connect, disconnect, address } = useWeb3Context();
  const [copy, setCopy] = useState(false);

  const handleDisconnect = () => {
    localStorage.removeItem("connectorId");
    disconnect();
  };

  const handleCopy = useCallback(() => {
    copyTextToClipboard(address, setCopy);

    setTimeout(() => {
      setCopy(false);
    }, 1500);
  }, [address, setCopy]);

  return (
    <>
      {address ? (
        <StyledConnectedMenu>
          <StyledConnectedContent>
            <StyledWalletIcon src="/icons/wallet.png" />
            {shortAddress(address)}
          </StyledConnectedContent>

          <StyledWrapOptionUser className="dropdown">
            <StyledWrapOptionUser className="container">
              <StyledWrapOptionUser className="content">
                <StypedItemOption onClick={handleCopy}>
                  Copy Address
                  {copy && (
                    <div className={`icon-success`}>
                      <IconSuccess status="success" />
                    </div>
                  )}
                </StypedItemOption>
                <StypedItemOption onClick={handleDisconnect}>
                  Logout
                </StypedItemOption>
              </StyledWrapOptionUser>
            </StyledWrapOptionUser>
          </StyledWrapOptionUser>
        </StyledConnectedMenu>
      ) : (
        <StyledConnectButton onClick={connect}>
          <StyledWalletIcon src="/icons/wallet.png" />
          {"Connect wallet"}
        </StyledConnectButton>
      )}
    </>
  );
};

const StyledWalletIcon = styled.img`
  width: 28px;
  margin-right: 6px;

  @media (max-width: 420px) {
    width: 22px;
    margin-right: 4px;
  }
`;

const StyledConnectButton = styled(MetaButton)`
  height: 48px;
  box-sizing: border-box;
  max-width: 200px;

  position: absolute;
  top: 8px;
  right: 8px;
  margin-left: auto;
  font-size: 16px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.white};
  box-shadow: ${shadowFlatNeumorphism};
  &:hover {
    color: ${(props) => props.theme.colors.text.primary};
    background: unset;
  }

  @media (max-width: 420px) {
    font-size: 12px;
    top: 16px;
    height: 36px;
    max-width: 150px;
  }
`;

const StyledConnectedContent = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const StyledConnectedMenu = styled(StyledNeumorphism)`
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
  top: 8px;
  right: 8px;

  max-width: 200px;
  width: 100%;
  font-weight: 600;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.white};

  &:hover {
    z-index: 999;
    height: 146px;
    .dropdown {
      height: 100px;
      margin-top: 12px,
      border-top: "1px solid #d1d1d1",
    }
  }

  @media (max-width: 420px) {
    height: 126px;
    top: 16px;
    font-size: 10px;
    height: 36px;
    max-width: 150px;
  }
  
  transition: 0.2s;
`;

const StyledWrapOptionUser = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  border-radius: 16px;

  &.dropdown {
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
  font-size: 14px;

  border-radius: 16px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: ${shadowPressedNeumorphism};
  }
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  position: relative;
  .icon-success {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translate(0, -50%);
    transition: 0.2s all ease-in-out;

    @media (max-width: 420px) {
      right: 5px;
    }
  }
`;

export default ConnectButton;
