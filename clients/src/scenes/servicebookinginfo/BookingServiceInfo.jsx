import { React, useEffect, useState } from "react";
import { FaHandPointRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/header/Header";
import EngineeringIcon from "@mui/icons-material/Engineering";
import Footer from "../../components/footer/Footer";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import axios from "axios";
import { Localhost } from "../../action/host/HostConnection";

const BookingServiceInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clientInfo } = useSelector((state) => state.userLoginState);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { cartItems, addressInfo, workersItems } = useSelector(
    (state) => state.cartState
  );
  const [amount, setAmount] = useState(99);
  const handleProceed = async () => {
    setButtonDisabled(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: clientInfo?.token?.accesstoken,
        },
      };
      const { data } = await axios.post(
        Localhost + "/api/payments/ammerpay/create/",
        { cartItems, addressInfo, workersItems, amount },
        config
      );
      if (data.url) {
        window.location.replace(data.url);
      }
    } catch (error) {
      setButtonDisabled(false);
      toast.error(error.reponse.data.message);
    }
  };

  function totalPriceHandler(cartItems) {
    let sum = 0;
    cartItems?.forEach((element) => {
      sum += element.totalPrice;
    });
    return sum;
  }

  function totalDiscountHandler(cartItems) {
    let discount = 0;
    cartItems?.forEach((element) => {
      if (element?.service_discount?.discount_type == "Percentage Discount") {
        discount +=
          (element.service_price * element.service_discount?.discount) / 100;
      } else if (
        element?.service_discount?.discount_type == "Taka Amount Discount"
      ) {
        discount += element.service_discount?.discount;
      } else {
        discount += element.service_discount.discount;
      }
    });
    return discount;
  }

  const date_convart = (time) => {
    return new Date(time).toLocaleDateString();
  };
  const time_convart = (time) => {
    return new Date(time).toLocaleTimeString();
  };

  useEffect(() => {
    if (cartItems.length !== workersItems.length) {
      navigate("/all/services");
    }
  });
  return (
    <>
      <Header />
      <div
        style={{ backgroundColor: "#436da7" }}
        className="md:p-12  md:pt-24 pt-28 p-4 pb-14"
      >
        <div className="my-7 w-full flex flex-col justify-center -mt-7 md:mt-0  text-center items-center font-serif ">
          <h1 className="text-3xl md:text-5xl   p-2 font-serif w-[100%] text-center ">
            This is Your Booking  Information
          </h1>
          <p className="md:w-[50%] w-[90%] ">
            Our comprehensive family of brands address the complex workforce
            challenges organizations face today, from contingent and permanent
            staffing to talent management, outsourcing, and talent development.
            We deliver the solutions that drive your business forward.
          </p>
        </div>
        {cartItems?.length > 0 ? (
          <div className="bg-transparent border p-6 rounded-lg shadow-md mx-auto max-w-5xl">
            <h2 className="text-2xl text-gray-300 font-semibold mb-6 text-center">
              Selected Information
            </h2>
            <div className="flex">
              <div>
                <span className="text-orange-300">Services</span>

                {cartItems?.map((item, index) => (
                  <>
                    {/* {workersItems.map((w) => ( */}
                    <div key={index} className="mb-4">
                      <h3 className="font-bold text-gray-400 flex flex-col  gap-2">
                        <div className="flex items-center">
                          {" "}
                          <FaHandPointRight />
                          {item.name}
                        </div>
                        {/* <d className='flex items-center'>
                      <EngineeringIcon/>
                      {w.username}
                    </d> */}
                      </h3>
                      <p className="text-gray-400">
                        time schedule : {item.timeSchedule}
                      </p>
                      <p className="text-gray-400">
                        start work time :{" "}
                        <span>{date_convart(item.startWork)}</span> -{" "}
                        <span>{time_convart(item.startWork)}</span>
                      </p>
                      {item.service_discount?.discount_type ==
                      "Percentage Discount" ? (
                        <span className="text-gray-400">
                          discount: {item.service_discount?.discount} %
                        </span>
                      ) : (
                        <span className="text-gray-400">
                          discount: {item.service_discount?.discount} tk
                        </span>
                      )}
                    </div>
                    {/* ))} */}
                  </>
                ))}
              </div>
              <div className="ml-4">
                <span className="text-orange-300">Workers</span>
                {workersItems.map((w, index) => (
                  <>
                    <div key={index} className="mb-4">
                      <h3 className="font-bold text-gray-400 flex flex-col  gap-2">
                        <div className="flex items-center">
                          <EngineeringIcon />
                          {w.username}
                        </div>
                      </h3>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <p className="mb-2 text-sky-500">
              <strong>Total Service Price: </strong>{" "}
              {totalPriceHandler(cartItems) + totalDiscountHandler(cartItems)}{" "}
              TK
            </p>
            <p className="mb-2 text-sky-500">
              <strong>Total Service Discount Price: </strong>{" "}
              {totalDiscountHandler(cartItems)} TK
            </p>
            <p className="mb-2  p-2  text-sky-500 w-full flex justify-center">
              <strong>Your Payment Price : </strong>{" "}
              <b className="ml-2"> {totalPriceHandler(cartItems)}</b> tk
            </p>
            <div className="w-full flex justify-center items-center">
              <p className="mb-2  shadow-lg text-orange-300 p-3 rounded-sm w-96 flex justify-center items-center">
                <strong>you have to advance payment : </strong>{" "}
                <b className="ml-2"> 99 </b> tk
              </p>
            </div>
            <h2 className="text-2xl font-semibold mt-10 text-gray-300 mb-6 text-center">
              Your Information
            </h2>
            <p className="mb-2 text-gray-400">
              <strong>Full Name:</strong> {addressInfo?.name}
            </p>
            <p className="mb-2 text-gray-400">
              <strong>Phone Number:</strong> {addressInfo?.phone}
            </p>
            <p className="mb-2 text-gray-400">
              {/* <strong>Date:</strong> {addressInfo?.date} */}
            </p>
            <p className="mb-2 text-gray-400">
              <strong>Address:</strong>{" "}
              {`${addressInfo?.area}, ${addressInfo?.city}, ${addressInfo?.state}, ${addressInfo?.address}`}
            </p>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => navigate(-1)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Edit
              </button>

              <button
                disabled={buttonDisabled}
                onClick={handleProceed}
                style={{ backgroundColor: buttonDisabled ? "gray" : "green" }}
                className="bg-green-500 text-white py-2 px-4 rounded-lg"
              >
                <b>99tk</b>Proceed
              </button>
            </div>
          </div>
        ) : (
          <div className="p-48 w-screen bg-white-300 flex justify-center items-center flex-col">
            <h1 className="text-center text-5xl font-bold text-red-700 pb-3">
              Empty Details
            </h1>
            <button
              onClick={() => navigate("/all/services")}
              className="bg-gray-300 p-2 pl-8 pr-8 hover:bg-red-200 rounded-sm"
            >
              <TravelExploreIcon style={{ fontSize: "12px" }} />
              All Services
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BookingServiceInfo;
