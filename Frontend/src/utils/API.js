const BaseUrl = process.env.REACT_APP_BASE_URL;

export const fetchTodos = (setTodos) => {
  fetch(BaseUrl)
    .then((response) => {
      if (response.ok) {
        // console.log(response);
        return response.json();
      } else {
        throw new Error("API request failed");
      }
    })
    .then((data) => {
      // console.log(data);
      setTodos(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addTodo = (text, setText, setTodos, todos) => {
  fetch(`${BaseUrl}/save`, {
    method: "POST",
    body: JSON.stringify({
      text,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Request Failed");
      }
    })
    .then((data) => {
      console.log(data);
      setTodos([data, ...todos]);
      setText("");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteTodo = (id, setTodos, todos) => {
  fetch(`${BaseUrl}/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Request Failed");
      }
    })
    .then((data) => {
      const arr = todos.filter((todo) => todo._id !== id);
      setTodos(arr);

      // console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editTodo = (id, text, setText, setUpdating, setTodos, todos) => {
  fetch(`${BaseUrl}/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      text,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Request Failed");
      }
    })
    .then((data) => {
      setText("");
      setUpdating("");
      const index = todos.findIndex((todo) => todo._id === id);
      todos[index].text = text;
      setTodos(todos);

      // console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
