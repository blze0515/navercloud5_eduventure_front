import React from "react";
import styled from "styled-components";
import Title from "../components/Title";
import Kim from "../components/Location/Kim";

const LocationContainer = styled.div`
  width: 100%;
  height: 100%;
  position: "relative";
`;

const styles = {
  titleContainer: {
    padding: "20px 0px 20px 50px",
  },
};

const Location = () => {
  return (
    <LocationContainer>
      <div style={styles.titleContainer}>
        <Title subtitle="실시간" title="차량 위치" />
      </div>
      <Kim />
    </LocationContainer>
  );
};

export default Location;
