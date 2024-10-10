import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import QuizIcon from "@mui/icons-material/Quiz";
import "./DeleteModal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWorkerClientAction,
  getAllWorkerAction,
  refreshWorkerAction,
} from "../../action/auth_admin/AdminMaintainAction";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
function DeleteModel({ workerData }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isDeleteDelete } = useSelector((state) => state.allworkerState);
  const [open, setOpen] = React.useState(true);
  const[buttonDisabled,setButtonDisabled] = React.useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const deleteHandler = (id) => {
    setButtonDisabled(true);
    dispatch(deleteWorkerClientAction(id));
  };

  React.useEffect(() => {
    if (isDeleteDelete) {
      toast.success("delete successfully");
      setOpen(false);
      setButtonDisabled(false);
    }
    dispatch(getAllWorkerAction());
    dispatch(refreshWorkerAction());
  }, [isDeleteDelete, dispatch, toast]);
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="worker__delete__container"
      >
        <DialogTitle
          style={{ display: "flex", fontSize: "25px",backgroundColor: theme.palette.mode === "dark"?'rgb(18, 48, 85)':'rgb(225, 218, 218)' }}
          id="alert-dialog-title"
        >
          <QuizIcon /> {"Are sure you want to delete this human?"}
        </DialogTitle>
        <DialogContent style={{backgroundColor: theme.palette.mode === "dark"?'rgb(18, 48, 85)':'rgb(225, 218, 218)'}}>
          <DialogContentText
            style={{
              color: "red",
              display: "flex",
              fontWeight: "bold",
              fontSize: "30px",
              fontStyle: "italic",
              margin: "10px",
            }}
            id="alert-dialog-description"
          >
            {workerData?.username}----{workerData?.user?.phone}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ color: "white", backgroundColor: "red" }}
            onClick={handleClose}
          >
            Disagree
          </Button>
          <Button
            style={{ color: "white", backgroundColor: "green" }}
            onClick={() => deleteHandler(workerData?.user?._id)}
            autoFocus
            disabled={buttonDisabled}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DeleteModel;
