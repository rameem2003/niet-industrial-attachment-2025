import React from "react";
import Container from "./common/Container";
import footer from "../assets/footer.png";

const Footer = () => {
  return (
    <footer>
      <section className="bg-black py-10">
        <Container>
          <div className="h-[2px] bg-white w-full"></div>

          <div className=" mt-8 flex items-start flex-wrap gap-[80px] lg:gap-0 justify-between">
            <div className="w-full lg:w-6/12">
              <img src={footer} alt="footer" />

              <p className="font-normal text-base text-white w-full lg:w-[280px] mt-2">
                Your natural candle made for your home and for your wellness.
              </p>
            </div>

            <div className="w-full lg:w-6/12">
              <div className="flex items-center flex-wrap justify-between">
                <div className=" w-6/12 md:w-4/12">
                  <h4 className=" font-medium text-base text-green-400 mb-6">
                    Discovery
                  </h4>

                  <ul>
                    <li className="font-medium text-base text-white mb-5">
                      New season
                    </li>
                    <li className="font-medium text-base text-white mb-5">
                      New season
                    </li>
                    <li className="font-medium text-base text-white mb-5">
                      New season
                    </li>
                  </ul>
                </div>
                <div className=" w-6/12 md:w-4/12">
                  <h4 className=" font-medium text-base text-green-400 mb-6">
                    Discovery
                  </h4>

                  <ul>
                    <li className="font-medium text-base text-white mb-5">
                      New season
                    </li>
                    <li className="font-medium text-base text-white mb-5">
                      New season
                    </li>
                    <li className="font-medium text-base text-white mb-5">
                      New season
                    </li>
                  </ul>
                </div>
                <div className=" w-12/12 md:w-4/12">
                  <h4 className=" font-medium text-base text-green-400 mb-6">
                    Discovery
                  </h4>

                  <ul>
                    <li className="font-medium text-base text-white mb-5">
                      New season
                    </li>
                    <li className="font-medium text-base text-white mb-5">
                      New season
                    </li>
                    <li className="font-medium text-base text-white mb-5">
                      New season
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className=" bg-gray-200 py-7">
        <Container>
          <div className=" flex items-center justify-between">
            <span className="font-normal text-sm text-gray-500">
              ©Candleaf All Rights Reserved.
            </span>
            <span className="font-normal text-sm text-gray-500">
              Design By Rameem
            </span>
          </div>
        </Container>
      </section>
    </footer>
  );
};

export default Footer;
