import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const COIN_CAVE_BACKGROUND_IMAGE =
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731549155/pile-of-gold-schiff-website-2_sag7c0.png";

const WALKING_SCHIFF_GIPH =
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731634925/walking-sweatsuit-schiff_zijdgn.gif";

const Main = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>WELCOME TO SCHAIFF AI</HeaderTitle>
      <StyledLink to="/schiffcoin">
        <EnterButton>Enter</EnterButton>
      </StyledLink>
      <AnimatedSchiff src={WALKING_SCHIFF_GIPH} alt="Walking Schiff" />
    </HeaderContainer>
  );
};

export default Main;

const moveAround = keyframes`
  0% {
    top: 10%;
    left: 10%;
  }
  25% {
    top: 10%;
    left: 80%;
  }
  50% {
    top: 80%;
    left: 80%;
  }
  75% {
    top: 80%;
    left: 10%;
  }
  100% {
    top: 10%;
    left: 10%;
  }
`;

const AnimatedSchiff = styled.img`
  position: absolute;
  width: 100px;
  height: auto;
  animation: ${moveAround} 20s linear infinite;
  z-index: 1;

  @media (max-width: 768px) {
    width: 80px;
  }

  @media (max-width: 480px) {
    width: 60px;
  }
`;

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url(${COIN_CAVE_BACKGROUND_IMAGE});
  background-size: cover;
  background-position: center;
  overflow: hidden;
  padding: 0 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const moveUpDown = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const flashColors = keyframes`
  0% {
    color: #00f;
  }
  25% {
    color: #0ff;
  }
  50% {
    color: #0f0;
  }
  75% {
    color: #ff0;
  }
  100% {
    color: #f0f;
  }
`;

const HeaderTitle = styled.h1`
  font-family: "Sour Gummy", sans-serif;
  font-size: 105px;
  margin-bottom: 229px;
  z-index: 2;
  animation: ${moveUpDown} 3s ease-in-out infinite,
    ${flashColors} 6s linear infinite;
  text-align: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 60px;
    margin-bottom: 100px;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 40px;
    margin-bottom: 50px;
    max-width: 80%;
  }
`;

const glow = keyframes`
  0% {
    background-color: #f2a900;
    box-shadow: 0 0 5px #f2a900, 0 0 10px #f2a900, 0 0 20px #ffd700;
  }
  50% {
    background-color: #ffd700;
    box-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #f2a900;
  }
  100% {
    background-color: #f2a900;
    box-shadow: 0 0 5px #f2a900, 0 0 10px #f2a900, 0 0 20px #ffd700;
  }
`;

const EnterButton = styled.button`
  display: flex;
  height: 60px;
  width: 200px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #000;
  border: none;
  background-color: #f2a900;
  animation: ${glow} 3s ease-in-out infinite;
  font-family: "Sour Gummy", sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    background-color 0.3s ease;
  z-index: 2;
  position: relative;
  overflow: hidden;

  &:hover {
    animation: none;
    background-color: #ffd700;
    transform: scale(1.05);
    box-shadow: 0 0 15px #ffd700, 0 0 25px #f2a900;
  }

  &:active {
    transform: scale(0.95);
  }

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    background: rgba(255, 215, 0, 0.5);
    border-radius: 50%;
    transition: width 0.4s ease, height 0.4s ease, opacity 0.8s ease;
    opacity: 0;
  }

  &:focus::after {
    width: 300px;
    height: 300px;
    opacity: 1;
    transition: 0s;
  }

  @media (max-width: 768px) {
    height: 50px;
    width: 160px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    height: 40px;
    width: 120px;
    font-size: 0.9rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  z-index: 2;
`;
