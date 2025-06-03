import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useTodo } from "../contexts/todosContext";
import { useSnackBar } from "../contexts/snackBarContext";

const Todo = ({ todo, showDeleteDialog, showUpdateDialog }) => {
  //const { todos, setTodos } = useContext(TodosContext);

  const { todosDispatch } = useTodo();

  // use snakbar context

  const handleSnackBar = useSnackBar();
  const handleOpenSnackBar = handleSnackBar.handleOpenSnackBar;

  // check todo

  const handleCheckClicked = () => {
    // const updatedTodos = [...todos].map((t) => {
    //   if (t.id === todo.id) {
    //     return { ...t, isCompleted: !t.isCompleted };
    //   } else return t;
    // });
    // setTodos(updatedTodos);
    // localStorage.setItem("todos", JSON.stringify(updatedTodos));

    todosDispatch({
      type: "check",
      payload: {
        todoId: todo.id,
      },
    });

    handleOpenSnackBar("Todo Updated successfully");
  };

  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          marginTop: "10px",
          marginBottom: "20px",
          backgroundColor: "#0288d1",
          color: "#ffffff",
        }}
        className="todo-card"
      >
        <CardContent>
          <Grid container spacing={2} display="flex" alignItems="center">
            <Grid size={8}>
              <Typography variant="h5" gutterBottom sx={{ textAlign: "left" }}>
                {todo.title}
              </Typography>
              <Typography
                gutterBottom
                sx={{ textAlign: "left", fontSize: "15px" }}
              >
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={4}
              display="flex"
              alignItems="center"
              justifyContent="space-around"
            >
              {/* check Button */}
              <IconButton
                aria-label="check"
                style={{
                  color: todo.isCompleted ? "#ffffff" : "#048a0f",
                  backgroundColor: todo.isCompleted ? "#048a0f" : "#ffffff",
                  border: "2px solid #048a0f",
                }}
                onClick={() => handleCheckClicked()}
              >
                <CheckIcon />
              </IconButton>

              {/* Update Button */}
              <IconButton
                aria-label="edit"
                style={{
                  color: "#04338a",
                  backgroundColor: "#ffffff",
                  border: "2px solid #04338a",
                }}
                onClick={() => {
                  showUpdateDialog(todo);
                }}
              >
                <EditIcon />
              </IconButton>

              {/* Delete Button */}
              <IconButton
                aria-label="delete"
                style={{
                  color: "#8a0404",
                  backgroundColor: "#ffffff",
                  border: "2px solid #8a0404",
                }}
                onClick={() => {
                  showDeleteDialog(todo);
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Todo;
