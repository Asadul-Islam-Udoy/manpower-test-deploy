import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/dashboard/Header";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  getAllCategoriesServicesAction,
  getAllServicesAction,
  refreshServiceAction,
  UpdateServicesAction,
} from "../../action/auth_admin/AdminMaintainAction";
import { toast } from "react-toastify";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { Localhost } from "../../action/host/HostConnection";
function ServiceUpdate() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const[buttonDisabled,setButtonDisabled] = useState(false);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebar, setIsSidebar] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { lodding, allservices, error, isServiceUpdate } = useSelector(
    (state) => state.servicesState
  );
  const { allCategoriesServices } = useSelector(
    (state) => state.servicesCategoiesState
  );

  const singleService = allservices?.find((i) => i._id === id);

  const [serviceName, setServiceName] = useState(singleService?.name);
  const [description, setDescription] = useState(singleService?.description);
  const [servicePrice, setServicePrice] = useState(
    singleService?.service_price
  );
  const [image, setImage] = useState("");
  const [shwoImage, setShowImage] = useState(singleService?.image);
  const [serviceCategory, setServiceCategory] = useState(
    singleService?.service_category_id?._id
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      setButtonDisabled(false)
    }
    setServiceName(singleService?.name);
    setDescription(singleService?.description);
    setServicePrice(singleService?.service_price);
    setShowImage(singleService?.image);
    setServiceCategory(singleService?.service_category_id?._id);
  }, [dispatch, id, error, toast, singleService?.name]);

  useEffect(() => {
    dispatch(getAllCategoriesServicesAction());
    dispatch(getAllServicesAction());
  }, [dispatch]);

  useEffect(() => {
    if (isServiceUpdate) {
      toast.success("service update successfully!");
      navigate("/dashboard/services");
      setButtonDisabled(false)
    }
    dispatch(refreshServiceAction());
  }, [dispatch, toast, navigate, isServiceUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonDisabled(true)
    const myFrom = new FormData();
    myFrom.set("name", serviceName);
    myFrom.set("description", description);
    myFrom.set("service_category_id", serviceCategory);
    myFrom.set("service_price", servicePrice);
    if (image) {
      myFrom.set("image", image);
    }
    dispatch(UpdateServicesAction(id, myFrom));
  };

  return (
    <>
      <div className="sidbar__app">
        <Sidebar isSidebar={isSidebar} />
        <div
          className={
            theme.palette.mode === "dark"
              ? "sidbar__content"
              : "sidbar__container__2"
          }
        >
          <Topbar setIsSidebar={setIsSidebar} />
          <Box m="20px">
            <Header title="UPDATE SERVICE" subtitle="Update a New Service" />

            <Formik>
              <form onSubmit={handleSubmit}>
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
                  <Typography>Service Name</Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    sx={{ gridColumn: "span 4" }}
                    value={serviceName}
                    style={{ color: "red" }}
                    onChange={(e) => setServiceName(e.target.value)}
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
                  <Typography>Service Price</Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    value={servicePrice}
                    sx={{ gridColumn: "span 4" }}
                    onChange={(e) => setServicePrice(e.target.value)}
                  />
                  <Typography>Service Image</Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="file"
                    sx={{ gridColumn: "span 4" }}
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  {image ? (
                    <Typography>
                      <Typography>New Image</Typography>
                      <img
                        style={{ height: "80px", width: "80px" }}
                        src={image && URL.createObjectURL(image)}
                      />
                    </Typography>
                  ) : (
                    <>
                      {shwoImage && (
                        <Typography>
                          <Typography>Old image</Typography>
                          <img
                            style={{ height: "80px", width: "80px" }}
                            src={Localhost + `/images/services/${shwoImage}`}
                          />
                        </Typography>
                      )}
                    </>
                  )}
                  <Typography sx={{ gridColumn: "span 4" }}>
                    Service Caterory
                  </Typography>
                  <Select
                    fullWidth
                    variant="filled"
                    type="text"
                    value={serviceCategory}
                    sx={{ gridColumn: "span 4" }}
                    style={{ cursor: "pointer" }}
                    required
                    onChange={(e) => setServiceCategory(e.target.value)}
                  >
                    <option>Select Service Category</option>
                    {allCategoriesServices?.map((item) => (
                      <MenuItem value={item._id}>{item.category_name}</MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "rgb(80, 166, 245)",
                    }}
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disabled={buttonDisabled}
                  >
                    Update Service
                  </Button>
                </Box>
              </form>
            </Formik>
          </Box>
        </div>
      </div>
    </>
  );
}

export default ServiceUpdate;
