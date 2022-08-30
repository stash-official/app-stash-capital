import React from "react";
import { shadowFlatNeumorphism } from "src/styles";
import styled from "styled-components";

const SocialLinks: React.FC = () => {
  return (
    <>
      <StyledLabel>Keep in touch</StyledLabel>
      <StyledWrapper>
        <StyledSocialIcon
          src="/icons/github.svg"
          onClick={() => {
            window.open("https://github.com/stashcapital/StashContracts");
          }}
        />
        <StyledSocialIcon
          src="/icons/medium.svg"
          onClick={() => {
            window.open("https://stashofficial.medium.com");
          }}
        />
        <StyledSocialIcon
          src="/icons/twitter.svg"
          onClick={() => {
            window.open("https://twitter.com/StashOfficial_");
          }}
        />
        <StyledSocialIcon
          src="/icons/telegram.svg"
          onClick={() => {
            window.open("https://t.me/StashOfficialGroup");
          }}
        />
        <StyledSocialIcon
          src="/icons/discord.svg"
          style={{ marginRight: 0 }}
          onClick={() => {
            window.open("https://discord.com/invite/KpDHbV2SwC");
          }}
        />
      </StyledWrapper>
    </>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  justify-content: center;
`;

const StyledLabel = styled.div`
  padding-top: 64px;
  padding-bottom: 12px;
  width: 100%;
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const StyledSocialIcon = styled.img`
  cursor: pointer;
  position: static;
  margin-right: 24px;
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  border-radius: 16px;
  padding: 4px;

  background: ${(props) => props.theme.colors};
  box-shadow: ${shadowFlatNeumorphism};
`;

export default SocialLinks;
