import React from "react";
import styled from "styled-components";

const SCHIFF_GRAPH =
  "https://res.cloudinary.com/dav8yugzm/image/upload/v1731566237/Schiff-graph-image_euf0pw.png";

const SchiffGraph = () => {
  return (
    <MainContainer>
      <img src={SCHIFF_GRAPH} alt="schiff-graph" />
    </MainContainer>
  );
};

export default SchiffGraph;

const MainContainer = styled.div`
  margin-top: 300px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  img {
    max-width: 50%;
    height: auto;
  }
`;
