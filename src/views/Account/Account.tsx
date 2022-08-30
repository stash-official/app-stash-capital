import React, { useMemo } from "react";
import BigNumber from "bignumber.js";
import Countdown from "src/components/Countdown/Countdown";
import { useWeb3Context } from "src/hooks/web3Context";
import { AccountState } from "src/shared/type/State/account";
import { AppState } from "src/shared/type/State/app";
import { useAppSelector } from "src/state/store";
import { shadowPressedNeumorphism, StyledNeumorphism } from "src/styles";
import { parseNumberDisplay } from "src/utils/number";
import styled from "styled-components";
import { useStashPrice } from "src/hooks/useStashPrice";
import { useTokenBalance } from "src/hooks/useTokenBalance";
import { tokens } from "src/constant/token";
import NumberDisplay from "src/components/NumberDisplay/NumberDisplay";
import {
  YEAR_IN_SEC,
  REBASE_INTERVAL,
  DAY_IN_SEC,
  MONTH_IN_SEC,
  ZERO,
} from "src/constant";
import { calcStakingCompoundROI, getNumberOfElapsedEpochs } from "src/utils";
import Skeleton from "src/components/Skeleton/Skeleton";
import NumberIncreaseEffect from "src/components/NumberIncreaseEffect";

const Dashboard = () => {
  const { address } = useWeb3Context();

  const stashPrice = useStashPrice();
  const stashBalance = useTokenBalance(tokens.stash);

  const { timeNextRebase, nextRewardYield, timeLastRebase }: AppState =
    useAppSelector((state) => state.app);
  const { info }: AccountState = useAppSelector((state) => state.account);

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

  const monthlyROI = useMemo(
    () =>
      calcStakingCompoundROI(
        MONTH_IN_SEC / (REBASE_INTERVAL / 1000),
        nextRewardYield
      ) * 100,
    [nextRewardYield]
  );

  const nextReward = useMemo(
    () => (address ? stashBalance?.multipliedBy(nextRewardYield) : ZERO),
    [nextRewardYield, stashBalance]
  );

  const dailyReward = useMemo(
    () => (address ? stashBalance?.multipliedBy(dailyROI / 100) : ZERO),
    [nextRewardYield, stashBalance]
  );

  const monthlyReward = useMemo(
    () => (address ? stashBalance?.multipliedBy(monthlyROI / 100) : ZERO),
    [nextRewardYield, stashBalance]
  );

  const cumulateTotalEarned = (
    balance: BigNumber,
    totalEarned: BigNumber,
    numberOfElapsedEpochs: number
  ) => {
    for (let i = 0; i < Math.floor(numberOfElapsedEpochs); i++) {
      const previousBalance = balance;
      balance = balance.multipliedBy(nextRewardYield + 1);
      totalEarned = totalEarned.plus(balance.minus(previousBalance));
    }

    return totalEarned;
  };

  const stashEarned = useMemo(() => {
    if (!address || !info) return new BigNumber(0);
    const elapsedEpochs = getNumberOfElapsedEpochs(
      info.lastTransferAtEpochTimestamp,
      timeLastRebase / 1000
    );

    const totalEarned = cumulateTotalEarned(
      info.cummulativeBalance,
      info.totalEarned,
      elapsedEpochs
    );

    return totalEarned.div(10 ** 5);
  }, [address, info, timeLastRebase, stashBalance?.toString(10)]);


  let amountRebasing = 0;
  const timeNow = ((new Date(Date.now())).getTime());
  const isRebasing = (new Date(timeNextRebase).getTime()) < ((new Date(Date.now())).getTime());

  const timeCountDownRebasing = useMemo(() => {
    if (!isRebasing) return timeLastRebase;
    let time = timeLastRebase + REBASE_INTERVAL;
    do {
      amountRebasing++;
      time = time + REBASE_INTERVAL;
    } while (time < timeNow);

    return time
  }, [amountRebasing, isRebasing, timeLastRebase, timeNow])

  return (
    <StyledWrapper>
      <StyledBlueSection>
        <StyledMainSection>
          <div className="inner">
            <StyledValueContainer className="main top">
              <Styledlabel className="main">Your STASH earned</Styledlabel>
              <StyledMainValue>
                {address ? (
                  stashEarned ? (
                    <>
                      <NumberIncreaseEffect
                        start={stashEarned || new BigNumber(0)}
                        value={stashEarned || new BigNumber(0)}
                      />{" "}
                      STASH
                    </>
                  ) : (
                    <Skeleton />
                  )
                ) : (
                  <>0 STASH</>
                )}{" "}
              </StyledMainValue>
            </StyledValueContainer>
            <StyledValueContainer className="main" style={{ flex: "1 1" }}>
              <Styledlabel className="main">Your balance</Styledlabel>
              <StyledMainValue>
                {stashBalance ? (
                  <>
                    <NumberIncreaseEffect
                      start={stashBalance || new BigNumber(0)}
                      value={stashBalance || new BigNumber(0)}
                    />{" "}
                    STASH
                  </>
                ) : address ? (
                  <Skeleton />
                ) : (
                  <>0 STASH</>
                )}{" "}
              </StyledMainValue>
            </StyledValueContainer>
            <StyledValueContainer className="main">
              <Styledlabel className="main">Stash Price</Styledlabel>
              <StyledMainValue>
                ${parseNumberDisplay(stashPrice, 2)}
              </StyledMainValue>
            </StyledValueContainer>
          </div>
        </StyledMainSection>
      </StyledBlueSection>
      <StyledWhiteSection>
        <StyledSection>
          <Countdown width={400} height={400} endAt={isRebasing ? timeCountDownRebasing : timeNextRebase} isRebasing={isRebasing} />
          <StyledWrapCardCenter className="card-neumorphism">
            <StyledValueCard>
              <StyledValueContainer>
                <Styledlabel>APY</Styledlabel>
                <StyledValue className="main" style={{ fontSize: "26px" }}>
                  {apy ? <>409,494.50%</> : <Skeleton />}
                </StyledValue>
              </StyledValueContainer>
            </StyledValueCard>
            <StyledValueCard style={{
              flexDirection: 'column'
            }}>
              < div style={{ display: "flex", justifyContent: 'space-between', marginBottom: '4px' }}>
                <StyledValueContainer>
                  <Styledlabel>Next Reward Amount</Styledlabel>
                  <StyledWrapInfoNextRebase>
                    <StyledValue>
                      {nextReward ? (
                        <>
                          <NumberDisplay
                            value={nextReward}
                            fixed={2}
                            decimals={0}
                          />{" "}
                          STASH
                        </>
                      ) : (
                        <Skeleton />
                      )}{" "}
                    </StyledValue>
                  </StyledWrapInfoNextRebase>

                </StyledValueContainer>
                <Styledlabel
                  style={{ textAlign: "right", display: "inline-block" }}
                >
                  Next Reward Yield{" "}
                  <StyledROIDisplay>
                    {" "}
                    {nextRewardYield ? (
                      <>
                        <NumberDisplay
                          value={new BigNumber(nextRewardYield * 100)}
                          fixed={5}
                          decimals={0}
                        />
                        %
                      </>
                    ) : (
                      <Skeleton />
                    )}
                  </StyledROIDisplay>{" "}
                </Styledlabel>
              </div>

              {
                amountRebasing > 1 && (
                  <Styledlabel>
                    {`+ ${nextReward?.multipliedBy(amountRebasing).toFixed(5, BigNumber.ROUND_FLOOR).toString()}
                        STASH from ${amountRebasing} untriggered rebases`}
                  </Styledlabel>
                )
              }

            </StyledValueCard>
            <StyledValueCard>
              <StyledValueContainer>
                <Styledlabel>Est. Daily Reward</Styledlabel>
                <StyledValue>
                  {dailyReward ? (
                    <>
                      <NumberDisplay
                        value={dailyReward}
                        fixed={2}
                        decimals={0}
                      />{" "}
                      STASH
                    </>
                  ) : (
                    <Skeleton />
                  )}{" "}
                </StyledValue>
              </StyledValueContainer>
              <Styledlabel
                style={{ textAlign: "right", display: "inline-block" }}
              >
                Daily ROI{" "}
                <StyledROIDisplay>
                  {dailyROI ? (
                    <>
                      <NumberDisplay
                        value={new BigNumber(dailyROI)}
                        fixed={5}
                        decimals={0}
                      />
                      %
                    </>
                  ) : (
                    <Skeleton />
                  )}
                </StyledROIDisplay>{" "}
              </Styledlabel>
            </StyledValueCard>
            <StyledValueCard>
              <StyledValueContainer>
                <Styledlabel>Est. Monthly Reward</Styledlabel>
                <StyledValue>
                  {monthlyReward ? (
                    <>
                      <NumberDisplay
                        value={monthlyReward}
                        fixed={2}
                        decimals={0}
                      />{" "}
                      STASH
                    </>
                  ) : (
                    <Skeleton />
                  )}{" "}
                </StyledValue>
              </StyledValueContainer>
              <Styledlabel
                style={{ textAlign: "right", display: "inline-block" }}
              >
                Monthly ROI{" "}
                <StyledROIDisplay>
                  {monthlyROI ? (
                    <>
                      <NumberDisplay
                        value={new BigNumber(monthlyROI)}
                        fixed={5}
                        decimals={0}
                      />
                      %
                    </>
                  ) : (
                    <Skeleton />
                  )}
                </StyledROIDisplay>{" "}
              </Styledlabel>
            </StyledValueCard>
          </StyledWrapCardCenter>
        </StyledSection>
      </StyledWhiteSection >
    </StyledWrapper >
  );
};
const StyledWrapper = styled.div`
  margin: 0 auto;

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

const StyledBlueSection = styled.div`
  padding-bottom: 128px;
  padding: 16px;
`;

const StyledWhiteSection = styled.div`
  background: ${(props) => props.theme.colors.background};
  border-radius: 64px;

  @media (max-width: 450px) {
    border-radius: 38px;
  }
`;

const StyledWrapCardCenter = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px 16px;
  border-radius: 16px;
  flex: 1 1;

  @media (max-width: 800px) and (min-width: 650px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 800px) {
    margin: auto;
    margin-top: 56px;
    width: 100%;
    box-sizing: border-box;
  }
`;

const StyledValueCard = styled(StyledNeumorphism)`
  padding: 22px;
  border-radius: 16px;

  display: flex;
  justify-content: space-between;

  &.main {
    background: ${(props) => props.theme.colors.text.primary};
  }
`;

const StyledSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  justify-content: center;

  max-width: 969px;
  margin: auto;
  margin-top: 24px;

  @media (max-width: 800px) {
    flex-direction: column;

    .countdown {
      width: 300px;
      height: 300px;
      margin-right: 0px;
    }
  }

  @media (max-width: 969px) {
    padding: 16px;
  }
`;

const StyledMainSection = styled(StyledNeumorphism)`
  border-radius: 16px;
  max-width: 969px;
  margin: auto;
  flex: 1 1;
  transition: all 0.2s ease-in-out;

  transition: all 0.5s ease-in-out;
  .inner {
    height: 100%;
    border-radius: 16px;
    padding: 32px 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;

    @media (max-width: 710px) {
      flex-direction: column;
    }

    @media (max-width: 480px) {
      flex-direction: column;
      padding: 24px 12px;
    }
  }
`;

const StyledROIDisplay = styled.div`
  border-radius: 4px;
  margin-left: 8px;
  color: #e69405;
  color: ${(props) => props.theme.colors.text.primary};
  text-align: right;

  font-weight: 700;
  margin-top: 8px;
  font-size: 14px;
`;

const StyledValueContainer = styled.div`
  display: flex;
  flex-direction: column;

  &.main {
    align-items: center;
    @media (max-width: 710px) {
      &.top {
        margin-top: 0px;
      }

      align-items: center;
      margin-top: 24px;
    }
  }
`;

const Styledlabel = styled.div`
  color: ${(props) => props.theme.colors.text.secondary};
  font-weight: 400;
  font-size: 12px;
  display: flex;
  align-items: center;

  &.main {
    font-size: 16px;
    color: #fff;
    @media (max-width: 950px) and(min-width: 710px) {
      font-size: 12px;
    }

    @media (max-width: 400px) {
      font-size: 12px;
    }
  }
`;

const StyledValue = styled.div`
  font-family: "Bebas Neue", cursive;
  color: ${(props) => props.theme.colors.text.white};
  font-weight: 700;
  font-size: 24px;
  margin-top: 4px;

  @media (max-width: 350px) {
    font-size: 28px;
  }

  &.main {
    background: ${(props) => props.theme.colors.text.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;

const StyledMainValue = styled.div`
  font-family: "Bebas Neue", cursive;

  color: #fff;
  font-weight: 600;
  font-size: 40px;
  margin-top: 4px;

  border-radius: 8px;

  @media (max-width: 950px) and (min-width: 710px) {
    font-size: 22px;
  }

  @media (max-width: 710px) {
    margin-top: 4px;
  }

  @media (max-width: 400px) {
    font-size: 28px;
  }
`;

const StyledWrapInfoNextRebase = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .icon-warning {
    width: 20px;
    margin-left: 8px;
    cursor: pointer;
  }
`;

export default Dashboard;
