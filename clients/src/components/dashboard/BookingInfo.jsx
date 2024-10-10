import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../scenes/global/Sidebar";
import Topbar from "../../scenes/global/Topbar";
import "./BookingInfo.css";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleBookingAction } from "../../action/auth_admin/BookingAction";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import Rating from "@mui/material/Rating";
function BookingInfo() {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isSidebar, setIsSidebar] = useState(true);

  const dispatch = useDispatch();

  const { lodding, error, singlebooking } = useSelector(
    (state) => state.singleBookingState
  );
  const [rating, setRating] = useState(singlebooking?.ratings);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(GetSingleBookingAction(id));
    setRating(singlebooking?.ratings);
  }, [id, error, toast, singlebooking?.ratings]);
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
          <div className="booking__information__container">
            <div className="booking__info__box">
              <h3>Booking Information</h3>
              <div className="booking__info__container">
                <div>
                  <div>
                    <p
                      style={{
                        fontWeight: "bold",
                        borderBottom: "1px solid black",
                      }}
                    >
                      Address
                    </p>
                    <p>{singlebooking?.address}</p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: "bold",
                        borderBottom: "1px solid black",
                      }}
                    >
                      Area
                    </p>
                    <p>{singlebooking?.area}</p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: "bold",
                        borderBottom: "1px solid black",
                      }}
                    >
                      Phone
                    </p>
                    <p>{singlebooking?.phone}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <li>Payment Status</li>
                    <span
                      style={{
                        color:
                          singlebooking?.paymentid?.paidStatus == true
                            ? "green"
                            : "red",
                        margin: "20px",
                        padding: "2px",
                      }}
                    >
                      {singlebooking?.paymentid?.paidStatus == true
                        ? "Success"
                        : "Fails"}
                    </span>
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: "bold",
                        borderBottom: "1px solid black",
                      }}
                    >
                      Status
                    </p>
                    <span
                      style={{
                        color:
                          singlebooking?.is_payment_status == "Cancelled"
                            ? "red"
                            : singlebooking?.is_payment_status == "Completed"
                            ? "#10a1de"
                            : "gold",
                        fontWeight: "bold",
                      }}
                    >
                      {singlebooking?.is_payment_status}
                    </span>
                  </div>

                  <div>
                    <p
                      style={{
                        fontWeight: "bold",
                        borderBottom: "1px solid black",
                      }}
                    >
                      Payment Id
                    </p>
                    <span>{singlebooking?.paymentid?._id}</span>
                  </div>
                </div>
                <div>
                  {singlebooking?.total_paid ? (
                    <div>
                      <p
                        style={{
                          fontWeight: "bold",
                          borderBottom: "1px solid black",
                        }}
                      >
                        Paid Amount
                      </p>
                      <span className="text-orange-500 text-xl">
                        {singlebooking?.total_paid}-tk
                      </span>
                    </div>
                  ) : (
                    <div>
                      <p
                        style={{
                          fontWeight: "bold",
                          borderBottom: "1px solid black",
                        }}
                      >
                        Advance Amount
                      </p>
                      <span>{singlebooking?.advance_amount}tk</span>
                    </div>
                  )}
                  <div>
                    <p
                      style={{
                        fontWeight: "bold",
                        borderBottom: "1px solid black",
                      }}
                    >
                      Total Amount
                    </p>
                    <span>{singlebooking?.total_amount}tk</span>
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: "bold",
                        borderBottom: "1px solid black",
                      }}
                    >
                      We Will Get Amount
                    </p>
                    <span>{singlebooking?.we_will_get_payment}tk</span>
                  </div>
                </div>
                <div className="w-full">
                  <div>
                    <p
                      style={{
                        fontWeight: "bold",
                        borderBottom: "1px solid black",
                      }}
                    >
                      Service Worker Profile
                    </p>
                    {singlebooking?.workers?.map((item) => (
                      <Link
                        title="worker info"
                        className="flex flex-col"
                        style={{ color: "black", margin: "3px" }}
                        to={`/worker/profile/${item.user._id}`}
                      >
                        <p
                          style={{ borderBottom: "1px solid green" }}
                          className=""
                        >
                          {item.user?.phone || item.user?.email}
                        </p>
                      </Link>
                    ))}
                  </div>
                  <div>
                    <li>Service Booking Client</li>
                    <Link
                      title="worker info"
                      style={{ color: "black", margin: "3px" }}
                      to={`/user/profile/${singlebooking?.user?._id}`}
                    >
                      {singlebooking?.user?.phone || singlebooking?.user?.email}
                    </Link>
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: "bold",
                        borderBottom: "1px solid black",
                      }}
                    >
                      Others Info
                    </p>
                    <p>{singlebooking?.others_info}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <p
                      style={{
                        fontWeight: "bold",
                        borderBottom: "1px solid black",
                      }}
                    >
                      Service
                    </p>
                    {singlebooking?.services?.map((item) => (
                      <>
                        <span className="text-gray-600 w-full">
                          {item.service?.name}
                        </span>
                        <div className="m-2">
                          <p>service price :{item.service.service_price}</p>
                          <p>service total price :{item.price} tk</p>
                          {item.service.service_discount.discount_type ==
                          "Taka Amount Discount" ? (
                            <p>
                              service discount :
                              {item.service.service_discount.discount} tk
                            </p>
                          ) : (
                            <p>
                              service discount :
                              {item.service.service_discount.discount}%
                            </p>
                          )}
                          <p>worker start time :{item.work_start_date}</p>
                          <p>time schedule :{item.time_schedule}</p>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingInfo;
