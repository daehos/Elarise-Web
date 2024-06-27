const BaseVoiceScreen = () => {
  return (
    <>
      <div className="flex">
        <div className="flex-1  relative">
          {/* Background elements */}
          {/* Matahari */}
          <img src="/sun_bg.png" alt="" className=" absolute top-0 left-0  " />
          <img
            src="/logo_lebihasik.png"
            alt=""
            className=" absolute top-7 right-0  "
          />

          {/* Roket */}
          <img
            src="/roket_bg.png"
            alt=""
            className="absolute top-[600px] -right-10 scale-75  "
          />
        </div>
      </div>
    </>
  );
};
export default BaseVoiceScreen;
