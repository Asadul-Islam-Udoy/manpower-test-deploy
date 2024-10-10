import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { StoreBookingCardAction } from "../../action/auth_user/ServicesBookingCartAction";
import { getCategoryBasicServiceAction } from "../../action/auth_user/ServicesAction";
import { Localhost } from "../../action/host/HostConnection";
import Lodder from "../../components/lodder/Lodder";
import AcUnitIcon from "@mui/icons-material/AcUnit";
const GetService = () => {
  const { error, lodding, servicesList } = useSelector(
    (state) => state.serviceListState
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
    dispatch(getCategoryBasicServiceAction());
  }, [dispatch]);

  return (
    <>
      {lodding && <Lodder />}
      <div
        style={{ backgroundColor: "#436da7" }}
        className="min-h-[300px] overflow-hidden"
      >
        <Header />
        <div className="flex items-center flex-col justify-center  w-[100%] mt-20 ">
          <div className=" md:w-[50%] w-[100%] mt-7 flex items-center flex-col py-3 justify-center ">
            <h1 className="md:text-5xl text-4xl text-center p-2 font-serif">
              Our Suite of Services Solutions
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
        <div className=" w-full p-4 bg-slate-300"></div>

        {servicesList[0]?.map((category) => (
          <div>
            <div className="p-1  flex items-center flex-col justify-center w-[100%] mt-3   ">
              <div className="md:w-[70%] w-[100%]  text-center">
                {" "}
                <h1
                  className="text-2xl font-serif border-b-[1px] rounded-full"
                  key={category}
                >
                  {category?.category_name}
                </h1>
              </div>
              <div className="md:w-[71%] p-3 w-[100%]  flex items-start flex-col justify-start">
                {category?.children[0].map((child) => (
                  <Link
                    to={`/category/basic/services/${child._id}/${child.category_name}`}
                    className="flex items-center  border-b-[1px] m-1 justify-center"
                  >
                    <AcUnitIcon className="text-blue-300" />
                    {child?.category_name}
                  </Link>
                ))}
              </div>
            </div>
            <div class="flex flex-wrap justify-center m-1 -mt-7 w-full  ">
              {category?.children[1]
                // .filter((service) => service.category === category)
                .map((service) => (
                  <div
                    class={`p-4 max-w-sm ${
                      cart.some((item) => item._id === service?.ele?._id)
                        ? "border p-0 mt-3 opacity-45 rounded-md shadow-lg"
                        : ""
                    }`}
                  >
                    {cart.some((item) => item._id === service?.ele?._id) && (
                      <div
                        style={{
                          color: "red",
                          cursor: "pointer",
                          backgroundColor: "white",
                          width: "10%",
                          borderBottomRightRadius: "20%",
                          textAlign: "center",
                        }}
                        onClick={() => deleteHandler(service.ele)}
                      >
                        <span>x</span>
                      </div>
                    )}
                    <div class="flex rounded-md h-full  bg-transparent p-8 flex-col hover:border-[0.3px] border-blue-400">
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
                          {service.ele.name}
                        </h2>
                      </div>
                      <div className="flex overflow-hidden rounded-md transition-all">
                        <img
                          src={
                            Localhost + `/images/services/${service.ele.image}`
                          }
                          alt="product image"
                          className="rounded-md hover:scale-110 transition-all ease-linear duration-1000"
                        />
                      </div>
                      <div class="flex flex-col justify-between flex-grow">
                        <p class="leading-relaxed text-base text-white dark:text-gray-300 mt-2">
                          {service.ele.description.substring(0, 90)}
                        </p>
                        <div className="flex w-[98%] py-4 justify-between">
                          <Link
                            to={`/service/details/${service.ele._id}`}
                            className="mt-3 p-2 justify-center hover:bg-transparent hover:border hover:text-white transition-all ease-linear w-[48%] bg-white  text-black dark:text-black  inline-flex items-center"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => handleBookService(service.ele)}
                            class="mt-3 p-2 w-[48%] justify-center bg-white hover:bg-transparent hover:border hover:text-white transition-all ease-linear text-black dark:text-black  inline-flex items-center"
                          >
                            {cart.some((item) => item._id === service.ele._id)
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
                  <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 ">
                    {cart.length}
                  </div>
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default GetService;
