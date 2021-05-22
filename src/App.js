import React from "react";
import styled from "styled-components";
import SwipeView from "./components/SwipeView";

const App = () => (
  <StyledAppContainer>
    <SwipeView />
  </StyledAppContainer>
);

const StyledAppContainer = styled.div`
  font-family: "Oswald", sans-serif;
  min-height: 100vh;
`;

export default App;
