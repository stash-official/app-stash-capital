import React from "react";
import styled from "styled-components";

const Loading: React.FC = () => {
  return (
    <StyledWrapper>
      <StyledContainer>
        <div className="preloader">
          <div className="preloader__square"></div>
          <div className="preloader__square"></div>
          <div className="preloader__square"></div>
          <div className="preloader__square"></div>
        </div>
      </StyledContainer>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
`;

const StyledContainer = styled.div`
  font-size: calc(16px + (32 - 16) * (100vw - 320px) / (2560 - 320));

  .preloader {
    animation: largePopOut 1s linear;
    border-radius: 50%;

    box-shadow: 11px 11px 29px #11181f, -11px -11px 29px #375063;
    margin-bottom: 3em;
    position: relative;
    width: 12em;
    height: 12em;
  }
  .preloader__square {
    animation: smallPopOut1 1s linear, popInOut 6s 1s linear infinite;
    border-radius: 0.5em;
    box-shadow: 11px 11px 29px #11181f, -11px -11px 29px #375063;
    position: absolute;
    top: 2.5em;
    left: 2.5em;
    width: 3em;
    height: 3em;
  }
  .preloader__square:nth-child(n + 2):nth-child(-n + 3) {
    left: 6.5em;
  }
  .preloader__square:nth-child(n + 3) {
    top: 6.5em;
  }
  .preloader__square:nth-child(2) {
    animation: smallPopOut2 1s linear, move2 6s 1s linear infinite;
  }
  .preloader__square:nth-child(3) {
    animation: smallPopOut3 1s linear, move3 6s 1s linear infinite;
  }
  .preloader__square:nth-child(4) {
    animation: smallPopOut4 1s linear, move4 6s 1s linear infinite;
  }
  .status {
    animation: fadeIn 1s linear forwards;
    text-align: center;
  }
  .status__dot {
    animation: appear1 1s 1s steps(1, start) infinite;
    display: inline-block;
  }
  .status__dot:nth-child(2) {
    animation: appear2 1s 1s steps(1, start) infinite;
  }
  .status__dot:nth-child(3) {
    animation: appear3 1s 1s steps(1, start) infinite;
  }

  /* Animations */
  @keyframes largePopOut {
    from,
    20% {
      box-shadow: 0 0 0 #2f4556 inset, 0 0 0 #1b2732 inset, 0 0 0 #1b2732,
        0 0 0 #2f4556;
    }
    40% {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 2em 2em 2em #1b2732,
        -2em -2em 4em #2f4556;
    }
    60%,
    to {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 1em 1em 2em #1b2732,
        -1em -1em 2em #2f4556;
    }
  }
  @keyframes smallPopOut1 {
    from,
    40% {
      box-shadow: 0 0 0 #2f4556 inset, 0 0 0 #1b2732 inset, 0 0 0 #1b2732,
        0 0 0 #2f4556;
    }
    60% {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 0.5em 0.5em 0.5em #1b2732,
        -0.5em -0.5em 1em #2f4556;
    }
    80%,
    to {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 0.25em 0.25em 0.5em #1b2732,
        -0.25em -0.25em 0.5em #2f4556;
    }
  }

  @keyframes smallPopOut2 {
    from,
    45% {
      box-shadow: 0 0 0 #2f4556 inset, 0 0 0 #1b2732 inset, 0 0 0 #1b2732,
        0 0 0 #2f4556;
    }
    65% {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 0.5em 0.5em 0.5em #1b2732,
        -0.5em -0.5em 1em #2f4556;
    }
    85%,
    to {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 0.25em 0.25em 0.5em #1b2732,
        -0.25em -0.25em 0.5em #2f4556;
    }
  }

  @keyframes smallPopOut3 {
    from,
    50% {
      box-shadow: 0 0 0 #2f4556 inset, 0 0 0 #1b2732 inset, 0 0 0 #1b2732,
        0 0 0 #2f4556;
    }
    70% {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 0.5em 0.5em 0.5em #1b2732,
        -0.5em -0.5em 1em #2f4556;
    }
    90%,
    to {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 0.25em 0.25em 0.5em #1b2732,
        -0.25em -0.25em 0.5em #2f4556;
    }
  }

  @keyframes smallPopOut4 {
    from,
    55% {
      box-shadow: 0 0 0 #2f4556 inset, 0 0 0 #1b2732 inset, 0 0 0 #1b2732,
        0 0 0 #2f4556;
    }
    75% {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 0.5em 0.5em 0.5em #1b2732,
        -0.5em -0.5em 1em #2f4556;
    }
    95%,
    to {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 0.25em 0.25em 0.5em #1b2732,
        -0.25em -0.25em 0.5em #2f4556;
    }
  }
  @keyframes popInOut {
    from {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 0.25em 0.25em 0.5em #1b2732,
        -0.25em -0.25em 0.5em #2f4556;
      transform: translate(0, 0);
    }
    4% {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 0.5em 0.5em 0.5em #1b2732,
        -0.5em -0.5em 1em #2f4556;
      transform: translate(0, 0);
    }
    8% {
      box-shadow: 0 0 0 #2f4556 inset, 0 0 0 #1b2732 inset, 0 0 0 #1b2732,
        0 0 0 #2f4556;
      transform: translate(0, 0);
    }
    12%,
    16% {
      box-shadow: 0 0 0 #2f4556 inset, 0 0 0 #1b2732 inset, 0 0 0 #1b2732,
        0 0 0 #2f4556;
      transform: translate(4em, 0);
    }
    20% {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 0.5em 0.5em 0.5em #1b2732,
        -0.5em -0.5em 1em #2f4556;
      transform: translate(4em, 0);
    }
    24%,
    25% {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 0.25em 0.25em 0.5em #1b2732,
        -0.25em -0.25em 0.5em #2f4556;
      transform: translate(4em, 0);
    }
    29% {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 0.5em 0.5em 0.5em #1b2732,
        -0.5em -0.5em 1em #2f4556;
      transform: translate(4em, 0);
    }
    33% {
      box-shadow: 0 0 0 #2f4556 inset, 0 0 0 #1b2732 inset, 0 0 0 #1b2732,
        0 0 0 #2f4556;
      transform: translate(4em, 0);
    }
    37%,
    41% {
      box-shadow: 0 0 0 #2f4556 inset, 0 0 0 #1b2732 inset, 0 0 0 #1b2732,
        0 0 0 #2f4556;
      transform: translate(4em, 4em);
    }
    45% {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 0.5em 0.5em 0.5em #1b2732,
        -0.5em -0.5em 1em #2f4556;
      transform: translate(4em, 4em);
    }
    49%,
    50% {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 0.25em 0.25em 0.5em #1b2732,
        -0.25em -0.25em 0.5em #2f4556;
      transform: translate(4em, 4em);
    }
    54% {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 0.5em 0.5em 0.5em #1b2732,
        -0.5em -0.5em 1em #2f4556;
      transform: translate(4em, 4em);
    }
    58% {
      box-shadow: 0 0 0 #2f4556 inset, 0 0 0 #1b2732 inset, 0 0 0 #1b2732,
        0 0 0 #2f4556;
      transform: translate(4em, 4em);
    }
    62%,
    66% {
      box-shadow: 0 0 0 #2f4556 inset, 0 0 0 #1b2732 inset, 0 0 0 #1b2732,
        0 0 0 #2f4556;
      transform: translate(0, 4em);
    }
    70% {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 0.5em 0.5em 0.5em #1b2732,
        -0.5em -0.5em 1em #2f4556;
      transform: translate(0, 4em);
    }
    74%,
    75% {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 0.25em 0.25em 0.5em #1b2732,
        -0.25em -0.25em 0.5em #2f4556;
      transform: translate(0, 4em);
    }
    79% {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 0.5em 0.5em 0.5em #1b2732,
        -0.5em -0.5em 1em #2f4556;
      transform: translate(0, 4em);
    }
    83% {
      box-shadow: 0 0 0 #2f4556 inset, 0 0 0 #1b2732 inset, 0 0 0 #1b2732,
        0 0 0 #2f4556;
      transform: translate(0, 4em);
    }
    87%,
    91% {
      box-shadow: 0 0 0 #2f4556 inset, 0 0 0 #1b2732 inset, 0 0 0 #1b2732,
        0 0 0 #2f4556;
      transform: translate(0, 0);
    }
    95% {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 0.5em 0.5em 0.5em #1b2732,
        -0.5em -0.5em 1em #2f4556;
      transform: translate(0, 0);
    }
    99%,
    to {
      box-shadow: 0.15em 0.15em 0.15em #2f4556 inset,
        -0.15em -0.15em 0.15em #1b2732 inset, 0.25em 0.25em 0.5em #1b2732,
        -0.25em -0.25em 0.5em #2f4556;
      transform: translate(0, 0);
    }
  }
  @keyframes move2 {
    from,
    8% {
      transform: translate(0, 0);
      width: 3em;
      height: 3em;
    }
    12% {
      transform: translate(-4em, 0);
      width: 7em;
      height: 3em;
    }
    16%,
    83% {
      transform: translate(-4em, 0);
      width: 3em;
      height: 3em;
    }
    87% {
      transform: translate(-4em, 0);
      width: 3em;
      height: 7em;
    }
    91%,
    to {
      transform: translate(-4em, 4em);
      width: 3em;
      height: 3em;
    }
  }
  @keyframes move3 {
    from,
    33% {
      transform: translate(0, 0);
      height: 3em;
    }
    37% {
      transform: translate(0, -4em);
      height: 7em;
    }
    41%,
    to {
      transform: translate(0, -4em);
      height: 3em;
    }
  }
  @keyframes move4 {
    from,
    58% {
      transform: translate(0, 0);
      width: 3em;
    }
    62% {
      transform: translate(0, 0);
      width: 7em;
    }
    66%,
    to {
      transform: translate(4em, 0);
      width: 3em;
    }
  }
  @keyframes fadeIn {
    from,
    67% {
      opacity: 0;
    }
    83.3%,
    to {
      opacity: 1;
    }
  }
  @keyframes appear1 {
    from {
      visibility: hidden;
    }
    33%,
    to {
      visibility: visible;
    }
  }
  @keyframes appear2 {
    from,
    33% {
      visibility: hidden;
    }
    67%,
    to {
      visibility: visible;
    }
  }
  @keyframes appear3 {
    from,
    67% {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
`;

export default Loading;
