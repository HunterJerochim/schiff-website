// MainSchiffPage.js
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Header from "../SchiffPageComponents/Header/Header";
import Modal from "../SchiffPageComponents/Modal/Modal";
import SchiffSocials from "../SchiffPageComponents/SchiffSocials/SchiffSocials";
import ContractAddress from "../SchiffPageComponents/ContractAddress/ContractAddress";
import SchiffGraph from "../SchiffPageComponents/SchiffGraph/SchiffGraph";
import GridLayout from "../SchiffPageComponents/GridLayout/GridLayout";

const COIN_CAVE_BACKGROUND_IMAGE =
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731549155/pile-of-gold-schiff-website-2_sag7c0.png";
const MP3_FILE =
  "https://res.cloudinary.com/dav8yugzm/video/upload/v1731638389/Path_of_Exile_-_Goblin_Troupe_Pet_Drum_Bass_ovld7o.mp3";
const SCHIFF_GOBLIN =
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731651346/schiff-goblin_y6dlsj.gif";

const MainSchiffPage = () => {
  const [showModal, setShowModal] = useState(false);
  const audioRef = useRef(null);
  const [position, setPosition] = useState({ top: "0px", left: "0px" });

  useEffect(() => {
    setShowModal(true);
  }, []);

  useEffect(() => {
    const moveGoblin = () => {
      const goblinWidth = 150;
      const goblinHeight = 150;
      const maxWidth = window.innerWidth - goblinWidth;
      const maxHeight = window.innerHeight - goblinHeight;
      const newLeft = Math.floor(Math.random() * maxWidth);
      const newTop = Math.floor(Math.random() * maxHeight);
      setPosition({ top: `${newTop}px`, left: `${newLeft}px` });
    };

    const intervalId = setInterval(moveGoblin, 3000);
    moveGoblin();

    return () => clearInterval(intervalId);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error attempting to play audio:", error);
      });
    }
  };

  return (
    <MainSchiffPageContainer>
      <Header />
      <SchiffSocials />
      <ContractAddress />
      <SchiffGraph />
      <GridLayout />
      {showModal && <Modal onClose={handleCloseModal} playAudio={playAudio} />}
      <GoblinImage
        src={SCHIFF_GOBLIN}
        style={{ top: position.top, left: position.left }}
        alt="Schiff Goblin"
      />
      <audio ref={audioRef} src={MP3_FILE} loop />
    </MainSchiffPageContainer>
  );
};

export default MainSchiffPage;

const MainSchiffPageContainer = styled.div`
  position: relative;
  background-image: url(${COIN_CAVE_BACKGROUND_IMAGE});
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
`;

const GoblinImage = styled.img`
  position: absolute;
  width: 150px;
  height: auto;
  transition: top 2.5s ease, left 2.5s ease;
  z-index: 1000;
  pointer-events: none;
`;
