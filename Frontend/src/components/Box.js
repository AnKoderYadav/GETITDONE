import React, { useRef } from "react";
import styled from "styled-components";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const Box = ({ id, text, editItem, deleteItem, updating }) => {
  const ref = useRef();

  const handleDelete = () => {
    ref.current.style.animation = "slide-out 2s ease-out";
    deleteItem();
  };

  return (
    <>
      <Container ref={ref}>
        <div className="text">{text}</div>
        <div className="buttons">
          {updating === id ? (
            <></>
          ) : (
            <>
              <BiEdit className="icon1" onClick={editItem} />
              <AiFillDelete className="icon2" onClick={handleDelete} />
            </>
          )}
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
  cursor: pointer;
  transition: 0.5s;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  animation: slide-in 1s ease;
  .text {
    color: var(--white);
  }
  .buttons {
    display: flex;
    gap: 1rem;
    .icon1 {
      font-size: 1.5rem;
      color: goldenrod;
      transition: 0.5s;
      &:hover {
        color: var(--white);
      }
    }
    .icon2 {
      font-size: 1.5rem;
      color: red;
      transition: 0.5s;
      &:hover {
        color: var(--white);
      }
    }
  }

  &:hover {
    transform: scale(104%);
  }

  @keyframes slide-out {
    from {
      margin: 0;
      opacity: 1;
    }
    to {
      margin-left: 1000px;
      opacity: 0.1;
    }
  }

  @keyframes slide-in {
    from {
      margin-top: 160px;
      opacity: 0;
    }
    to {
      margin: 0;
      opacity: 1;
    }
  }

  @media screen and (max-width: 720px) {
    width: 95%;
  }
`;

export default Box;
