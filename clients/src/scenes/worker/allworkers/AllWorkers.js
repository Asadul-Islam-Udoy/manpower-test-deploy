import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllWorkerAction } from "../../../action/auth_admin/AdminMaintainAction";
import Footer from "../../../components/footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Header from "../../../components/header/Header";
import { useNavigate } from "react-router-dom";
import { StoreBookingWorkerAction } from "../../../action/auth_user/ServicesBookingCartAction";
import { Localhost } from "../../../action/host/HostConnection";
import { useSearchParams, Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Lodder from "../../../components/lodder/Lodder";
function AllWorkers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [searchParams] = useSearchParams();
  const [workerId, setWorkerId] = useState("");
  const query = searchParams.get("search");

  const { lodding, error, allworkers } = useSelector(
    (state) => state.allworkerState
  );
  useEffect(() => {
    dispatch(getAllWorkerAction(query));
  }, [dispatch]);

  const deleteHandler = (serviceid) => {
    const filter = cart?.filter((i) => i._id !== serviceid._id);
    setCart(filter);
  };

  const handleWorkerSelect = (worker) => {
    toast.success(`${worker.username} Selected successfully !`, {
      position: "top-right",
    });
    setWorkerId(worker._id);
    if (!cart?.some((item) => item._id === worker._id)) {
      setCart((pre) => [...pre, worker]);
    }
  };

  const handleYourService = (id) => {
    dispatch(StoreBookingWorkerAction(cart));
    navigate(`/get/workers/services/${id}`);
  };

  return (
    <>
      <div
        style={{ backgroundColor: "#436da7" }}
        className="min-h-[300px] overflow-hidden"
      >
        {lodding && <Lodder />}
        <Header />
        <div className="flex items-center flex-col justify-center  w-[100%] mt-20 ">
          <div className=" md:w-[50%] py-3 w-[100%] mt-7 flex items-center flex-col justify-center ">
            <h1 className="md:text-5xl text-4xl text-center p-2 font-serif">
              Our Suite of Workers Solutions
            </h1>
            <p className=" block  md:w-[80%] w-[75%]  text-center">
              Our comprehensive family of brands address the complex workforce
              challenges organizations face today, from contingent and permanent
              staffing to talent management, outsourcing, and talent
              development. We deliver the solutions that drive your business
              forward.
            </p>
          </div>
        </div>
        <div className=" w-full p-4  bg-slate-300"></div>
        <div class="flex flex-wrap justify-center m-1  w-full  ">
       {allworkers?.length> 0?
       <>
                 {allworkers?.map((worker, index) => (
            <div
              class={`p-4 max-w-sm ${
                cart.some((item) => item._id === worker?._id)
                  ? "border p-0 mt-3 opacity-45 rounded-md shadow-lg"
                  : ""
              }`}
            >
              <div class="flex rounded-md h-full dark:bg-gray-800 bg-transparent p-8 flex-col hover:border-[0.3px] border-blue-400">
                {cart.some((item) => item._id === worker?._id) && (
                  <div
                    style={{
                      color: "red",
                      cursor: "pointer",
                      backgroundColor: "white",
                      width: "10%",
                      borderBottomRightRadius: "30%",
                      textAlign: "center",
                    }}
                    onClick={() => deleteHandler(worker)}
                  >
                    <span>x</span>
                  </div>
                )}
                <div className="p-1  flex  flex-col  w-[100%] mt-3   ">
                  <div className="md:w-[100%] p-3 w-[100%]  items-start ">
                    {worker?.services.slice(0, 4).map((i, indi) => (
                      <Link
                        to={`/service/details/${i?.service?._id}`}
                        className="items-center inline-block  border-b-[1px] m-1 justify-center"
                      >
                        <AcUnitIcon className="text-blue-300" />
                        {indi + 1}.{i.service.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex overflow-hidden rounded-full justify-center w-full transition-all">
                  {worker.avatar ? (
                    <img
                      src={Localhost + `/images/avatars/${worker.avatar}`}
                      className="rounded-full border h-48 w-48 hover:scale-110 transition-all ease-linear duration-1000"
                    />
                  ) : (
                    <img
                      src="https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg="
                      alt="user name"
                      title="user name"
                      width="300"
                      height="300"
                      className="max-w-full rounded-md"
                    />
                  )}
                </div>
                <div class="flex flex-col justify-between py-1 flex-grow">
                  <div class="flex items-center   min-w-[250px] mb-3">
                    <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <h2 class="text-white  dark:text-white text-lg font-medium">
                      {worker.username}
                    </h2>
                  </div>
                  <div className="w-full py-1 rounded-full flex justify-center border">
                    <Stack spacing={1}>
                      <Rating
                        name="half-rating"
                        defaultValue={5}
                        precision={0.2}
                      />
                    </Stack>
                  </div>
                  <div className="flex w-[98%] py-1 justify-between">
                    <Link
                      to={`/worker/Profile/${worker?.user?._id}`}
                      className="mt-3 p-2 justify-center hover:bg-transparent hover:border hover:text-white transition-all ease-linear w-[48%] bg-white  text-black dark:text-black  inline-flex items-center"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={() => handleWorkerSelect(worker)}
                      class="mt-3 p-2 w-[48%] justify-center bg-white hover:bg-transparent hover:border hover:text-white transition-all ease-linear text-black dark:text-black  inline-flex items-center"
                    >
                      {cart.some((item) => item._id === worker?._id)
                        ? "Worker Booked"
                        : "Select Worker"}
                    </button>
                  </div>
                  <div className="w-full"></div>
                </div>
              </div>
              <div>
                {cart.length > 0 ? (
                  <button
                    onClick={() => handleYourService(workerId)}
                    type="button"
                    class="fixed left-[49%] top-[100px]   md:top-[55%] md:left-[86%] inline-flex items-center px-5 py-3 text- font-serif text-center text-white bg-blue-600 border rounded-md hover:bg-blue-800 focus:outline-none"
                  >
                    <span class="sr-only">Notifications</span>
                    Add To Workers
                    <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                      {cart.length}
                    </div>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
       </>:
       <div className="p-48 bg-white-300 flex justify-center items-center flex-col">
            <h1 className="text-center text-lg md:text-5xl font-bold text-orange-400 pb-3">
              Yours Search Worker is Empty
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-300 p-2 pl-8 pr-8 hover:bg-red-200 rounded-sm"
            >
              <ArrowBackIcon style={{ fontSize: "12px" }} />
              back
            </button>
          </div>
       }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AllWorkers;
