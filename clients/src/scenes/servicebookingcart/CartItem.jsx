import React, { useEffect, useState } from "react";
import {
  finalStoreBookingCardAction,
  RemoveBookingCardAction,
} from "../../action/auth_user/ServicesBookingCartAction";
import { useDispatch } from "react-redux";
import { Localhost } from "../../action/host/HostConnection";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
function CartItem({ item, workersItems }) {
  const dispatch = useDispatch();
  const [timeSchedule, setTimeSchedule] = useState(null);
  const [price, setPrice] = useState(0);
  const [timeKey, setTimeKey] = useState("");
  const [startwork, setStartWork] = useState("");

  const handleRemoveService = (i, workers) => {
    dispatch(RemoveBookingCardAction(i, workers));
  };

  const TimeScheduleHandler = (value, item) => {
    setTimeSchedule(value);
    let new_item = 0;
    if (item.service_discount?.discount > 0) {
      if (item.service_discount?.discount_type == "Percentage Discount") {
        new_item =
          item.service_price -
          (item.service_price * item.service_discount?.discount) / 100;
      } else if (
        item.service_discount?.discount_type == "Taka Amount Discount"
      ) {
        new_item = item.service_price - item.service_discount?.discount;
      } else {
        new_item = item.service_price;
      }
    } else {
      new_item = item.service_price;
    }
    let value_item = new_item / 3;
    if (timeKey == "hours") {
      setPrice(value_item * value);
    }
    if (timeKey == "days") {
      setPrice(value_item * (value * 12));
    }
    if (timeKey == "weeks") {
      setPrice(value_item * (value * 84));
    }
    if (timeKey == "months") {
      setPrice(value_item * (value * 360));
    }
    if (timeKey == "years") {
      setPrice(value_item * (value * 4380));
    }
  };

  const TimeSetHandler = (value, item) => {
    setTimeKey(value);
    let new_item = 0;
    if (item.service_discount?.discount > 0) {
      if (item.service_discount?.discount_type == "Percentage Discount") {
        new_item =
          item.service_price -
          (item.service_price * item.service_discount?.discount) / 100;
      } else if (
        item.service_discount?.discount_type == "Taka Amount Discount"
      ) {
        new_item = item.service_price - item.service_discount?.discount;
      } else {
        new_item = item.service_price;
      }
    } else {
      new_item = item.service_price;
    }
    let value_item = new_item / 3;
    if (value == "hours") {
      setPrice(value_item * timeSchedule);
    }
    if (value == "days") {
      setPrice(value_item * (timeSchedule * 12));
    }
    if (value == "weeks") {
      setPrice(value_item * (timeSchedule * 84));
    }
    if (value == "months") {
      setPrice(value_item * (timeSchedule * 360));
    }
    if (value == "years") {
      setPrice(value_item * (timeSchedule * 4380));
    }
  };

  useEffect(() => {
    dispatch(
      finalStoreBookingCardAction(
        item._id,
        price,
        startwork,
        `${timeSchedule}${timeKey}`
      )
    );
  }, [dispatch, item._id, price, timeKey, startwork]);

  const TimeKeyList = ["hours", "days", "weeks", "months", "years"];
  return (
    <>
      <div key={item?._id}>
        <div className="mx-auto my-4  max-w-5xl mt-8 md:justify-center md:w-full  px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg  w-full">
            <div className="justify-around items-center md:min-w-[600px] md:mt-0 mt-24 mb-6  rounded-lg border flex flex-col  p-6 sm:flex sm:justify-start">
              <div className="flex justify-between w-[100%] py-2">
                <h2 className="text-lg font-bold px-3 py-2  text-gray-900">
                  <CleaningServicesIcon style={{ fontSize: "16px" }} />
                  {item.name.substring(0, 30)}...
                </h2>
                <button
                  title="delete"
                  onClick={() => handleRemoveService(item?._id, workersItems)}
                  className="text-lg  rounded-full bg-white hover:bg-gray-200  hover:text-red-400 font-bold px-3 text-gray-900"
                >
                  <DeleteOutlineIcon />
                </button>
              </div>
              <div className="md:flex justify-around w-full md:ml-9">
                <img
                  src={Localhost + `/images/services/${item.image}`}
                  alt="product-image"
                  className="w-full  rounded-md sm:w-40 md:h-24 md:w-36"
                />
                <div className="sm:ml-4 sm:flex sm:w-full items-center sm:justify-around">
                  <div className="mt-4 flex  justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex flex-col">
                      <select
                        required
                        name="hour"
                        id="hour"
                        onClick={(e) =>
                          TimeScheduleHandler(e.target.value, item)
                        }
                        className="w-72 font-serif bg-transparent text-orange-300 h-11 rounded-md border border-[#e0e0e0]  py-3 px-6 text-base font-medium  outline-none "
                      >
                        <option value="">Select Your Working Time</option>
                        {[...Array(100).keys()].splice(3, 100).map((i) => (
                          <option value={i}>{i}</option>
                        ))}
                      </select>
                      {timeSchedule !== null && (
                        <select
                          required
                          name="hour"
                          id="hour"
                          onClick={(e) => TimeSetHandler(e.target.value, item)}
                          className="w-72 h-11 bg-transparent text-orange-300 rounded-md border mt-2 border-[#e0e0e0]  py-3 px-6 text-base font-medium  outline-none "
                        >
                          <option value="">Select Your Time Key</option>
                          {TimeKeyList.map((i) => (
                            <option value={i}>{i}</option>
                          ))}
                        </select>
                      )}
                      {timeSchedule !== null && (
                        <div className="flex flex-col ">
                          {" "}
                          <label className="text-gray-50 m-1 italic font-bold">
                            <CalendarMonthIcon style={{ fontSize: "12px" }} />{" "}
                            select work start time
                          </label>
                          <input
                            required
                            name="hour"
                            id="hour"
                            type="datetime-local"
                            onChange={(e) => setStartWork(e.target.value)}
                            className="w-72 -mt-1 h-11 bg-transparent rounded-md border  border-[#e0e0e0]  py-3 px-6 text-base font-medium text-orange-300 outline-none "
                          />
                        </div>
                      )}
                      <div className="flex md:flex-none p-3 flex-col">
                        {price > 0 && (
                          <p className="text-sm  w-full mb-4 pt-3 text-red-400 font-bold price">
                            {price.toFixed(2)}TK
                          </p>
                        )}
                      </div>
                    </div>
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

export default CartItem;
