import React, { useCallback, useEffect, useRef, useState } from "react";
import { FETCH_NEXT_REBASE_TIME_INTERVAL, REBASE_INTERVAL } from "src/constant";
import { useTimeCounter } from "src/hooks/useTimeCounter";
import { fetchLastTimeRebase } from "src/state/app";
import { useAppDispatch } from "src/state/store";
import {
  shadowFlatNeumorphism,
  shadowPressedNeumorphism,
  StyledTextContentA,
  StyledTextTitleA,
} from "src/styles";
import { drawCircle } from "src/utils/canvasHelper";
import styled from "styled-components";
import Skeleton from "../Skeleton/Skeleton";

const Countdown: React.FC<{
  height?: number;
  width?: number;
  endAt: number;
  isRebasing?: boolean
}> = ({ height = 300, width = 300, endAt, isRebasing = true }) => {
  const dispatch = useAppDispatch();

  const refCountdown = useRef(null);
  const rebasedTime = endAt && new Date(endAt);

  const [percentTime, setPercentTime] = useState(0);

  useEffect(() => {
    drawCircle("next-rebase-countdown", width);
  }, [percentTime, width, height]);

  useEffect(() => {
    if (!endAt) {
      setPercentTime(100);
    }
  }, [endAt]);

  const handleDisplayTime = useCallback(
    (counter: { format: any; time: any; }) => {
      if (!endAt) {
        return;
      }

      try {
        if (refCountdown && refCountdown?.current) {
          const formatTime = counter.format;
          const time = counter.time;
          const calPercent = ((REBASE_INTERVAL - time) / REBASE_INTERVAL) * 100;

          if (calPercent !== percentTime) {
            setPercentTime(endAt ? calPercent : 100);
          }
          document.querySelector("#minutes").innerHTML =
            `${formatTime?.minutes || 0}`.padStart(2, "0") || "00";
          document.querySelector("#seconds").innerHTML =
            `${formatTime?.seconds || 0}`.padStart(2, "0") || "00";
        }
      } catch (err) {
        console.error(err);
      }
    },
    [percentTime, endAt]
  );

  const isTimeout = useTimeCounter(rebasedTime, handleDisplayTime);

  useEffect(() => {
    if ((!isRebasing || endAt) && isTimeout) {
      dispatch(fetchLastTimeRebase());
    }
  }, [isTimeout, isRebasing, dispatch, endAt]);

  useEffect(() => {
    if (!isRebasing || !endAt) {
      return;
    }

    const fetch = async () => {
      dispatch(fetchLastTimeRebase());
    };

    const interval = setInterval(fetch, FETCH_NEXT_REBASE_TIME_INTERVAL);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch, endAt, isRebasing]);

  return (
    <StyledWrapper className="countdown" height={height} width={width}>
      <StyledOutner>
        <StyledOutnerSecond>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <StyledWrapCountdown
              ref={refCountdown}
              className="chart"
              id="next-rebase-countdown"
              data-percent={percentTime * 10000}
            />
          </div>
          <StyledInner>
            <StyledTextTitleA>{isRebasing ? "Rebasing..." : "Next rebase"}</StyledTextTitleA>

            <StyledWrapTime>
              <StyledTextContentA id="minutes">
                <Skeleton />
              </StyledTextContentA>
              :
              <StyledTextContentA id="seconds">
                <Skeleton />
              </StyledTextContentA>
            </StyledWrapTime>

          </StyledInner>
        </StyledOutnerSecond>
      </StyledOutner>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ height: number, width: number }>`
  height: ${(props) => props.height || "300"}px;
  width: ${(props) => props.width || "300"}px;
  margin-right: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledOutner = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.background};
  box-shadow: ${shadowFlatNeumorphism};
  position: relative;
  border-radius: 50%;
`;

const StyledOutnerSecond = styled(StyledOutner)`
  position: absolute;
  transform: translate(0, -50%);

  box-shadow: ${shadowPressedNeumorphism};

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 68%;
  height: 68%;
  background: ${(props) => props.theme.colors.background};
  box-shadow: ${shadowFlatNeumorphism};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #e91515;
  font-weight: 700;
  font-size: 24px;
`;

const StyledWrapCountdown = styled.div`
  position: relative;
  width: 94.5%; 
  height: 94.5%;
  display: flex;
  align-items: center;
  justify-content: center;

  canvas {
    width: calc(100% + 20px);
    display: block;
  }
  span {
    color:#555;
    display: block;
    text - align: center;
    font - family: sans - serif;
    font - size: 40px;
    font - weight: 100;
    margin - left: 5px;
  }
`;
const StyledWrapTime = styled.div`
  display: flex;
  align-items: center;
  font-family: "Bebas Neue", cursive;
`;

export default Countdown;
