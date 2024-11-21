import React, { useState, useRef, useLayoutEffect } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import throttle from "lodash.throttle";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
  
  body {
    margin: 0;
    font-family: 'Press Start 2P', cursive;
  }
`;

const BITCOIN_IMG =
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731561402/bitcoin-cryptocurrency_jd1xwl.gif";
const GOLD_BAR_IMG =
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731561416/schiff-gold-bar_etltlv.png";
const GOLD_FALLING_GIPH =
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731632751/gold-falling-schiff-website_hbhzp3.gif";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const glowColors = keyframes`
  0% {
    color: #ff00ff;
    text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff;
  }
  33% {
    color: #00ffff;
    text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff;
  }
  66% {
    color: #ffff00;
    text-shadow: 0 0 5px #ffff00, 0 0 10px #ffff00;
  }
  100% {
    color: #ff00ff;
    text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff;
  }
`;

const Modal = ({ onClose, playAudio }) => {
  const [bitcoinPosition, setBitcoinPosition] = useState({ top: 0, left: 0 });
  const bitcoinRef = useRef(null);
  const goldRef = useRef(null);
  const buttonContainerRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    if (bitcoinRef.current && goldRef.current && buttonContainerRef.current) {
      const goldRect = goldRef.current.getBoundingClientRect();
      const containerRect = buttonContainerRef.current.getBoundingClientRect();
      const bitcoinRect = bitcoinRef.current.getBoundingClientRect();

      const initialTop = (containerRect.height - bitcoinRect.height) / 2;
      const initialLeft = goldRect.width + 20;

      setBitcoinPosition({ top: initialTop, left: initialLeft });
    }
  }, [isMobile]);

  const handleMouseMove = throttle((e) => {
    if (isMobile) return;

    if (bitcoinRef.current && buttonContainerRef.current) {
      const containerRect = buttonContainerRef.current.getBoundingClientRect();
      const evadeDistance = 100;

      const cursorX = e.clientX - containerRect.left;
      const cursorY = e.clientY - containerRect.top;

      const bitcoinCenterX =
        bitcoinPosition.left + bitcoinRef.current.offsetWidth / 2;
      const bitcoinCenterY =
        bitcoinPosition.top + bitcoinRef.current.offsetHeight / 2;

      const dx = bitcoinCenterX - cursorX;
      const dy = bitcoinCenterY - cursorY;
      const distanceFromCursor = Math.sqrt(dx * dx + dy * dy);

      if (distanceFromCursor < evadeDistance) {
        const angle = Math.atan2(dy, dx);
        const moveDistance = 150;
        let newLeft =
          bitcoinCenterX +
          Math.cos(angle) * moveDistance -
          bitcoinRef.current.offsetWidth / 2;
        let newTop =
          bitcoinCenterY +
          Math.sin(angle) * moveDistance -
          bitcoinRef.current.offsetHeight / 2;

        newLeft = Math.max(
          20,
          Math.min(
            newLeft,
            containerRect.width - bitcoinRef.current.offsetWidth - 20
          )
        );
        newTop = Math.max(
          20,
          Math.min(
            newTop,
            containerRect.height - bitcoinRef.current.offsetHeight - 20
          )
        );

        setBitcoinPosition({ top: newTop, left: newLeft });
      }
    }
  }, 50);

  const handleGoldClick = () => {
    playAudio();
    onClose();
  };

  return (
    <>
      <GlobalStyle />
      <ModalContainer>
        <GoldGifOverlay src={GOLD_FALLING_GIPH} alt="Gold Falling Overlay" />

        <ModalTitle>Welcome to the Buillionaire's Den! $SCHIFF</ModalTitle>
        <ModalSubTitle>What is the hardest money on earth?</ModalSubTitle>
        <ButtonContainer
          ref={buttonContainerRef}
          onMouseMove={!isMobile ? handleMouseMove : undefined}
        >
          {!isMobile && (
            <BitcoinButton
              ref={bitcoinRef}
              style={{
                top: `${bitcoinPosition.top}px`,
                left: `${bitcoinPosition.left}px`,
              }}
              role="button"
              tabIndex="0"
              aria-label="Bitcoin Button"
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  // No action on BitcoinButton
                }
              }}
            >
              <BitcoinImage src={BITCOIN_IMG} alt="Bitcoin" />
            </BitcoinButton>
          )}
          {isMobile && (
            <MobileBitcoinButton>
              <BitcoinImage src={BITCOIN_IMG} alt="Bitcoin" />
            </MobileBitcoinButton>
          )}
          {!isMobile && (
            <GoldBar
              ref={goldRef}
              src={GOLD_BAR_IMG}
              alt="Gold Bar"
              onClick={handleGoldClick}
              role="button"
              tabIndex="0"
              aria-label="Close Modal and Play Music"
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleGoldClick();
                }
              }}
            />
          )}
          {isMobile && (
            <MobileGoldBar
              onClick={handleGoldClick}
              role="button"
              tabIndex="0"
              aria-label="Close Modal and Play Music"
            >
              <img src={GOLD_BAR_IMG} alt="Gold Bar" />
            </MobileGoldBar>
          )}
        </ButtonContainer>
      </ModalContainer>
    </>
  );
};

export default Modal;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  justify-content: center;
  align-items: center;
  height: 500px;
  border-radius: 8px;
  gap: 20px;
  background-color: #2c2c2c;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-out;
  overflow: hidden;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 100px 0 0 0;
    justify-content: flex-start;
    transform: none;
    border-radius: 0;
    box-shadow: none;
    gap: 40px;
  }
`;

const GoldGifOverlay = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  opacity: 0.8;
`;

const ModalTitle = styled.h1`
  color: #ff00ff;
  font-family: "Sour Gummy", sans-serif;
  text-align: center;
  animation: ${glowColors} 4s infinite linear;
  text-shadow: 0 0 5px rgba(255, 0, 255, 0.8), 0 0 10px rgba(255, 0, 255, 0.6);
  margin: 0;

  @media (max-width: 768px) {
    font-size: 24px;
    text-align: center;
    box-sizing: border-box;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    max-width: 90%;
  }
`;

const ModalSubTitle = styled.h2`
  color: #ffcc00;
  font-family: "Press Start 2P", cursive;
  font-size: 20px;
  text-align: center;
  border: 2px solid #ffcc00;
  padding: 10px;
  margin-top: 20px;
  display: inline-block;
  transform-origin: center center;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 8px;
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: auto;
    gap: 40px;
  }
`;

const GoldBar = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileGoldBar = styled.button`
  width: 50px;
  height: 50px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const BitcoinButton = styled.button`
  position: absolute;
  background: none;
  border: none;
  padding: 0;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: top 0.3s ease, left 0.3s ease;
  z-index: 1;
  cursor: default;

  &:hover {
    transform: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileBitcoinButton = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const BitcoinImage = styled.img`
  width: 75px;
  height: 75px;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;
