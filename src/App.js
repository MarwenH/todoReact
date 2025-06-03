import "./App.css";
import { Container, createTheme } from "@mui/material";
import TodoList from "./components/TodoList";
import { ThemeProvider } from "@emotion/react";
import TodosProvider from "./contexts/todosContext";
// import { v4 as uuidv4 } from "uuid";
// import { useState } from "react";

import { SnackBarProvider } from "./contexts/snackBarContext";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
  palette: {
    primary: {
      main: "#0288d1",
    },
  },
});

// const initialTodos = [
//   {
//     id: uuidv4(),
//     title: "Read a book",
//     details: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "Go to gym",
//     details: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "2 hours of studying",
//     details: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//     isCompleted: false,
//   },
// ];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <SnackBarProvider>
          <div
            className="App"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#212638",
              height: "100vh",
            }}
          >
            <Container maxWidth="sm">
              <TodoList />
            </Container>
          </div>
        </SnackBarProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
