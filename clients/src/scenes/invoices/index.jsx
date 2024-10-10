import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/dashboard/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllPaymentAction } from "../../action/auth_admin/AdminMaintainAction";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const dispatch = useDispatch();
  const { lodding, error, allpayments } = useSelector(
    (state) => state.paymentState
  );

  useEffect(() => {
    dispatch(getAllPaymentAction());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "userid",
      headerName: "User Id",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "tran_id",
      headerName: "Tran ID",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      flex: 1,
    },
    {
      field: "before_payment_id",
      headerName: "Before Payment Id",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];

  let mockDataPayment = [];

  if (allpayments?.length > 0) {
    allpayments.forEach((item) => {
      mockDataPayment.push({
        id: item._id,
        userid: item.user?._id,
        phone: item.user?.phone,
        email: item.user?.email,
        cost: item.amount,
        date: item.createdAt,
        tran_id: item.tran_id,
        paymentStatus: item.paidStatus,
        before_payment_id: item?.before_payment_id?._id,
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
          <Box m="20px">
            <Header title="INVOICES" subtitle="List of Invoice Balances" />
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
              }}
            >
              <DataGrid
                checkboxSelection
                rows={mockDataPayment}
                columns={columns}
              />
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Invoices;
