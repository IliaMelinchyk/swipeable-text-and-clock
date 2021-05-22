import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ClockView = () => {
  const [clock, setClock] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const clockInt = setInterval(
      () => setClock(new Date().toLocaleTimeString()),
      1000
    );
    return () => clearInterval(clockInt);
  }, []);

  return (
    <StyledClock>
      {clock.split(":").map((num, i) => (
        <div key={i}>{num}</div>
      ))}
    </StyledClock>
  );
};

const StyledClock = styled.div`
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 16px;
  div {
    background-color: #0b2027;
    color: #f6f1d1;
    padding: 16px;
    font-weight: 600;
    font-size: 60px;
    width: 67px;
    text-align: center;
  }
`;

export default ClockView;
