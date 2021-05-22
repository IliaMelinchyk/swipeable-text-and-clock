import React, { useRef, useState } from "react";
import styled from "styled-components";
import TextList from "./TextList";

const TextView = (props) => {
  const [texts, setTexts] = useState([]);
  const [textareaValue, setTextareaValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const textareaRef = useRef(null);
  const listRef = useRef(null);

  /* Запрет свайпа при наведении на поле текстового ввода, для удобства редактирования */
  const handleSwipe = (e) => props.setIsTextarea(e.target.type === "textarea");

  // Удаление из массива значений в стейте по переданному индексу
  const handleDelete = (index) => setTexts(texts.filter((_, i) => i !== index));

  /* При начале редактирования - поле текстового ввода заполняется изменяемым значением, в стейт заносится индекс редактируемого значения и страница прокручивается до поля текстового ввода */
  const handleEdit = (index) => {
    setTextareaValue(texts[index]);
    setEditIndex(index);
    textareaRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!textareaValue) return;
    if (editIndex || editIndex === 0) {
      /* Если был передан индекс изменяемого сообщения то старый стейт копируется во временный массив, в него под переданным индексом вставляется новое значение и заносится в стейт, после чего страница прокручивается до изменяемого элемента и изменяемый индекс стирается */
      const tempTexts = [...texts];
      tempTexts[editIndex] = textareaValue;
      setTexts(tempTexts);
      listRef.current.children[editIndex].scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
      setEditIndex(null);
    } else {
      /* Если индекса не было передано то новое значение вставляется в конец массива и страница прокручивается до конца списка */
      setTexts((prevState) => [...prevState, textareaValue]);
      setTimeout(
        () =>
          listRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          }),
        0
      );
    }
    setTextareaValue("");
  };

  return (
    <StyledTextContainer
      onMouseDown={(e) => handleSwipe(e)}
      onTouchStart={(e) => handleSwipe(e)}
    >
      <StyledTextareaForm onSubmit={handleSubmit} ref={textareaRef}>
        <textarea
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
          placeholder={"Enter text here"}
          required
        />
        <input type="submit" value="Send" />
      </StyledTextareaForm>
      <TextList
        texts={texts}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        listRef={listRef}
      />
    </StyledTextContainer>
  );
};

const StyledTextContainer = styled.div`
  background-color: #f6f1d1;
  min-height: 100vh;
`;

const StyledTextareaForm = styled.form`
  padding: 10px 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  textarea {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

    flex-grow: 1;
    resize: none;
    outline: none;
    padding: 16px;
    border-radius: 40px;
    color: #0b2027;
    font-family: "Oswald", sans-serif;
  }
  textarea:invalid {
    border: 3px solid gray;
    background-color: lightgray;
  }
  textarea:valid {
    border: 3px solid #70a9a1;
    background-color: #cfd7c7;
  }
  input {
    height: 50px;
    width: 100px;
    font-family: "Oswald", sans-serif;
    font-weight: 600;
    font-size: 25px;
    border-radius: 40px;
    padding: 0;
    margin-left: 16px;
    border: none;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    cursor: pointer;
    color: #0b2027;
    background: transparent;
    background-image: linear-gradient(
      120deg,
      #70a9a1 0%,
      #70a9a1 50%,
      #0b2027 50%
    );
    background-size: 220%;
    transition: background-position 0.4s, color 0.4s;
    &:hover {
      transform: translateY(-4px);
      background-position: 100%;
      color: #70a9a1;
    }
    &:focus {
      outline: none;
      transform: translateY(-4px);
      background-position: 100%;
      color: #70a9a1;
    }
    &:active {
      transform: translateY(0px);
      filter: none;
    }
  }
`;

export default TextView;
