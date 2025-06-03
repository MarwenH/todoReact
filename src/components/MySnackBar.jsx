import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useSnackBar } from "../contexts/snackBarContext";

export default function SnackBar({ open, msg }) {
  const handleSnackBar = useSnackBar();
  const handleCloseSnackBar = handleSnackBar.handleCloseSnackBar;

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        message="Note archived"
      >
        <Alert variant="filled" severity="success">
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
