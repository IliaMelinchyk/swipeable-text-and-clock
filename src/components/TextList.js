import React from "react";
import styled from "styled-components";
import { ImCross, ImPencil } from "react-icons/im";

const TextList = (props) => (
  <StyledTextList ref={props.listRef}>
    {props.texts.map((text, index) => (
      <li key={index} aria-label={text}>
        <ImCross onClick={() => props.handleDelete(index)} color="#ca3c25" />
        <ImPencil onClick={() => props.handleEdit(index)} color="#f6f1d1" />
        {text.split("").map((char, index) => (
          <span
            aria-hidden="true"
            key={index}
            style={{ animationDelay: `${0.3 + index / 50}s` }}
          >
            {char}
          </span>
        ))}
      </li>
    ))}
  </StyledTextList>
);

const StyledTextList = styled.ul`
  padding: 0;
  width: 100%;
  overflow: hidden;
  font-size: 20px;
  margin: 0;
  li {
    word-break: break-all;
    margin: 0 10px 16px;
    background-color: #0b2027;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    padding: 18px;
    border-radius: 50px;
    position: relative;
    top: 0;
    opacity: 0;
    animation: message-appear 0.5s forwards;
    @keyframes message-appear {
      0% {
        top: -100px;
        opacity: 0;
      }
      50% {
        top: 16px;
      }
      100% {
        top: 0;
        opacity: 1;
      }
    }
  }
  li span {
    position: relative;
    bottom: 16px;
    opacity: 0;
    animation: char-appear 0.75s forwards;
  }
  @keyframes char-appear {
    0% {
      bottom: 4px;
      opacity: 0;
      color: #f72c25;
    }
    50% {
      bottom: -4px;
      color: #70a9a1;
    }
    100% {
      bottom: 0;
      opacity: 1;
      color: #f6f1d1;
    }
  }
  li svg {
    float: right;
    cursor: pointer;
    transition: transform 0.2s;
    margin-left: 5px;
  }
  li svg:hover {
    transform: scale(1.2);
  }
  li svg:focus {
    transform: scale(1.2);
  }
`;

export default React.memo(TextList, (prevProps, nextProps) =>
  prevProps.texts !== nextProps.texts ? false : true
);
