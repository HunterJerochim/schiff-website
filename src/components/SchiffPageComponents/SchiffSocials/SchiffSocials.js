import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const DEX_TOOLS_ICON =
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731558161/dextools_logo_full_dark_rx9zn7.svg";

const DEX_SCREENER_LINK =
  "https://dexscreener.com/solana/6byovudbpv3jkkwzgx3vlbeabdymahkzlcjtr2thvytz";

const TWITTER_LINK = "https://x.com/PeterSchiffSol";

const TELEGRAM_LINK = "https://t.me/PeterSchiffToken";

const SchiffSocials = () => {
  return (
    <MainSchiffSocialsContainer>
      <StyledArrow
        icon={faArrowDown}
        arrowColor="#ff0000"
        aria-label="Left Arrow"
      />
      <SchiffSocialsContainer>
        <SchiffTitle>Join Schiff Socials!</SchiffTitle>
        <MainIconContainer>
          <IconsContainer>
            <StyledAnchor
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledIcon icon={faTelegram} size="3x" />
              <IconText>Telegram</IconText>
            </StyledAnchor>
          </IconsContainer>
          <IconsContainer>
            <StyledAnchor
              href={TWITTER_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledIcon icon={faXTwitter} size="3x" />
              <IconText>Twitter</IconText>
            </StyledAnchor>
          </IconsContainer>
          <StyledAnchor
            href={DEX_SCREENER_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            <StyledImage src={DEX_TOOLS_ICON} alt="dex-tools-icon" />
          </StyledAnchor>
        </MainIconContainer>
      </SchiffSocialsContainer>
      <StyledArrow
        icon={faArrowDown}
        arrowColor="#0000ff"
        aria-label="Right Arrow"
      />
    </MainSchiffSocialsContainer>
  );
};

export default SchiffSocials;

const moveUpDown = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const StyledAnchor = styled.a`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const titleGlow = keyframes`
  0% {
    color: #1a1a1a; 
    text-shadow: 0 0 2px #1a1a1a, 0 0 4px #1a1a1a;
  }
  50% {
    color: #000000; 
    text-shadow: 0 0 2px #000000, 0 0 4px #000000;
  }
  100% {
    color: #1a1a1a; 
    text-shadow: 0 0 2px #1a1a1a, 0 0 4px #1a1a1a;
  }
`;

const flashColors = keyframes`
  0% { color: red; }
  25% { color: blue; }
  50% { color: green; }
  75% { color: purple; }
  100% { color: red; }
`;

const MainSchiffSocialsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 50px;
  padding: 20px 200px 20px 200px;
  box-sizing: border-box;
  margin-top: 50px;
`;

const StyledImage = styled.img`
  height: 75px;
  width: 115px;
  cursor: pointer;
`;

const SchiffSocialsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SchiffTitle = styled.h1`
  color: #1a1a1a;
  padding: 10px;
  animation: ${titleGlow} 4s infinite;
  border-radius: 5px;
  font-family: "Sour Gummy", sans-serif;
  text-align: center;

  font-size: 2.5rem;

  padding: 20px;
`;

const MainIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  margin-top: 20px;
`;

const IconsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconText = styled.span`
  font-size: 20px;
  font-weight: bold;
  animation: ${flashColors} 1.5s infinite;
  font-family: "Sour Gummy", sans-serif;
  margin-top: 5px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: #1da1f2;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #0d8ddb;
  }
`;

const arrowGlow = keyframes`
  0% { 
    color: orange; 
    text-shadow: 0 0 5px orange, 0 0 10px orange, 0 0 20px orange;
  }
  25% { 
    color: cyan; 
    text-shadow: 0 0 5px cyan, 0 0 10px cyan, 0 0 20px cyan;
  }
  50% { 
    color: magenta; 
    text-shadow: 0 0 5px magenta, 0 0 10px magenta, 0 0 20px magenta;
  }
  75% { 
    color: yellow; 
    text-shadow: 0 0 5px yellow, 0 0 10px yellow, 0 0 20px yellow;
  }
  100% { 
    color: orange; 
    text-shadow: 0 0 5px orange, 0 0 10px orange, 0 0 20px orange;
  }
`;

const StyledArrow = styled(FontAwesomeIcon)`
  color: ${(props) => props.arrowColor || "#000"};
  animation: ${(props) => arrowGlow} 4s infinite, ${moveUpDown} 2s infinite;
  cursor: pointer;

  font-size: ${(props) => props.size || "6rem"};

  &:hover {
    opacity: 0.8;
  }
`;
