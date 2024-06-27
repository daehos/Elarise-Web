import { useEffect } from "react";
import Nav from "../Components/Nav";
import { Link } from "react-router-dom";
import { scroller } from "react-scroll";
import authService from "../Service/authService";

const HomePage = () => {
  useEffect(() => {
    if (authService.isUser()) {
      scroller.scrollTo("Feature", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: +500, // Adjust this value if your header has a fixed height
      });
    }
  }, []);
  return (
    <>
      <div>
        <Nav />
        {/* hero section start */}
        <section id="home" className="flex flex-col  md:flex-row bg-mypink ">
          <div className="w-full lg:ml-10 lg:w-1/2 flex justify-end items-center p-10">
            <div className="flex flex-col items-center lg:items-start text-2xl text-mytext drop-shadow-2xl md:text-2xl lg:text-4xl">
              <img className="mb-4 " src="./hero greeting.png" alt="" />
              <h1 className="mb-4 font-bold">
                here to help you to improve your english skill
              </h1>
              <h1 className="font-semibold pb-8 ">
                in dynamic and interactive way!
              </h1>
              <Link to="/login">
                <button className="flex items-center text-xl font-semibold bg-[#FF8000] rounded-3xl py-1 px-8  border-2 border-black hover:scale-125  transition duration-300 ease-in-out ">
                  Get Started!
                  <img
                    src="./button.png"
                    alt=""
                    className="ml-2 mt-2 h-10 w-10"
                  />
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full   lg:w-1/2  flex justify-center ">
            <img
              src="./astro.png"
              alt="hello"
              className=" lg:scale-110  mb-10"
            />
          </div>
        </section>
        {/* hero section End */}
        {/* <svg
          className="absolute z-0 bottom-0 w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#F7CB46"
            d="M0,160L26.7,176C53.3,192,107,224,160,229.3C213.3,235,267,213,320,181.3C373.3,149,427,107,480,117.3C533.3,128,587,192,640,213.3C693.3,235,747,213,800,197.3C853.3,181,907,171,960,186.7C1013.3,203,1067,245,1120,224C1173.3,203,1227,117,1280,90.7C1333.3,64,1387,96,1413,112L1440,128L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
          ></path>
          <path
            d="M0,160L26.7,176C53.3,192,107,224,160,229.3C213.3,235,267,213,320,181.3C373.3,149,427,107,480,117.3C533.3,128,587,192,640,213.3C693.3,235,747,213,800,197.3C853.3,181,907,171,960,186.7C1013.3,203,1067,245,1120,224C1173.3,203,1227,117,1280,90.7C1333.3,64,1387,96,1413,112L1440,128"
            stroke="#000000"
            stroke-width="5"
            fill="none"
          ></path>
        </svg> */}

        {/* About section start */}
        <section
          id="About"
          className=" relative z-10 font-nunito md:flex-row   bg-myyellow w-full min-h-screen"
        >
          <div className="flex justify-between  w-full   h-40 ">
            <img
              src="./nametag (1).png"
              alt=""
              className=" w-2/5  md:w-1/3 lg:w-1/5 h-fit mt-6 md:mt-5 lg:mt-5 "
            />
            <img
              src="./clean.png"
              alt=""
              className=" scale-75 mt-10 lg:w-1/6 lg:h-fit lg:mr-0 lg:mt-0 -rotate-45  "
            />
          </div>

          <div className=" relative  p-10 max-w-6xl mx-auto ">
            <p className="flex  justify-end py-2 font-extrabold italic text-2xl drop-shadow-xl md:text-3xl lg:text-6xl">
              Hello There, I Am Elara!
            </p>

            <div className="mx-5 bg-white absolute z-10 py-5 lg:py-0 left-0 right-0 w-[90%]   rounded-3xl  text-center border-black border-t-2 border-l-2 border-r-[7px] border-b-[7px] ">
              <p className=" mx-7  text-sm md:text-lg lg:my-6  drop-shadow-md lg:text-3xl text-justify">
                Elara stands for
                <span className="font-semibold">
                  {" "}
                  “English Learning Artificial Responsive Assistant”
                </span>{" "}
                is also the name of a moon of Jupiter. hoping this app will help
                users to reach new heights in their
                <span className="font-semibold"> language skill</span>, similar
                to how Elara orbits Jupiter at
                <span className="font-semibold"> higher level. </span>
              </p>
            </div>
            <div className=" lg:mx-5 bg-mypink absolute z-5  w-[90%]  top-28 md:top-32 h-36 md:h-32 lg:top-36 lg:h-52   py-3 text-base rounded-3xl   border-black border-t-2 border-l-2 border-r-[7px] border-b-[7px] "></div>

            <img
              src="./final_purpose.png"
              alt=""
              className="absolute scale-95 right-0 mt-36 lg:mt-52 mx-auto"
            />
          </div>
          <div className="flex justify-between  w-full   h-40 ">
            <img
              src="./rocket (1).png"
              alt=""
              className=" w-2/5  lg:rotate-45 md:w-1/3 lg:w-1/5 h-fit mt-52 md:mt-60 lg:mt-52 "
            />
            <img
              src="./clean.png"
              alt=""
              className="  scale-75 w-1/6 mt-52 h-fit lg:mr-0 lg:mt-40 rotate-45 relative z-0  "
            />
          </div>
        </section>
        {/* About section end */}

        {/* download now Section */}
        <section
          id="Download"
          className=" flex flex-col md:flex-row   bg-myyellow w-full min-h-screen"
        >
          <div className="w-full lg:mt-36 lg:ml-10 flex justify-start  ">
            <div className="flex w-full  flex-col items-center  text-4xl text-mytext font-bold drop-shadow-lg md:text-4xl lg:text-6xl">
              <h1 className="mb-4 ">Unlock Your English Full</h1>
              <h1 className=" mb-4 ">Potential On The Go</h1>
              <h1 className=" mb-12  text-6xl italic ">
                With{" "}
                <span className="absolute z-10 italic text-7xl lg:text-8xl">
                  Elarise!
                </span>{" "}
                <span className="  text-7xl lg:text-8xl blur-sm  select-none shadow-lg">
                  Elarise!{" "}
                </span>
              </h1>
              <h1 className="ml-3 font-medium text-3xl  lg:text-4xl">
                Get the Mobile App Now and Elevate{" "}
              </h1>
              <h1 className="ml-3 font-medium text-3xl lg:text-4xl mt-2 mb-10">
                Your Language Skills Anywhere, Anytime
              </h1>

              <button className="flex items-center text-3xl font-bold bg-white py-5 px-4 shadow-xl rounded-full border-2 border-black hover:scale-125  transition duration-300 ease-in-out">
                <span className="shadow-sm">DOWNLOAD NOW </span>
              </button>
            </div>
          </div>
          <div className="w-full    flex justify-start mr-3">
            <img
              src="./flying phone.png"
              alt=""
              className="scale-75 md:h-fit"
            />
          </div>
        </section>
        {/* download now end*/}

        {/* feature start  */}
        <section id="Feature" className=" bg-myyellow w-full">
          <div className=" mx-auto">
            <h1 className="italic font-bold text-6xl drop-shadow-sm text-center">
              What Can I Do For You ?
            </h1>

            <div className=" md:flex">
              <div className="flex flex-col md:w-1/2 justify-between space-y-4 md:space-y-0 ">
                {/* button ijo  */}
                <div className="relative">
                  <div className="flex ">
                    <div className="  w-1/5 lg:w-3/5 pt-10 relative">
                      <img
                        src="./clean.png"
                        alt=""
                        className="w-32 h-fit absolute -rotate-45 -right-5 top-0 "
                      />
                      <img
                        src="./open-hand.png"
                        alt=""
                        className=" absolute bottom-48 rotate-45 w-72 h-fit"
                      />
                      <img
                        src="./cloud.png"
                        alt=""
                        className="absolute bottom-8 -right-20 z-0 w-48 h-fit"
                      />
                    </div>
                    <Link to="/talk">
                      <button className=" relative z-10 py-3 my-24  flex flex-col items-center bg-mygreen rounded-3xl border-black border-t-2 border-l-2 border-r-2 border-b-[7px] text-3xl text-white font-bold shadow-md hover:scale-105 transition duration-300 ease-in-out">
                        <img src="./ijo.png" alt="" className="w-80 h-80" />{" "}
                        Talk Freely With Elara
                        <h1 className="font-medium text-2xl mb-1 ">
                          Friendly Talk Company{" "}
                        </h1>
                        <div className=" flex items-center border-[1px] border-black justify-end rounded-full w-1/2 font-medium text-black bg-white">
                          Start
                          <img
                            src="./button kuning.png"
                            alt=""
                            className=" scale-90 h-fit ml-5 mr-2"
                          />
                        </div>
                      </button>
                    </Link>
                  </div>

                  {/* text buat ijo */}
                </div>
                {/* bubble text green */}
                <div className="  w-full  ">
                  <div className=" w-[90%] relative z-20 flex justify-between rounded-r-2xl border-black border-t-2 border-b-2 border-r-4 text-mytext text-xl font-medium bg-white">
                    <div className="">
                      <h1 className="mb-2 ml-4">
                        Elara Acts As Your{" "}
                        <span className="font-bold">
                          {" "}
                          Conversational Partner
                        </span>
                        ,
                      </h1>
                      <p className="ml-4">
                        Helping You Practice and Improve <br />
                        Your Language Skills in a Supportive Environment.
                      </p>
                    </div>
                    <img src="./star_green.png" alt="" className="w-24 h-fit" />
                  </div>
                  <div className="relative bottom-20  z-10  h-24  w-[95%]  rounded-r-2xl border-black border-t-2 border-b-4 border-r-4  bg-mygreen">
                    {" "}
                  </div>
                </div>
              </div>
              {/* last div button section  */}
              <div className="flex flex-col md:w-1/2 justify-between space-y-4 md:space-y-0">
                {/* button ungu  */}
                <div className="relative ">
                  <div className=" flex  justify-end">
                    <Link to="/grammar">
                      <button className="relative z-10 py-3 my-24 mb-5 flex flex-col items-center bg-[#E39AE1] rounded-3xl border-black border-t-2 border-l-2 border-r-2 border-b-[7px] text-3xl  font-bold shadow-md hover:scale-105 transition duration-300 ease-in-out">
                        <img src="./ungu.png" alt="" className="w-80 h-80" />{" "}
                        Elara Grammar Guru
                        <h1 className="font-medium text-2xl mb-1 ">
                          Improve As You Interact{" "}
                        </h1>
                        <div className=" flex items-center border-[1px] border-black justify-end rounded-full w-1/2 font-medium text-black bg-white">
                          Start
                          <img
                            src="./button kuning.png"
                            alt=""
                            className=" scale-90 h-fit ml-5 mr-2"
                          />
                        </div>
                      </button>
                    </Link>
                    <div className="  w-1/5 lg:w-3/5 pt-10 relative ">
                      <img
                        src="./clean.png"
                        alt=""
                        className="w-32 h-fit absolute -left-5 top-0 -rotate-45 "
                      />
                      <img
                        src="./open-hand 2.png"
                        alt=""
                        className=" absolute bottom-32 right-0 w-80 h-fit"
                      />
                      <img
                        src="./cloud.png"
                        alt=""
                        className="absolute -bottom-5 -left-16 z-0 w-48 h-fit"
                      />
                    </div>
                  </div>

                  {/* text buat ungu */}
                </div>
                {/* bubble text ungu */}
                <div className=" w-full flex flex-col items-end  ">
                  <div className="  w-[90%] relative z-20 flex flex-row justify-between rounded-l-2xl border-black border-t-2 border-b-2 border-l-4 text-mytext text-xl text-right font-medium bg-white">
                    <img src="./star_pink.png" alt="" className=" w-24 h-fit" />
                    <div className="">
                      <h1 className="mb-2 mr-4">
                        Elara{" "}
                        <span className="font-bold">
                          {" "}
                          Listens to Your Spoken Input
                        </span>
                        ,
                      </h1>
                      <p className="mr-4">
                        Provides Instant Feedback on Grammar Corrections,
                        <br /> Enabling You to Refine Your Accuracy.
                      </p>
                    </div>
                  </div>
                  <div className="relative bottom-20 h-28 md:bottom-20 md:h-24 z-10  w-[95%]  rounded-l-2xl border-black border-t-2 border-b-4 border-l-4  bg-[#E39AE1]">
                    {" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* feature end  */}
        {/* FAQ SECTION START  */}

        {/* FAQ SECTION END  */}
      </div>
    </>
  );
};

export default HomePage;
