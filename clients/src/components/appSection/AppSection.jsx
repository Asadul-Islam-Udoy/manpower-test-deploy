import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getHomeAppsAction } from "../../action/auth_admin/AdminMaintainAction";
import { Localhost } from "../../action/host/HostConnection";
import Lodder from "../lodder/Lodder";

const AppSection = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  let isInView = useInView(ref, { infinite: true });
  const {lodding,apps} = useSelector((state)=>state.homePagesState);
  
  useEffect(()=>{
   dispatch(getHomeAppsAction())
  },[dispatch])
  return (
   <>
   {lodding && <Lodder/>}
    <section ref={ref} className="lg:container mx-auto mb-8 text-gray-800 bg-gray-100 ">
      <div className=" max-w-screen-xl  flex pt-4 md:pt-16  flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.5 }}
          className="flex  overflow-hidden  items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
        >
          <img
            src={Localhost +`/images/apps/${apps[0]?.image}`}
            alt=""
            className="hover:scale-110 transition-all ease-linear duration-1000 object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 rounded-md"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: 0 }:{}}
          transition={{ duration: 1.5 }}
          className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left"
        >
          <h1 className="text-2xl font-bold">
           {apps[0]?.title}
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12">
           {apps[0]?.description}
          </p>
          <div> 
            <button className="px-4 py-2 border-2 text-xl font-bold rounded-md border-[#41B3A2] text-[#41B3A2] hover:bg-[#41B3A2] hover:text-white">
              Download App
            </button>
          </div>
        </motion.div>
      </div>
    </section>
   </>
  );
};

export default AppSection;