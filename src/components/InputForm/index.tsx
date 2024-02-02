import React from "react";
import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";

// TODO: pathが異なる場合があります。適宜修正してください。
import type { TodoList } from "~/sample/TodoApp-02/App";

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 327px;
  height: 32px;
  margin-top: 32px;
`;

type Props = {
  setTodoList: React.Dispatch<React.SetStateAction<TodoList[]>>,
  todoList: TodoList[]
};

export const InputForm: React.FC<Props> = ({
  setTodoList,
  todoList
}) => {
  const [content, setContent] = React.useState("");

  const addTodoItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setContent('');
    setTodoList([
      ...todoList,
      {
        id: crypto.randomUUID(),
        content,
        isCompleted: false
      }
    ]);
  }

  return (
    <StyledForm onSubmit={(e) => addTodoItem(e)}>
      <TextField
        id="add-todo-item"
        type="text"
        placeholder="タスクを入力"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        variant="outlined"
        size="small"
        sx={{
          width: "250px",
        }}
      />
      <Button
        type="submit"
        disabled={!content}
        variant="contained"
        size="small"
        sx={{
          minWidth: "57px",
          height: "32px",
          backgroundColor: `${!content ? "#C1C1C1" : "#008CFF"}`,
          boxShadow: "none",
          "&:hover": {
            backgroundColor: `${!content ? "#C1C1C1" : "#008CFF"}`,
            boxShadow: "none"
          },
        }}
      >
        追加
      </Button>
    </StyledForm>
  )
}
