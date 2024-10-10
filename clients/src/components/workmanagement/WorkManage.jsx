import React from "react";
import { FaCheck } from "react-icons/fa";

const WorkMangement = () => {
  return (
    <div  className="max-w-screen-xl   mx-auto py-24">
      <div>
        <h2 className="text-4xl font-normal font-sans text-[#3b3d40]">
          Workforce Management and SMART Human Resource solutions
        </h2>
        <p className='text-blue-300 my-8' >
          With MPBDs Workforce, have all your employee information at your
          fingertips. Also, have your employees update their own respective
          information on the Workforce platform.
          <br />
          Here is a comprehensive list of key HRIS terms and definitions to aid
          in your decision-making process.
        </p>
      </div>
      <div className="flex   px-6 md:px-20 justify-between  bg-hero  overflow-hidden">
        <div className="flex gap-5 md:gap-96 flex-col   md:flex-row ">
          <div className="w-full md:w-1/2 ">
            <ul>
              <li className="flex items-center gap-2 text-[#3b3d40] text-xl mb-2">
                <FaCheck />
                Employee personal information
              </li>
              <li className="flex items-center gap-2 text-[#3b3d40] text-xl mb-2">
                <FaCheck />
                Current & previous job assignments
              </li>
              <li className="flex items-center gap-2 text-[#3b3d40] text-xl mb-2">
                <FaCheck />
                Payment information
              </li>
              <li className="flex items-center gap-2 text-[#3b3d40] text-xl mb-2">
                <FaCheck />
                Work authorization
              </li>
              <li className="flex items-center gap-2 text-[#3b3d40] text-xl mb-2">
                <FaCheck />
                Document management
              </li>
              <li className="flex items-center gap-2 text-[#3b3d40] text-xl mb-2">
                <FaCheck />
                Timesheets for all active jobs
              </li>
              <li className="flex items-center gap-2 text-[#3b3d40] text-xl mb-2">
                <FaCheck />
                Configurable approval workflows
              </li>
              <li className="flex items-center gap-2 text-[#3b3d40] text-xl mb-2">
                <FaCheck />
                Monthly, weekly and daily time logs
              </li>
              <li className="flex items-center gap-2 text-[#3b3d40] text-xl mb-2">
                <FaCheck />
                Detailed attendance and time-sheet data
              </li>
              <li className="flex items-center gap-2 text-[#3b3d40] text-xl mb-2">
                <FaCheck />
                Integrated with a feature to generate invoices
              </li>
              <li className="flex items-center gap-2 text-[#3b3d40] text-xl mb-2">
                <FaCheck />
                LCA management
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2  flex justify-center md:justify-end">
            <img className="drop-shadow-xl rounded-md  h-[350px] md:w-[543px]" src="https://cdn.prod.website-files.com/6209ea9aee1f965d7fce7c19/649a89c89a17e113b6f49621_empployee%20mngment%20app%20(1).jpg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkMangement;