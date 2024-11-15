import React, { useState, useRef, useCallback, useLayoutEffect } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import throttle from "lodash.throttle";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
  
  body {
    margin: 0;
    padding: 0;
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
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const goldRef = useRef(null);
  const bitcoinRef = useRef(null);
  const buttonContainerRef = useRef(null);

  const handleMouseMove = throttle((e) => {
    if (goldRef.current && buttonContainerRef.current) {
      const goldRect = goldRef.current.getBoundingClientRect();
      const containerRect = buttonContainerRef.current.getBoundingClientRect();
      const evadeDistance = 100;

      const cursorX = e.clientX - containerRect.left;
      const cursorY = e.clientY - containerRect.top;

      const goldCenterX =
        goldRect.left - containerRect.left + goldRect.width / 2;
      const goldCenterY =
        goldRect.top - containerRect.top + goldRect.height / 2;

      const dx = goldCenterX - cursorX;
      const dy = goldCenterY - cursorY;
      const distanceFromCursor = Math.sqrt(dx * dx + dy * dy);

      if (distanceFromCursor < evadeDistance) {
        const angle = Math.atan2(dy, dx);
        const moveDistance = 150;
        let newLeft =
          goldCenterX + Math.cos(angle) * moveDistance - goldRect.width / 2;
        let newTop =
          goldCenterY + Math.sin(angle) * moveDistance - goldRect.height / 2;

        newLeft = Math.max(
          20,
          Math.min(newLeft, containerRect.width - goldRect.width - 20)
        );
        newTop = Math.max(
          20,
          Math.min(newTop, containerRect.height - goldRect.height - 20)
        );

        setPosition({ top: newTop, left: newLeft });
      }
    }
  }, 50);

  useLayoutEffect(() => {
    if (bitcoinRef.current && goldRef.current && buttonContainerRef.current) {
      const bitcoinRect = bitcoinRef.current.getBoundingClientRect();
      const goldRect = goldRef.current.getBoundingClientRect();

      const initialTop = bitcoinRect.height / 2 - goldRect.height / 2;
      const initialLeft = bitcoinRect.width + 20;

      setPosition({ top: initialTop, left: initialLeft });
    }
  }, []);

  const handleBitcoinClick = () => {
    playAudio();
    onClose();
  };

  return (
    <>
      <GlobalStyle />
      <ModalContainer>
        <GoldGifOverlay src={GOLD_FALLING_GIPH} alt="Gold Falling Overlay" />

        <ModalTitle>
          Welcome to the Buillionaire's Den, Peter Schiff's Exclusive Gold Vault
          of Truth. Before we continue, you must answer one question...
        </ModalTitle>
        <ModalSubTitle>What is the hardest money on earth?</ModalSubTitle>
        <ButtonContainer ref={buttonContainerRef} onMouseMove={handleMouseMove}>
          <GoldBar
            ref={goldRef}
            src={GOLD_BAR_IMG}
            alt="Gold Bar"
            style={{ top: position.top, left: position.left }}
            aria-hidden="true"
          />
          <BitcoinButton
            ref={bitcoinRef}
            onClick={handleBitcoinClick}
            role="button"
            tabIndex="0"
            aria-label="Close Modal and Play Music"
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleBitcoinClick();
              }
            }}
          >
            <BitcoinImage src={BITCOIN_IMG} alt="Bitcoin" />
          </BitcoinButton>
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

const spin3D = keyframes`
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  75% {
    transform: rotateX(0deg) rotateY(180deg);
  }
  100% {
    transform: rotateX(0deg) rotateY(0deg);
  }
`;

const ModalTitle = styled.h1`
  color: #ff00ff;
  font-family: "Sour Gummy", sans-serif;
  text-align: center;
  animation: ${glowColors} 4s infinite linear;
  text-shadow: 0 0 5px rgba(255, 0, 255, 0.8), 0 0 10px rgba(255, 0, 255, 0.6);
`;

const ModalSubTitle = styled.h2`
  color: #ffcc00;
  font-family: "Press Start 2P", cursive;
  font-size: 20px;
  text-align: center;
  border: 2px solid #ffcc00;
  padding: 10px;
  display: inline-block;
  animation: ${spin3D} 5s linear infinite;
  transform-origin: center center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const GoldBar = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  transition: top 0.3s ease, left 0.3s ease, transform 0.3s ease;
  pointer-events: none;
`;

const BitcoinButton = styled.button`
  cursor: pointer;
  position: relative;
  background: none;
  border: none;
  padding: 0;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const BitcoinImage = styled.img`
  width: 75px;
  height: 75px;
  object-fit: contain;
`;
