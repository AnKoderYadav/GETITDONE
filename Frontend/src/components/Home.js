import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Box from "./Box";
import { fetchTodos, addTodo, deleteTodo, editTodo } from "../utils/API";
import { MdOutlineDarkMode } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState(false);
  const [id, setId] = useState("");
  const [theme, setTheme] = useState("dark-theme");

  useEffect(() => {
    fetchTodos(setTodos);
  }, []);

  const toggleTheme = () => {
    theme === "dark-theme" ? setTheme("light-theme") : setTheme("dark-theme");
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleSearch = (e) => setSearch(e.target.value);
  const handleChange = (e) => setText(e.target.value);

  const handleEdit = (_id, text) => {
    setUpdating(true);
    setId(_id);
    setText(text);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Container>
        {!todos ? (
          <div className="loading">
            <AiOutlineLoading className="loader" />
          </div>
        ) : (
          <div className="main">
            <header>
              <h1>GETITDONE</h1>
              <input
                type="text"
                placeholder="Search"
                name="text"
                onChange={(e) => handleSearch(e)}
              />
            </header>
            <div className="form">
              <MdOutlineDarkMode
                className="icon"
                onClick={() => toggleTheme()}
              />
              <input
                type="text"
                placeholder="Enter Here"
                name="todo"
                value={text}
                onChange={(e) => handleChange(e)}
              />
              <button
                onClick={
                  updating
                    ? () => editTodo(id, text, setText, setUpdating, setTodos)
                    : () => addTodo(text, setText, setTodos)
                }
              >
                {updating ? "EDIT" : "ADD"}
              </button>
            </div>

            {filteredTodos.map((todo) => {
              return (
                <Box
                  key={todo._id}
                  id={todo._id}
                  text={todo.text}
                  deleteItem={() => deleteTodo(todo._id, setTodos)}
                  handleEdit={() => handleEdit(todo._id, todo.text)}
                />
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  .loading {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main {
    min-height: 100%;
    width: 80%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      h1 {
        color: var(--primary);
      }
      input {
        width: 18rem;
        padding: 1rem;
        border: none;
        border-radius: 0.25rem;
        color: var(--primary);
        background-color: var(--grey);
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
          rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
        &:focus {
          outline: 1px solid var(--secondary);
        }
        &::placeholder {
          color: var(--secondary);
        }
      }
    }
    .form {
      width: 75%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      input {
        width: 65%;
        padding: 1rem;
        border: none;
        border-radius: 0.25rem;
        border-bottom: 2px solid var(--white);
        background: transparent;
        color: var(--white);
        transition: 0.5s ease-in-out;
        &:focus {
          outline: none;
          width: 66%;
          border-bottom: 3px solid var(--white);
        }
      }
      button {
        padding: 1rem;
        border: none;
        border-radius: 0.25rem;
        background-color: var(--secondary);
        color: var(--white);
        cursor: pointer;
      }
    }
  }

  @media screen and (max-width: 720px) {
    .main {
      width: 95%;
      header {
        flex-direction: column;
        gap: 2rem;
        input {
          width: 80%;
        }
      }
      .form {
        width: 90%;
      }
    }
  }
`;

export default Home;
