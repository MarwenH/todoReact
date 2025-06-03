import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import { Grid, TextField } from "@mui/material";
import { useTodo } from "../contexts/todosContext";
import { useState, useEffect, useMemo } from "react";

// dialog imports
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackBar } from "../contexts/snackBarContext";

// import todosReducer from "../reducers/todoReducer";

export default function TodoList() {
  // const { todos2, setTodos } = useContext(TodosContext);

  const { todos, todosDispatch } = useTodo();

  console.log(todosDispatch);

  console.log(todos);

  const [selectedTodos, setSelectedTodos] = useState("all");

  const [todoTitleInput, setTodoTitleInput] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const [todoToUpdate, setTodoToUpdate] = useState({
    title: "",
    details: "",
  });

  const [currentDialogTodo, setCurrentDialogTodo] = useState("");

  // use snakbar context

  const handleSnackBar = useSnackBar();
  const handleOpenSnackBar = handleSnackBar.handleOpenSnackBar;

  // load todos

  useEffect(() => {
    // const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    // setTodos(storageTodos);

    todosDispatch({ type: "load" });
    // eslint-disable-next-line
  }, []);

  //add todo

  const handleAddClick = () => {
    // const updatedTodos = [
    //   ...todos,
    //   {
    //     id: uuidv4(),
    //     title: todoTitleInput,
    //     details: "",
    //     isCompleted: false,
    //   },
    // ];

    // if (todoTitleInput !== "") {
    //   setTodos(updatedTodos);
    // }

    // localStorage.setItem("todos", JSON.stringify(updatedTodos));

    todosDispatch({
      type: "add",
      payload: {
        title: todoTitleInput,
      },
    });

    setTodoTitleInput("");
    handleOpenSnackBar("Todo Added successfully");
  };

  // delete todo

  const handleOpenDeleteDilog = (todo) => {
    setOpenDeleteDialog(true);
    setCurrentDialogTodo(todo.id);
  };

  const handleCloseDeleteDilog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteConfirm = () => {
    // const updatedTodos = [...todos].filter((t) => {
    //   return t.id !== currentDialogTodo;
    // });
    // setTodos(updatedTodos);
    // localStorage.setItem("todos", JSON.stringify(updatedTodos));

    todosDispatch({
      type: "del",
      payload: { todoId: currentDialogTodo },
    });

    setOpenDeleteDialog(false);
    handleOpenSnackBar("Todo Deleted successfully");
  };

  // updete todo

  const handleOpenUpdateDilog = (todo) => {
    setCurrentDialogTodo(todo.id);
    setTodoToUpdate({
      title: todo.title,
      details: todo.details,
    });
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDilog = () => {
    setOpenUpdateDialog(false);
  };

  const handleUpdete = () => {
    // const updatedTodos = [...todos].map((t) => {
    //   if (t.id === currentDialogTodo) {
    //     return {
    //       ...t,
    //       title: todoToUpdate.title,
    //       details: todoToUpdate.details,
    //     };
    //   } else return t;
    // });
    // setTodos(updatedTodos);
    // localStorage.setItem("todos", JSON.stringify(updatedTodos));

    todosDispatch({
      type: "update",
      payload: {
        todoId: currentDialogTodo,
        title: todoToUpdate.title,
        details: todoToUpdate.details,
      },
    });

    setOpenUpdateDialog(false);
    handleOpenSnackBar("Todo Updated successfully");
  };

  // filter menu

  const handleSelectedTodos = (event) => {
    setSelectedTodos(event.target.value);
  };

  const doneTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const notDoneTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let TodosTobeRendred = null;

  if (selectedTodos === "done") {
    TodosTobeRendred = doneTodos;
  } else if (selectedTodos === "not-done") {
    TodosTobeRendred = notDoneTodos;
  } else {
    TodosTobeRendred = todos;
  }

  const todoJsx = TodosTobeRendred.map((todo) => (
    <Todo
      key={todo.id}
      todo={todo}
      showDeleteDialog={handleOpenDeleteDilog}
      showUpdateDialog={handleOpenUpdateDilog}
    />
  ));

  return (
    <>
      <Card sx={{ minWidth: 275, maxHeight: "90vh" }}>
        <CardContent>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ color: "text.secondary", fontWeight: "600" }}
          >
            My Tasks
          </Typography>
          <Divider />
          <ToggleButtonGroup
            value={selectedTodos}
            exclusive
            onChange={handleSelectedTodos}
            aria-label="text alignment"
            style={{ margin: "20px 0" }}
            color="primary"
          >
            <ToggleButton value="all" aria-label="all">
              All
            </ToggleButton>
            <ToggleButton value="done" aria-label="done">
              Done
            </ToggleButton>
            <ToggleButton value="not-done" aria-label="not done">
              Not Done
            </ToggleButton>
          </ToggleButtonGroup>
          <br />
          <div style={{ maxHeight: "55vh", overflowY: "scroll" }}>
            {/* All todos */}
            {todoJsx.length > 0 ? todoJsx : <p>The list is empty</p>}
            {/* //All todos// */}
          </div>

          {/* Input todos */}
          <Grid spacing={1} container sx={{ marginTop: "20px" }}>
            <Grid size={8}>
              <TextField
                id="outlined-basic"
                label="Todo Name"
                variant="outlined"
                sx={{ width: "100%" }}
                value={todoTitleInput}
                onChange={(e) => setTodoTitleInput(e.target.value)}
              />
            </Grid>
            <Grid size={4}>
              <Button
                variant="contained"
                sx={{ width: "100%", height: "100%" }}
                onClick={handleAddClick}
                disabled={todoTitleInput === ""}
              >
                Add
              </Button>
            </Grid>
          </Grid>
          {/* //Input todos// */}
        </CardContent>
      </Card>

      {/* delete confirmation dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDilog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* This todo {todo.title} will be deteted once for all */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDilog}>Disagree</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      {/* update dialog */}
      <Dialog
        open={openUpdateDialog}
        onClose={handleCloseUpdateDilog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Update Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={todoToUpdate.title}
            onChange={(e) =>
              setTodoToUpdate({ ...todoToUpdate, title: e.target.value })
            }
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="details"
            name="details"
            label="Details"
            type="text"
            fullWidth
            variant="standard"
            value={todoToUpdate.details}
            onChange={(e) =>
              setTodoToUpdate({ ...todoToUpdate, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDilog}>Disagree</Button>
          <Button onClick={handleUpdete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
