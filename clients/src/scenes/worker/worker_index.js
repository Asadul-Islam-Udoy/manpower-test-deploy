import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ColorModeContext, tokens } from "../../theme";
import Header from "../../components/dashboard/Header";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useTheme, Typography } from "@mui/material";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Localhost } from "../../action/host/HostConnection";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllWorkerAction,
  getSingleWorkerAction,
} from "../../action/auth_admin/AdminMaintainAction";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import WorkerDeleteModel from "../../components/modal/DeleteModal";
import { Link } from "react-router-dom";
import AvatarUpdateModal from "../../components/modal/AvatarUpdateModal";
const Worker = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isSidebar, setIsSidebar] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [workerId, setWorkerId] = useState("");
  const [shwoAvator, setShowAvatar] = useState(false);
  const dispatch = useDispatch();

  const { lodding, error, allworkers } = useSelector(
    (state) => state.allworkerState
  );
  const { singleworker } = useSelector((state) => state.sigleWorkerState);

  const deleteHandler = (id) => {
    dispatch(getSingleWorkerAction(id));
    setDeleteModal((pre) => !pre);
  };

  const avatarUpdateHandler = (id) => {
    setShowAvatar((pre) => !pre);
    setWorkerId(id);
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number Or Email",
      flex: 1,
    },
    {
      field: "isfree",
      headerName: "Worker Free",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    
    {
      field: "area",
      headerName: "Area",
      flex: 1,
    },
    {
      field: "nidnumber",
      headerName: "NID Number",
      flex: 2,
    },
    {
      field: "avatar",
      headerName: "Avatar",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Link to={Localhost + `/images/avatars/${params.row.avatar}`}>
                <Typography>
                  <Avatar
                    src={Localhost + `/images/avatars/${params.row.avatar}`}
                  />
                </Typography>
              </Link>
            </div>
          </>
        );
      },
    },
    {
      field: "services",
      headerName: "Services",
      flex: 3,
    },
    {
      field:'ratings',
      headerName:"Ratings",
      flex:3,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Stack spacing={1}>
                <Rating
                  name="half-rating"
                  defaultValue={params.row.ratings}
                  precision={0.5}
                />
              </Stack>
            </div>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => {
        return (
          <>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}>
              <button
                style={{
                  border: "none",
                  borderRadius: "3px",
                  backgroundColor: "#a80caf",
                  padding: "1px 10px",
                  marginRight: "3px",
                  height:'30px',
                  width:'40px',
                  display:'flex',
                  alignItems:'center'
                }}
                title="image update"
                onClick={() => avatarUpdateHandler(params.row.id)}
              >
                <Link>
                  <AddPhotoAlternateIcon style={{ color: "white" }} />
                </Link>
              </button>
              <button
                style={{
                  border: "none",
                  borderRadius: "3px",
                  backgroundColor: "#50a6f5",
                  padding: "0px 10px",
                  padding: "1px 10px",
                  marginRight: "3px",
                  height:'30px',
                  width:'40px',
                  display:'flex',
                  alignItems:'center'
                }}
                title="update"
              >
                <Link to={`/dashboard/worker/update/${params.row.id}`}>
                  <BorderColorIcon style={{ color: "white" }} />
                </Link>
              </button>
              <button
                style={{
                  backgroundColor: "#ef630f",
                  marginLeft: "3px",
                  border: "none",
                  borderRadius: "3px",
                  padding: "0px 10px",
                  cursor: "pointer",
                  padding: "1px 10px",
                  marginRight: "3px",
                  height:'30px',
                  width:'40px',
                  display:'flex',
                  alignItems:'center'
                }}
                title="delete"
                onClick={() => deleteHandler(params.row.id)}
              >
                <DeleteForeverIcon style={{ color: "white" }} />
              </button>
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getAllWorkerAction());
  }, [dispatch, error, toast]);

  let mockDataWorkers = [];

  if (allworkers?.length > 0) {
    allworkers.forEach((item) => {
      mockDataWorkers.push({
        id: item.user?._id,
        name: item.username,
        phone: item.phone_or_email,
        isfree: item.is_free,
        address: item.address,
        area: item.area,
        ratings:item.ratings,
        avatar: item?.avatar,
        services: [
          item?.services?.map(
            (i, index) => `(${index + 1})` + " " + i.service?.name
          ),
        ],
      });
    });
  }
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
          {/* worker delete modal */}
          {deleteModal && <WorkerDeleteModel workerData={singleworker} />}
          {shwoAvator && <AvatarUpdateModal id={workerId} />}
          <Box m="20px">
            <Header title="Workers" subtitle="List of Workers " />
            <Link
              to="/dashboard/worker/create"
              style={{ color: "white", width: "100%" }}
            >
              <Button
                style={{
                  backgroundColor: "#897406",
                  width: "100%",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                CREATE WORKER
              </Button>
            </Link>
            <Box
              m="40px 0 0 0"
              height="75vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${colors.grey[100]} !important`,
                },
              }}
            >
              {/* <Link style={{ textDecoration: "none" }} to="/worker/create">
                {" "}
                <Button
                  style={{
                    color: "white",
                    display: "flex",
                    alignItems: "flex-center",
                    justifyContent: "flex-center",
                    width: "100%",
                    backgroundColor: "gray",
                    padding: "3px",
                    fontWeight: "bold",
                  }}
                >
                  Create Worker
                </Button>{" "}
              </Link> */}

              <DataGrid
                rows={mockDataWorkers}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
              />
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Worker;
