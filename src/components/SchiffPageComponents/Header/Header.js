import React from "react";
import styled from "styled-components";

const SCHIFF_HEADER_IMAGE =
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731640768/schiff-header_cpgqtv.png";

const Header = () => {
  return (
    <MainHeaderContainer>
      <ImageContainer></ImageContainer>
    </MainHeaderContainer>
  );
};

export default Header;

const MainHeaderContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 90%;
  height: 400px;
  justify-content: center;
  align-items: center;
  background-image: url(${SCHIFF_HEADER_IMAGE});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;
