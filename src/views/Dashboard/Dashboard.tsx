import BigNumber from "bignumber.js";
import React, { useMemo } from "react";
import CardData from "src/components/CardData/CardData";
import Countdown from "src/components/Countdown/Countdown";
import NumberIncreaseEffect from "src/components/NumberIncreaseEffect";
import Skeleton from "src/components/Skeleton/Skeleton";
import { DAY_IN_SEC, REBASE_INTERVAL, YEAR_IN_SEC } from "src/constant";
import { useStashPrice } from "src/hooks/useStashPrice";
import { AppState } from "src/shared/type/State/app";
import { useAppDispatch, useAppSelector } from "src/state/store";
import {
  MetaButton,
  shadowPressedNeumorphism,
  StyledNeumorphism,
} from "src/styles";
import { calcStakingCompoundROI } from "src/utils";
import styled from "styled-components";
import NumberDisplay from "src/components/NumberDisplay/NumberDisplay";
import { parseNumberDisplay } from "../../utils/number";

const Dashboard: React.FC = () => {
  const price = useStashPrice();

  const {
    stashInsuaranceFund,
    stashBurned,
    treasuryBalance,
    timeNextRebase,
    totalSupply,
    marketCap,
    poolValue,
    nextRewardYield,
    avaxPrice,
    stashPrice,
    timeLastRebase,
    treasuryBalanceAvax
  }: AppState = useAppSelector((state) => state.app);

  const marketCapInUSD = useMemo(
    () => marketCap.multipliedBy(avaxPrice),
    [avaxPrice, marketCap]
  );

  const poolValueInUSD = useMemo(
    () => poolValue.multipliedBy(avaxPrice),
    [avaxPrice, poolValue]
  );

  const treasuryBalanceInUSD = useMemo(
    () => (treasuryBalance).multipliedBy(stashPrice).multipliedBy(avaxPrice).plus(treasuryBalanceAvax.multipliedBy(avaxPrice)),
    [avaxPrice, treasuryBalance, stashPrice, treasuryBalanceAvax]
  );

  const stashBurnedInUSD = useMemo(
    () => stashBurned.multipliedBy(stashPrice).multipliedBy(avaxPrice),
    [avaxPrice, stashBurned, stashPrice]
  );

  const stashInsuaranceFundBalanceInUSD = useMemo(
    () => stashInsuaranceFund.multipliedBy(avaxPrice),
    [avaxPrice, stashInsuaranceFund, stashPrice]
  );

  const apy = useMemo(
    () =>
      calcStakingCompoundROI(
        YEAR_IN_SEC / (REBASE_INTERVAL / 1000),
        nextRewardYield
      ) * 100,
    [nextRewardYield]
  );

  const dailyROI = useMemo(
    () =>
      calcStakingCompoundROI(
        DAY_IN_SEC / (REBASE_INTERVAL / 1000),
        nextRewardYield
      ) * 100,
    [nextRewardYield]
  );

  const timeNow = new Date(Date.now()).getTime();
  const isRebasing =
    new Date(timeNextRebase).getTime() < new Date(Date.now()).getTime();

  const timeCountDownRebasing = useMemo(() => {
    if (!isRebasing) return timeLastRebase;
    let time = timeLastRebase + REBASE_INTERVAL;
    do {
      time = time + REBASE_INTERVAL;
    } while (time < timeNow);

    return time
  }, [isRebasing, timeLastRebase, timeNow])

  return (
    <StyledWrapper>
      <StyledSection>
        <Countdown
          endAt={isRebasing ? timeCountDownRebasing : timeNextRebase}
          isRebasing={isRebasing}
        />
        <StyledMainSection>
          <StyledAPYSection>
            <StyledApyIconContainer>
              <img src="/icons/APYIcon.png" alt="icon" />
            </StyledApyIconContainer>

            <StyledValueContainer>
              <Styledlabel>APY</Styledlabel>
              <StyledValue style={{ marginTop: 6 }}>
                {apy ? <>409,494.50%</> : <Skeleton />}
              </StyledValue>
              <Styledlabel style={{ marginTop: 6 }}>
                Daily ROI{" "}
                <StyledROIDisplay>
                  {dailyROI ? (
                    <>
                      <NumberDisplay
                        value={new BigNumber(dailyROI)}
                        fixed={2}
                        decimals={0}
                      />
                      %
                    </>
                  ) : (
                    <Skeleton />
                  )}
                </StyledROIDisplay>{" "}
              </Styledlabel>
            </StyledValueContainer>
          </StyledAPYSection>
          <StyledPriceSection>
            <StyledApyIconContainer>
              <img
                src="logo.png"
                alt="icon"
                style={{ marginTop: 6, width: 56 }}
              />
            </StyledApyIconContainer>
            <StyledValueContainer>
              <Styledlabel>STASH price</Styledlabel>
              {price ? (
                <StyledValue style={{ marginTop: 6 }}>{`$${parseNumberDisplay(
                  price,
                  2
                )}`}</StyledValue>
              ) : (
                <Skeleton />
              )}
              <Styledlabel style={{ marginTop: 6 }}>
                <MetaButton
                  onClick={() => {
                    window.open(
                      "https://traderjoexyz.com/trade?outputCurrency=0x536e911b8BA66c9a8697bF7d7b9924456ABCC9e7#/"
                    );
                  }}
                >
                  Buy now
                </MetaButton>
              </Styledlabel>
            </StyledValueContainer>
          </StyledPriceSection>
        </StyledMainSection>
      </StyledSection>

      <StyledWrapCardCenter className="card-neumorphism">
        <CardData
          title="Stash Reserve"
          content={
            <>
              $
              <NumberIncreaseEffect
                value={treasuryBalanceInUSD || new BigNumber(0)}
              />
            </>
          }
          color="rgb(179, 223, 236)"
          boxColor="rgb(117, 176, 194)"
        />
        <CardData
          title="Market Cap"
          content={
            <>
              $
              <NumberIncreaseEffect
                value={marketCapInUSD || new BigNumber(0)}
              />
            </>
          }
          color="rgb(185, 192, 234)"
          boxColor="rgb(103 108 136)"
        />
        <CardData
          title="Total Supply"
          content={
            <>
              <NumberIncreaseEffect value={totalSupply || new BigNumber(0)} />
            </>
          }
          color="rgb(246, 172, 90)"
          boxColor="rgb(228 129 20)"
        />
        <CardData
          title="STASH burnt"
          content={
            <>
              <NumberIncreaseEffect value={stashBurned || new BigNumber(0)} />
            </>
          }
          color="rgb(179, 223, 236)"
          boxColor="rgb(117, 176, 194)"
        />

        <CardData
          title="Pool Value"
          content={
            <>
              $
              <NumberIncreaseEffect
                value={poolValueInUSD || new BigNumber(0)}
              />
            </>
          }
          color="rgb(240, 114, 92)"
          boxColor="rgb(139 69 56)"
        />
        <CardData
          title="STASH Safety Fund"
          content={
            <>
              $
              <NumberIncreaseEffect
                value={stashInsuaranceFundBalanceInUSD || new BigNumber(0)}
              />
            </>
          }
          color="rgb(246, 172, 90)"
          boxColor="rgb(228 129 20)"
        />
      </StyledWrapCardCenter>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.div`
  margin: 0 auto;
  max-width: 969px;
  animation: zoom 1s;

  @keyframes zoom {
    0% {
      opacity: 0;
      transform: scale(80%);
    }
    50% {
      transform: scale(100%);
    }
    100% {
      opacity: 1;
    }
  }
`;

const StyledWrapCardCenter = styled.div`
  margin: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px 32px;

  @media (max-width: 950px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 16px 16px;
  }
`;

const StyledSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  justify-content: center;

  @media (max-width: 650px) {
    flex-direction: column;
    align-items: flex-start;

    .countdown {
      margin: auto;
    }
  }

  @media (max-width: 620px) and (min-width: 430px) {
    flex-direction: column;
    align-items: flex-start;

    .countdown {
      margin: auto;
      width: 400px;
      margin-top: 200px;
    }
  }

  @media (max-width: 430px) {
  }
`;

const StyledMainSection = styled(StyledNeumorphism)`
  padding: 32px;
  margin-left: -80px;
  padding-left: 80px;
  border-radius: 16px;
  flex: 1 1;
  transition: all 0.2s ease-in-out;

  transition: all 0.5s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: left;

  box-shadow: ${shadowPressedNeumorphism};

  @media (max-width: 940px) and (min-width: 650px) {
    flex-direction: column;
    margin-left: -180px;
    padding-left: 180px;
    align-items: flex-start;
  }

  @media (max-width: 650px) {
    margin-left: 0px;
    margin-top: -64px;
    padding: 24px;
    padding-top: 64px;
    box-sizing: border-box;
    width: 100%;
  }

  @media (max-width: 620px) and (min-width: 430px) {
    flex-direction: column;
    align-items: flex-start;

    padding-top: 24px;
    margin: auto;
    width: auto;
    margin-top: -500px;
  }

  @media (max-width: 430px) {
    flex-direction: column;
    align-items: flex-start;
    padding-top: 84px;
  }
`;

const StyledApyIconContainer = styled(StyledNeumorphism)`
  padding: 12px;
  border-radius: 16px;
  width: 64px;
  height: 64px;

  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
  }
`;

const StyledROIDisplay = styled.div`
  padding: 8px;
  border-radius: 4px;
  margin-left: 8px;
  background: ${(props) => props.theme.colors.red[100]};
  color: #fff;
`;

const StyledValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  width: 148px;
`;

const Styledlabel = styled.div`
  color: ${(props) => props.theme.colors.text.secondary};
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const StyledValue = styled.div`
  background: ${(props) => props.theme.colors.text.gradient};
  font-family: "Bebas Neue", cursive;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-weight: 700;
  font-size: 30px;
`;

const StyledAPYSection = styled.div`
  flex: 1 1;
  display: flex;
  align-items: center;
  justify-content: center;
  

  @media (max-width: 940px) {
    justify-content: flex-start;
    width: 100%:
  }

  @media (max-width: 650px) {
    margin-left: 0px;
    padding-left: 0px;
    box-sizing: border-box;
    width: 100%;
  }

  @media (max-width: 620px) {
    justify-content: center !important;
  }
`;

const StyledPriceSection = styled(StyledAPYSection)`
  flex: 1 1;
  padding-left: 16px;
  @media (max-width: 940px) {
    padding-left: 0px;
    margin-top: 12px;
  }

  @media (max-width: 650px) {
    margin-top: 0px;
    justify-content: flex-end;
  }

  @media (max-width: 620px) and (min-width: 430px) {
    margin-top: 24px;
    padding-top: 446px;
  }

  @media (max-width: 430px) {
    margin-top: 24px;
  }
`;
export default Dashboard;
