import React from "react";
import styled from "styled-components";

const images = [
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731636111/DALLE_2024-11-13_21.47.50_-_An_epic_scene_depicting_the_Bitcoin_god_defeating_the_Gold_god_in_a_celestial_battle._The_Bitcoin_god_is_shown_landing_a_powerful_punch_on_the__wat3ry.webp",
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731636156/schiff-god_d14yt8.png",
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731636179/schiff-clevar-girl_iifkji.gif",
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731636203/schiff-fetal-position_agoijw.png",
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731636227/schiff-pokemon_vljnvv.gif",
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731636248/schiff-gold-will-save-you_xiqn70.png",
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731636276/schiff-muai-thai_zofgri.gif",
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731636310/schiff-lose-everything_gqh8hz.png",
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731636362/schiff-sitting-gold_crbc7o.jpg",
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731636411/schiff-chalk-board_sddtwj.gif",
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731636473/schiff-matrix_gzeasx.png",
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731636507/schiff-getting-punched-bitcoin_ccdmse.png",
];

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const GridItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const ResponsiveGridContainer = styled(GridContainer)`
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const GridLayout = () => {
  return (
    <ResponsiveGridContainer>
      {images.map((src, index) => (
        <GridItem key={index}>
          <img src={src} alt={`Grid item ${index + 1}`} />
        </GridItem>
      ))}
    </ResponsiveGridContainer>
  );
};

export default GridLayout;
