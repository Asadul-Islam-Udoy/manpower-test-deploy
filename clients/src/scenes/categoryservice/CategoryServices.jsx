import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StoreBookingCardAction } from "../../action/auth_user/ServicesBookingCartAction";
import { getCategoryServiceAction } from "../../action/auth_user/ServicesAction";
import { Localhost } from "../../action/host/HostConnection";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Lodder from "../../components/lodder/Lodder";

const CategoryService = () => {
  const { id } = useParams();
  const { name } = useParams();
  const { lodding, error, ServiceCategoryservicesList } = useSelector(
    (state) => state.serviceCategoryState
  );
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteHandler = (serviceid) => {
    const filter = cart?.filter((i) => i._id !== serviceid._id);
    setCart(filter);
  };

  const handleBookService = (serviceid) => {
    if (!cart?.some((item) => item._id === serviceid._id)) {
      setCart((pre) => [...pre, serviceid]);
    }
  };
  const handleYourService = () => {
    dispatch(StoreBookingCardAction(cart));
    navigate("/worker/list");
  };

  useEffect(() => {
    dispatch(getCategoryServiceAction(id));
  }, [dispatch, id]);

  return (
    <>
      {lodding && <Lodder />}
      <Header />
      <div
        style={{ backgroundColor: "#436da7" }}
        className="min-h-[300px] overflow-hidden"
      >
        {ServiceCategoryservicesList?.length > 0 ? (
          <div>
            {ServiceCategoryservicesList !== undefined ? (
              <>
                <div className="flex items-center flex-col justify-center  w-[100%] mt-20 ">
                  <div className=" md:w-[50%] w-[100%] mt-7 flex items-center flex-col py-3 justify-center ">
                    <h1 className="md:text-5xl text-4xl text-center p-2 font-serif">
                      Our Suite of Services Solutions
                    </h1>
                    <p className=" block  md:w-[80%] w-[75%]  text-center">
                      Our comprehensive family of brands address the complex
                      workforce challenges organizations face today, from
                      contingent and permanent staffing to talent management,
                      outsourcing, and talent development. We deliver the
                      solutions that drive your business forward.
                    </p>
                  </div>
                </div>
                <div className=" w-full p-4 bg-slate-300"></div>
                <div className="p-1  flex items-center flex-col justify-center w-[100%] mt-3   ">
              <div className="md:w-[70%] w-[100%]  text-center">
                {" "}
                <h1
                  className="text-2xl font-serif border-b-[1px] rounded-full"
                  key={name}
                >
                  {name}
                </h1>
              </div>
              </div>
                <div>
                  <div class="flex flex-wrap justify-center m-1  w-full  ">
                    {ServiceCategoryservicesList.map((service) => (
                      <div
                        class={`p-4 max-w-sm ${
                          cart.some((item) => item._id === service?._id)
                            ? "border p-0 mt-3 opacity-45 rounded-md shadow-lg"
                            : ""
                        }`}
                      >
                        {cart.some((item) => item._id === service?._id) && (
                          <div
                            style={{
                              color: "red",
                              cursor: "pointer",
                              backgroundColor: "white",
                              width: "10%",
                              borderBottomRightRadius: "20%",
                              textAlign: "center",
                            }}
                            onClick={() => deleteHandler(service)}
                          >
                            <span>x</span>
                          </div>
                        )}
                        <div class="flex rounded-md h-full dark:bg-gray-800 bg-transparent p-8 flex-col hover:border-[0.3px] border-blue-400">
                          <div class="flex items-center mb-3">
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
                            <h2 class="text-white dark:text-white text-lg font-medium">
                              {service.name}
                            </h2>
                          </div>
                          <div className="flex overflow-hidden rounded-md transition-all">
                            <img
                              src={
                                Localhost + `/images/services/${service.image}`
                              }
                              alt="product image"
                              className="rounded-md hover:scale-110 transition-all ease-linear duration-1000"
                            />
                          </div>
                          <div class="flex flex-col justify-between flex-grow">
                            <p class="leading-relaxed text-base text-white dark:text-gray-300 mt-2">
                              {service.description.substring(0, 90)}
                            </p>
                            <div className="flex w-[98%] py-4 justify-between">
                              <Link
                                to={`/service/details/${service?._id}`}
                                className="mt-3 p-2 justify-center hover:bg-transparent hover:border hover:text-white transition-all ease-linear w-[48%] bg-white  text-black dark:text-black  inline-flex items-center"
                              >
                                View Details
                              </Link>
                              <button
                                onClick={() => handleBookService(service)}
                                class="mt-3 p-2 w-[48%] justify-center bg-white hover:bg-transparent hover:border hover:text-white transition-all ease-linear text-black dark:text-black  inline-flex items-center"
                              >
                                {cart.some((item) => item._id === service?._id)
                                  ? "Service Booked"
                                  : "Book Service"}
                              </button>
                            </div>
                            <div className="w-full"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    {cart.length > 0 ? (
                      <button
                        onClick={handleYourService}
                        type="button"
                        class="fixed left-[49%] top-[100px]   md:top-[55%] md:left-[86%] inline-flex items-center px-5 py-3 text- font-serif text-center text-white bg-blue-600 border rounded-md hover:bg-blue-800 focus:outline-none"
                      >
                        <span class="sr-only">Notifications</span>
                        Add To Service
                        <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                          {cart.length}
                        </div>
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {/* <div className=" mx-auto max-sm:-mt-16 md:pt-32 pb-12 md:pb-0 pt-40 min-h-[88vh]  bg-blue-200">
                  <div>
                    {/* <h1 className="text-center text-blue-400 text-4xl mb-6">
            All Services
          </h1> */}
                {/* </div>
                  <div className="max-w-screen-xl mx-auto">
                    <h2
                      className="text-3xl text-orange-400 font-bold md:mb-6 py-5 text-center md:text-start"
                      key={name}
                    >
                      {name}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-5">
                      {ServiceCategoryservicesList.map((service) => (
                        <div
                          key={service?._id}
                          className={`group relative md:mb-12 md:mt-3 flex w-full max-w-[250px]  flex-col overflow-hidden border border-gray-100 shadow-md rounded-md ${
                            cart.some((item) => item._id === service?._id)
                              ? "bg-gray-300 opacity-45"
                              : " bg-white "
                          }`}
                        >
                          {cart.some((item) => item._id === service?._id) && (
                            <div
                              style={{
                                color: "red",
                                cursor: "pointer",
                                backgroundColor: "white",
                                width: "10%",
                                borderBottomRightRadius: "20%",
                                textAlign: "center",
                              }}
                              onClick={() => deleteHandler(service)}
                            >
                              <span>x</span>
                            </div>
                          )}

                          <a
                            className="relative flex h-40 overflow-hidden"
                            href="#"
                          >
                            <img
                              className="absolute top-4 right-8 w-3/4 rounded-md"
                              src={
                                Localhost + `/images/services/${service.image}`
                              }
                              alt="product image"
                            />
                          </a>
                          <div className="mt-2 px-5 pb-5">
                            <a href="#">
                              <h5 className="text-xl mb-4 tracking-tight text-slate-900">
                                {service.name.substring(0,20)}...
                              </h5>
                            </a>
                            <div className="flex md:justify-between">
                              <button
                                onClick={() => handleBookService(service)}
                                className={`flex items-center justify-center px-2 py-1 text-sm text-white transition  rounded-md ${
                                  cart.some((item) => item._id === service._id)
                                    ? "bg-gray-500 cursor-not-allowed"
                                    : " bg-[#41B3A2] hover:bg-gray-700"
                                } `}
                              >
                                {cart.some((item) => item._id === service._id)
                                  ? "Service Booked"
                                  : "Book Service"}
                              </button>
                              <Link to={`/service/details/${service._id}`}>
                                <button className="flex items-center justify-center bg-[#41B3A2] px-2 py-1 text-sm text-white transition hover:bg-gray-700 rounded-md ml-4 md:ml-0">
                                  View Details
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {cart.length > 0 ? (
                  <button
                    onClick={handleYourService}
                    type="button"
                    class="absolute md:fixed left-[49%] top-[100px]   md:top-[55%] md:left-[86%] inline-flex items-center px-5 py-5 text-xl font-medium text-center text-white bg-[#41B3A2]  rounded-lg hover:bg-blue-800 focus:outline-none"
                  >
                    <span class="sr-only">Notifications</span>
                    Your Service
                    <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                      {cart.length}
                    </div>
                  </button>
                ) : (
                  ""
                )}  */}
              </>
            ) : (
              <div>
                <h1 className="text-center text-5xl font-bold text-red-700 pb-64">
                  Empty
                </h1>
              </div>
            )}
          </div>
        ) : (
          <div className="p-48 bg-white-300 flex justify-center items-center flex-col">
            <h1 className="text-center text-5xl font-bold text-red-700 pb-3">
              Empty
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-300 p-2 pl-8 pr-8 hover:bg-red-200 rounded-sm"
            >
              <ArrowBackIcon style={{ fontSize: "12px" }} />
              back
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryService;
