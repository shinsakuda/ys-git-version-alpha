import React from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

import { InputForm } from "./components/InputForm";
import { List } from "./components/List";

const StyledContainer = styled.div`
  width: 327px;
  margin: 24px auto;
`;

export type TodoList = {
  id: string;
  content: string;
  isCompleted: boolean;
}

function App() {
  const [todoList, setTodoList] = React.useState<TodoList[]>([]);

  const getTodoList = async () => {
    try {
      const res = await fetch("http://localhost:3000/tasks", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      })

      if(!res.ok) {
        throw new Error();
      }

      const data = await res.json();
      setTodoList(data);
    } catch (error) {
      alert('「npm run json-server」でjson-serverを起動してください。')
    }
  }

  React.useEffect(() => {
    getTodoList();
  }, []);

  return (
    <StyledContainer>
      <Typography variant="h1" sx={{fontSize: "32px"}}>今日やること</Typography>
      <InputForm getData={getTodoList} />
      <List getData={getTodoList} todoList={todoList} />
    </StyledContainer>
  )
}

export default App;
