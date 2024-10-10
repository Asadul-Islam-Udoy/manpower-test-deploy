import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/dashboard/Header";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import React, { useContext, useEffect, useState } from "react";
import "./worker.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  getAllServicesAction,
  getSingleWorkerAction,
  workerProfileUpdateAction,
} from "../../action/auth_admin/AdminMaintainAction";
import { toast } from "react-toastify";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme } from "@emotion/react";
function WorkerUpdate() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebar, setIsSidebar] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { singleworker } = useSelector((state) => state.sigleWorkerState);
  const { isUpdateWorker } = useSelector((state) => state.allworkerState);
  const { lodding, allservices, error } = useSelector(
    (state) => state.servicesState
  );

  const [username, setUserName] = useState(singleworker?.username);
  const [address, setAddress] = useState(singleworker?.address);
  const [area, setArea] = useState(singleworker?.area);
  const [nidnumber, setNidNumber] = useState("");
  const [relationship, setRelationShip] = useState(singleworker?.relationship);
  const [gender, setGender] = useState(singleworker?.gender);
  const [education_qualification, setEducation] = useState(
    singleworker?.education_qualification
  );
  const [languages, setLanguage] = useState([]);
  const [servicesId, setServices] = useState([]);
  const [profile_description, setProfileDescription] = useState(
    singleworker?.profile_description
  );

  ///service defalut show handler
  function showServiceHandler(singleworker, item) {
    const result = singleworker?.services?.find((i) => i.service?.name == item);
    if (result) {
      return true;
    }
    return false;
  }

  ///language defalut show handler
  function showLanguageHandler(singleworker, item) {
    const result = singleworker?.languages?.find((i) => i == item);
    if (result) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (singleworker?.services?.length > 0) {
      singleworker?.services?.forEach((element) => {
        if (!servicesId.includes(element.service?._id)) {
          setServices((pre) => [...pre, element.service?._id]);
        }
      });
    }
    if (error) {
      toast.error(error);
      setButtonDisabled(false);
    }
  }, [error, toast, singleworker?.services?.length > 0]);

  useEffect(()=>{
    if (singleworker?.languages?.length > 0) {
      singleworker?.languages?.forEach((element) => {
        if (!languages.includes(element)) {
          setLanguage((pre) => [...pre, element]);
        }
      });
    }
  },[singleworker?.languages?.length > 0]);


  useEffect(() => {
    setUserName(singleworker?.username);
    setAddress(singleworker?.address);
    setArea(singleworker?.area);
    setProfileDescription(singleworker?.profile_description);
    setRelationShip(singleworker?.relationship);
    setGender(singleworker?.gender);
    setEducation(singleworker?.education_qualification);
    setNidNumber(singleworker?.nid_number);
  }, [singleworker]);

  useEffect(() => {
    if (isUpdateWorker) {
      toast.success("profile update successfully!");
      navigate("/dashboard/worker");
      setButtonDisabled(false);
    }
  }, [isUpdateWorker, toast, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    dispatch(
      workerProfileUpdateAction(
        id,
        username,
        address,
        area,
        profile_description,
        relationship,
        languages,
        gender,
        education_qualification,
        nidnumber,
        servicesId
      )
    );
  };

  const ServiceHandler = (item) => {
    if (!servicesId.includes(item)) {
      setServices((pre) => [...pre, item]);
    } else {
      setServices((pre) => servicesId.filter((i) => i !== item));
    }
  };

  const LanguageHandler = (item) => {
    if (!languages.includes(item)) {
      setLanguage((pre) => [...pre, item]);
    } else {
      setLanguage((pre) => languages.filter((i) => i !== item));
    }
  };

  useEffect(() => {
    dispatch(getSingleWorkerAction(id));
    dispatch(getAllServicesAction());
  }, [dispatch, id]);

  const languageList = ["Bangla", "English", "Hindi", "Arobiq"];
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
            <Header title="UPDATE WORKER" subtitle="Update a New Worker" />

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
                  <Typography>Username</Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    sx={{ gridColumn: "span 4" }}
                    value={username}
                    style={{ color: "red" }}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <Typography>Address</Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    value={address}
                    sx={{ gridColumn: "span 4" }}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <Typography>Area</Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    value={area}
                    sx={{ gridColumn: "span 4" }}
                    onChange={(e) => setArea(e.target.value)}
                  />
                  <Typography sx={{ gridColumn: "span 4" }}>
                    NID NUMBER
                  </Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    value={nidnumber}
                    sx={{ gridColumn: "span 4" }}
                    onChange={(e) => setNidNumber(e.target.value)}
                  />
                  <Typography sx={{ gridColumn: "span 4" }}>
                    Education Qualication
                  </Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    value={education_qualification}
                    onChange={(e) => setEducation(e.target.value)}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <Typography sx={{ gridColumn: "span 4" }}>
                    Profile Description
                  </Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    value={profile_description}
                    onChange={(e) => setProfileDescription(e.target.value)}
                    sx={{ gridColumn: "span 4" }}
                  />
                  {/* ///checkbox start*/}
                  <FormControl
                    sx={{ m: 3 }}
                    component="fieldset"
                    variant="standard"
                    style={{ width: "76vw" }}
                  >
                    {/* gender */}
                    <Typography style={{ color: "green" }}>Gender</Typography>
                    <FormControl
                      style={{ backgroundColor: "#1446a1", width: "50%" }}
                    >
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                    
                          value="male"
                          control={<Radio />}
                          label="Male"
                          onClick={(e) => setGender("Male")}
                          style={{
                            color:
                              singleworker?.gender == "Male" ? "red" : "white",
                          }}
                        />
                        <FormControlLabel
                   
                          value="females"
                          control={<Radio />}
                          label="Female"
                          onClick={(e) => setGender("Female")}
                          style={{
                            color:
                              singleworker?.gender == "Female"
                                ? "red"
                                : "white",
                          }}
                        />

                        <FormControlLabel
                      
                          value="other"
                          control={<Radio />}
                          label="Other"
                          onClick={(e) => setGender("Other")}
                          style={{
                            color:
                              singleworker?.gender == "Other" ? "red" : "white",
                          }}
                        />
                      </RadioGroup>
                    </FormControl>

                    {/* relationship */}
                    <Typography style={{ color: "green" }}>
                      Relationship
                    </Typography>
                    <FormControl
                      style={{ backgroundColor: "#1446a1", width: "50%" }}
                    >
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                        
                          value="married"
                          control={<Radio />}
                          label="Married"
                          style={{
                            color:
                              singleworker?.relationship == "Married"
                                ? "red"
                                : "white",
                          }}
                          onClick={(e) => setRelationShip("Married")}
                        />
                        <FormControlLabel
                          value="single"
                          control={<Radio />}
                          label="Single"
                          onClick={(e) => setRelationShip("Single")}
                          style={{
                            color:
                              singleworker?.relationship == "Single"
                                ? "red"
                                : "white",
                          }}
                        />
                      </RadioGroup>
                    </FormControl>

                    {/* language */}
                    <Typography style={{ color: "green" }}>
                      Languages
                    </Typography>
                    {languageList.map((i) => (
                      <FormControlLabel
                        label={i}
                        control={
                          <Checkbox
                            {...label}
                            defaultChecked={showLanguageHandler(
                              singleworker,
                              i
                            )}
                            color="secondary"
                            onClick={() => LanguageHandler(i)}
                          />
                        }
                      />
                    ))}

                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "#123a93",
                        padding: "5px",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      <FormLabel>WROKERS SERVICES</FormLabel>
                    </div>
                    <FormGroup
                      style={{
                        minHeight: "100px",
                        margin: "5px",
                        display: "inline-block",
                        width: "40%",
                      }}
                    >
                      {allservices?.map((item, index) => (
                        <FormControlLabel
                          label={`${item.name}`}
                          control={
                            <Checkbox
                              {...label}
                              defaultChecked={showServiceHandler(
                                singleworker,
                                item.name
                              )}
                              color="secondary"
                              onClick={() => ServiceHandler(item._id)}
                            />
                          }
                        />
                      ))}
                    </FormGroup>
                    <FormHelperText>Be careful</FormHelperText>
                  </FormControl>
                  {/* <FormControl
                    required
                    component="fieldset"
                    sx={{ m: 3 }}
                    variant="standard"
                  >
                    <FormLabel>TIME SCHEDULE</FormLabel>
                    <FormGroup style={{ height: "250px", overflow: "scroll" }}>
                      {/* hours group */}
                  {/* <ButtonGroup
                        size="small"
                        aria-label="small outlined button group"
                        style={{ margin: "10px" }}
                      >
                        {" "}
                        <Typography style={{ color: "blue" }}>HOURS</Typography>
                        <Button
                          style={{
                            backgroundColor: "white",
                            marginLeft: "22px",
                          }}
                          onClick={() => {
                            setCounterHour((counterhour) => counterhour + 1);
                          }}
                        >
                          +
                        </Button>
                        <Button style={{ color: "red" }} disabled>
                          {counterhour}
                        </Button>
                        <Button
                          style={{ backgroundColor: "white", color: "black" }}
                          disabled={counterhour <= 0}
                          onClick={() => {
                            setCounterHour((counterhour) => counterhour - 1);
                          }}
                        >
                          -
                        </Button>
                      </ButtonGroup> */}
                  {/* days group */}
                  {/* <ButtonGroup
                        size="small"
                        aria-label="small outlined button group"
                        style={{ margin: "10px" }}
                      >
                        {" "}
                        <Typography style={{ color: "blue" }}>DAYS</Typography>
                        <Button
                          style={{
                            backgroundColor: "white",
                            marginLeft: "33px",
                          }}
                          onClick={() => {
                            setCounterDay((counterday) => counterday + 1);
                          }}
                        >
                          +
                        </Button>
                        <Button style={{ color: "red" }} disabled>
                          {counterday}
                        </Button>
                        <Button
                          style={{ backgroundColor: "white", color: "black" }}
                          disabled={counterday <= 0}
                          onClick={() => {
                            setCounterDay((counterday) => counterday - 1);
                          }}
                        >
                          -
                        </Button>
                      </ButtonGroup> */}
                  {/* mounth group */}
                  {/* <ButtonGroup
                        size="small"
                        aria-label="small outlined button group"
                        style={{ margin: "10px" }}
                      >
                        {" "}
                        <Typography style={{ color: "blue" }}>
                          MOUNTH
                        </Typography>
                        <Button
                          style={{
                            backgroundColor: "white",
                            marginLeft: "10px",
                          }}
                          onClick={() => {
                            setCounterMounth(
                              (countermounth) => countermounth + 1
                            );
                          }}
                        >
                          +
                        </Button>
                        <Button style={{ color: "red" }} disabled>
                          {countermounth}
                        </Button>
                        <Button
                          style={{ backgroundColor: "white", color: "black" }}
                          disabled={countermounth <= 0}
                          onClick={() => {
                            setCounterMounth(
                              (countermounth) => countermounth - 1
                            );
                          }}
                        >
                          -
                        </Button>
                      </ButtonGroup> */}
                  {/* years group */}
                  {/* <ButtonGroup
                        size="small"
                        aria-label="small outlined button group"
                        style={{ margin: "10px" }}
                      >
                        {" "}
                        <Typography style={{ color: "blue" }}>YEARS</Typography>
                        <Button
                          style={{
                            backgroundColor: "white",
                            marginLeft: "25px",
                          }}
                          onClick={() => {
                            setCounterYear((counteryear) => counteryear + 1);
                          }}
                        >
                          +
                        </Button>
                        <Button style={{ color: "red" }} disabled>
                          {counteryear}
                        </Button>
                        <Button
                          style={{ backgroundColor: "white", color: "black" }}
                          disabled={counteryear <= 0}
                          onClick={() => {
                            setCounterYear((counteryear) => counteryear - 1);
                          }}
                        >
                          -
                        </Button>
                      </ButtonGroup>
                    </FormGroup>
                    <FormHelperText>You can display an error</FormHelperText> 
                  </FormControl> */}

                  {/* end checkbok */}
                  {/* <TextField
                    fullWidth
                    variant="filled"
                    type="file"
                    onChange={(e) => setAvatar(e.target.files[0])}
                    sx={{ gridColumn: "span 4" }}
                  />
                  {avatar ? (
                    <Typography>
                      <Typography>New Avatar</Typography>
                      <Avatar src={avatar && URL.createObjectURL(avatar)} />
                    </Typography>
                  ) : (
                    <Typography>
                      <Typography>Old Avatar</Typography>
                      <Avatar
                        src={Localhost + `/images/avatar/${shwoAvator}`}
                      />
                    </Typography> */}
                  {/* )} */}
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button
                    disabled={buttonDisabled}
                    type="submit"
                    color="secondary"
                    variant="contained"
                  >
                    Update Worker
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

export default WorkerUpdate;
