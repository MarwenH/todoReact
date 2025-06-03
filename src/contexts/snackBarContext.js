import { createContext, useContext, useState } from "react";
import MySnackBar from "../components/MySnackBar";

const SnackBarContext = createContext({});

export const SnackBarProvider = ({ children }) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");

  const handleOpenSnackBar = (msg) => {
    setOpenSnackBar(true);
    setSnackBarMsg(msg);
  };

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  return (
    <SnackBarContext.Provider
      value={{ handleOpenSnackBar, handleCloseSnackBar }}
    >
      <MySnackBar open={openSnackBar} msg={snackBarMsg} />
      {children}
    </SnackBarContext.Provider>
  );
};

export const useSnackBar = () => {
  return useContext(SnackBarContext);
};
