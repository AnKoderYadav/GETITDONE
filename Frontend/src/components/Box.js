import React from "react";
import styled from "styled-components";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const Box = ({ text, handleEdit, deleteItem }) => {
  return (
    <>
      <Container>
        <div className="text">{text}</div>
        <div className="buttons">
          <BiEdit className="icon" onClick={handleEdit} />
          <AiFillDelete className="icon" onClick={deleteItem} />
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 75%;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--grey);
  border-radius: 0.25rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  .text {
    color: var(--white);
  }
  .buttons {
    display: flex;
    gap: 1rem;
  }

  @media screen and (max-width: 720px) {
    width: 95%;
  }
`;

export default Box;
