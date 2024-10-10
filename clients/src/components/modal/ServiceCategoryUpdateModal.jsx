import * as React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import QuizIcon from "@mui/icons-material/Quiz";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategoriesServicesAction,
  refreshServiceCategoryAction,
  updateServicesCategoriesAction,
} from "../../action/auth_admin/AdminMaintainAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

function ServiceCategoryUpdateModal({ categoryId }) {
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const navigate = useNavigate();
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(true);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { error, allCategoriesServices, isCategoryUpdate } = useSelector(
    (state) => state.servicesCategoiesState
  );
  const dispatch = useDispatch();
  const singleService = allCategoriesServices?.find(
    (i) => i._id === categoryId
  );
  const [categoryName, setCategoryName] = React.useState(
    singleService?.category_name
  );
  const [description, setDescription] = React.useState(
    singleService?.description
  );
  const [parentId, setParentId] = React.useState(singleService?.parentId?._id);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    const myFrom = new FormData();
    myFrom.set("category_name", categoryName);
    myFrom.set("description", description);
    myFrom.set("parentId", parentId);
    dispatch(updateServicesCategoriesAction(categoryId, myFrom));
  };

  React.useEffect(() => {
    if (error) {
      toast.error(error);
      navigate("/dashboard/services/categories");
      setOpen(false);
      setButtonDisabled(false);
    }
    if (isCategoryUpdate) {
      toast.success("service category update successfully!");
      navigate("/dashboard/services/categories");
      setOpen(false);
      setButtonDisabled(false);
    }
    dispatch(refreshServiceCategoryAction());
  }, [dispatch, error, toast, navigate, isCategoryUpdate]);

  React.useEffect(() => {
    dispatch(getAllCategoriesServicesAction());
  }, [dispatch]);

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
          style={{ display: "flex", fontSize: "25px" ,backgroundColor: theme.palette.mode === "dark"?'rgb(18, 48, 85)':'rgb(225, 218, 218)'}}
          id="alert-dialog-title"
        >
          <QuizIcon /> {"Update Service Category?"}
        </DialogTitle>
        <DialogContent   style={{backgroundColor: theme.palette.mode === "dark"?'rgb(18, 48, 85)':'rgb(225, 218, 218)'}}>
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
          ></DialogContentText>
          <form  onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              <Typography>Service Category Name</Typography>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                sx={{ gridColumn: "span 4" }}
                value={categoryName}
                style={{ color: "red" }}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <Typography>Description</Typography>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                value={description}
                sx={{ gridColumn: "span 4" }}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Typography>Select Parent Service</Typography>
              <Select
                fullWidth
                variant="filled"
                type="text"
                value={parentId}
                sx={{ gridColumn: "span 4" }}
                style={{ cursor: "pointer" }}
                required
                onChange={(e) => setParentId(e.target.value)}
              >
                <option>Select Service Category</option>
                {allCategoriesServices?.map((item) => (
                  <MenuItem value={item._id}>{item.category_name}</MenuItem>
                ))}
              </Select>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                disabled={buttonDisabled}
                style={{
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "rgb(80, 166, 245)",
                }}
                type="submit"
                color="secondary"
                variant="contained"
              >
                Update
              </Button>
            </Box>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ServiceCategoryUpdateModal;
