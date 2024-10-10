import React, { useState } from "react";
import { motion} from "framer-motion";
import Banner2 from "./Banner2";
import Statics from "../statics/Static";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [keyword,setKeyWord] = useState();
  const navigate = useNavigate();

  const searchHandler=()=>{
     navigate(`/all/workers/?search=${keyword}`)    
  }
  return (
    <div>
      <section className="relative bg-cover bg-center bg-no-repeat md:h-[20%]">
        <div className="absolute inset-0 bg-gradient-to-r  from-gray-300 to-gray-500 flex w-full">
          <Banner2 />
        </div>
        <div className="relative mx-auto max-w-screen-xl px-4 md:py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-3xl lg:text-center mx-auto ltr:sm:text-left rtl:sm:text-right">
            <motion.div
              initial={{ opacity: 0.8, x: -200 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ duration: 1 }}
              className="md:w-[550px] w-full  rounded-md px-8 py-10 backdrop-blur-custom warper"
            >
              <form className="">
                <h1 className="uppercase text-center mb-10 text-3xl mt-16 md:text-5xl font-bold   text-gray-100 tracking-tight">
                  Find Your Human{" "}
                  <span className="text-[#60f6df] mt-2">Power</span>
                  {/* <span className="font-extrabold"></span> */}
                </h1>

                <div className="mb-8">
                  <input
                    type="text"
                    class="
                    shadow-sm lg:w-full bg-gray-50 border-2 border-gray-300   text-lg rounded-lg  hover:border-x-8  block w-full py-2 pl-3 duration-75 placeholder-gray-200 focus:outline-none  bg-transparent text-white"
                    required
                    placeholder="Search Workers"
                    onChange={(e)=>setKeyWord(e.target.value)}
                  />
                  {/* <MdLocationPin className="inline-block" /> */}
                </div>
                <div className="">
                  <button onClick={searchHandler} className="px-8 py-2.5 bg-white text-black shadow-md rounded-full text-md font-medium hover:bg-transparent hover:border border-white hover:text-white">
                    Search Workers
                  </button>
                </div>
                <div className="text-white text-center text-lg uppercase mt-8 ">
                  <a className="border-b-[1px]  border-b-white" href="#">
                    Find Out More about Man Power
                  </a>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
        <Statics/>
        
      </section>
    </div>
  );
};

export default Banner;
