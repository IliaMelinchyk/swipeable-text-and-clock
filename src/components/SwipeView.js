import React, { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import styled from "styled-components";
import ClockView from "./ClockView";
import TextView from "./TextView";

const SwipeView = () => {
  const [isTextarea, setIsTextarea] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Прокрутка убирается когда индекс видимого элемента не равен 0
    index
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "visible");
  }, [index]);

  return (
    <StyledSwipeContainer>
      <ClockView />
      <SwipeableViews
        enableMouseEvents
        disabled={isTextarea}
        onChangeIndex={(index) => setIndex(index)}
      >
        <TextView setIsTextarea={setIsTextarea} active={index} />
        <div></div>
      </SwipeableViews>
    </StyledSwipeContainer>
  );
};

const StyledSwipeContainer = styled.div`
  background-color: #40798c;
`;

export default SwipeView;
