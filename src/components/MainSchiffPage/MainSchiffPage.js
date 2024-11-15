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

const MainSchiffPage = () => {
  const [showModal, setShowModal] = useState(false);
  const audioRef = useRef(null); 

  useEffect(() => {
    setShowModal(true);
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

      <audio ref={audioRef} src={MP3_FILE} loop />
    </MainSchiffPageContainer>
  );
};

export default MainSchiffPage;

const MainSchiffPageContainer = styled.div`
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
