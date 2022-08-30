import React, { useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { shadowPressedNeumorphism, StyledNeumorphism } from "src/styles";
import urlRoute from "src/utils/urlRoute";
import styled from "styled-components";

const navLinks = [
  {
    name: "Dashboard",
    url: urlRoute.dashboard,
  },
  {
    name: "Account",
    url: urlRoute.account,
  },
  {
    isExternal: true,
    name: "Docs",
    url: "https://docs.stash.capital/",
  },
];

const Navigation: React.FC<{ bottomBar?: boolean }> = ({ bottomBar }) => {
  const location = useLocation();
  const refNav = useRef(null);
  const refNeumorpghism = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (refNav?.current && refNeumorpghism?.current) {
        refNeumorpghism.current.style.width =
          (refNav?.current?.clientWidth | 1) - 5 + "px";
        refNeumorpghism.current.style.left =
          (refNav?.current?.offsetLeft || 1) + "px";
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [refNav, refNeumorpghism, location]);

  const renderNav = useMemo(
    () =>
      navLinks.map((item) =>
        item.isExternal ? (
          <StyledExternalNav
            key={(bottomBar ? "nav-bottom-" : "") + item.url}
            href={item.url}
            target="_blank"
          >
            {item.name}
            <img
              src="/icons/external-link.svg"
              style={{ width: 16, marginLeft: 2 }}
            />
          </StyledExternalNav>
        ) : (
          <StyledNav
            key={(bottomBar ? "nav-bottom-" : "") + item.url}
            ref={location.pathname === item.url ? refNav : null}
            to={item.url}
            className={location.pathname === item.url && "active"}
          >
            {item.name}
          </StyledNav>
        )
      ),
    [refNav, location, bottomBar]
  );

  return (
    <StyledWrapNavHeader className="navigation">
      <StyledWrapLinkNav>{renderNav}</StyledWrapLinkNav>
      <StyledCardNeuMorphismNav ref={refNeumorpghism} />
    </StyledWrapNavHeader>
  );
};

const StyledWrapNavHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 16px;

  .active {
    opacity: 1;
  }
`;
const StyledWrapLinkNav = styled(StyledNeumorphism)`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-radius: 16px;
}
`;
const StyledCardNeuMorphismNav = styled.div`
  display: block;
  position: absolute;
  top: 0;
  box-shadow: ${shadowPressedNeumorphism};

  height: 48px;
  border-radius: 16px;

  transition: all 0.5s ease-in-out;
`;

const StyledNav = styled(Link)`
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.secondary};
  text-decoration: none;
  opacity: 0.5;
  padding: 0 24px;
  display: inline;
  transition: all 0.5s ease-in-out;
  border: none !important;
  outline: none !important;
  &.active {
    opacity: 1;
    color: ${(props) => props.theme.colors.red[100]};
  }

  @media (max-width: 420px) {
    font-size: 14px;
  }
`;

const StyledExternalNav = styled.a`
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.secondary};
  text-decoration: none;
  opacity: 0.5;
  padding: 0 24px;
  transition: all 0.5s ease-in-out;
  border: none !important;
  outline: none !important;
  &.active {
    opacity: 1;
    color: ${(props) => props.theme.colors.text.secondary};
  }

  @media (max-width: 420px) {
    font-size: 14px;
    padding: 0 12px;

    img {
      width: 14px !important;
    }
  }
`;

export default Navigation;
