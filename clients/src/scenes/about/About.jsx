import React from "react";
import FAQ from "./Faq";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

const About = () => {
  return (
    <>
      <Header />
      <div  style={{ backgroundColor: "#436da7" }} className="md:pt-40 pt-24 bg-blue-200">
        <div className="max-w-screen-xl  mx-auto">
          <div className="text-center">
            <h1 className="text-center text-2xl md:text-5xl font-bold mb-16 border-b-4  inline-block">
              Why Choose Us
            </h1>
          </div>
          <div className="flex   px-6 md:px-20 justify-between  bg-hero  overflow-hidden">
            <div className="flex gap-5 md:gap-16 flex-col   md:flex-row ">
              <div className="w-full md:w-3/4 ">
                <p className="text-[#41B3A2] font-medium mb-4">Our plans</p>
                <h1 className="text-3xl font-bold mb-10">
                  Pick from our partnership plus <br /> service plans
                </h1>

                <ol class="">
                  <li class="flex space-x-2.5 rtl:space-x-reverse">
                    <span class="flex items-center justify-center w-10 h-10 border  rounded-full shrink-0 font-bold text-xl bg-[#41B3A2] text-white">
                      1
                    </span>
                    <span>
                      <h3 class="font-medium text-2xl leading-tight">
                        Enrichment Plan
                      </h3>
                      <p class="text-sm text-gray-400 pt-2 pb-4">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Obcaecati ipsam magni incidunt sapiente nemo
                        delectus voluptatem dolore placeat. Similique
                        dignissimos dolore itaque officia maiores voluptatum
                        veritatis odit nam corporis ullam, quibusdam adipisci
                        quae. Ab dolorem sint quasi delectus officia id?
                      </p>
                    </span>
                  </li>

                  <li class="flex space-x-2.5 rtl:space-x-reverse">
                    <span class="flex items-center justify-center w-10 h-10 border  rounded-full shrink-0 font-bold text-xl bg-[#41B3A2] text-white">
                      2
                    </span>
                    <span>
                      <h3 class="font-medium text-2xl leading-tight">
                        Corporate plan
                      </h3>
                      <p class="text-sm text-gray-400 pt-2 pb-4">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Obcaecati ipsam magni incidunt sapiente nemo
                        delectus voluptatem dolore placeat. Similique
                        dignissimos dolore itaque officia maiores voluptatum
                        veritatis odit nam corporis ullam, quibusdam adipisci
                        quae. Ab dolorem sint quasi delectus officia id?
                      </p>
                    </span>
                  </li>

                  <li class="flex space-x-2.5 rtl:space-x-reverse">
                    <span class="flex items-center justify-center w-10 h-10 border  rounded-full shrink-0 font-bold text-xl bg-[#41B3A2] text-white">
                      3
                    </span>
                    <span>
                      <h3 class="font-medium leading-tight text-2xl">
                        Full service plan
                      </h3>
                      <p class="text-sm text-gray-400 pt-2 pb-4">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Obcaecati ipsam magni incidunt sapiente nemo
                        delectus voluptatem dolore placeat. Similique
                        dignissimos dolore itaque officia maiores voluptatum
                        veritatis odit nam corporis ullam, quibusdam adipisci
                        quae. Ab dolorem sint quasi delectus officia id?
                      </p>
                    </span>
                  </li>
                </ol>
              </div>
              <div className="w-full md:w-1/2 items-center  flex ">
                <img
                  className="h-[600px] md:w-[550px] w-full"
                  src="/images/worker2.avif"
                />
              </div>
            </div>
          </div>
        </div>
        <FAQ />
      </div>
      <Footer />
    </>
  );
};

export default About;
