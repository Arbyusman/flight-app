import { FaHistory, FaPlaneDeparture } from "react-icons/fa";

export default function HistoryBooking() {
  return (
    <div className=" flex justify-center mt-5">
      <div className="w-full justify-center lg:w-1/2 items-center">
        <div className="  bg-white shadow-lg py-3 px-3 border-2 rounded-md">
          <div className="text-blue-500 flex font-extrabold gap-2 items-center text-lg py-1 px-3 justify-center lg:justify-start:  ">
            <FaHistory className="" style={{ width: "" }} />
            History Booking
          </div>
        </div>

        <div className="flex justify-center mx-10">
          <div className="w-full gap-3 mt-5 lg:grid lg:grid-cols-2">
            <div className="block my-2 lg:gap-3  p-3 bg-white h-max border border-gray-200  rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 w-full ">
              <p className="font-bold mt-3">Order ID : </p>
              <div className="flex gap-2 mt-3 items-center">
                <p className="text-gray-800 font-bold ">Jakarta </p>
                <FaPlaneDeparture />
                <p className="text-gray-800 font-bold "> Padang</p>
              </div>
              <div className="text-slate-500 mt-3  items-center flex-row">
                <div className="flex gap-3">
                  <p className="lg:w-20">Trip </p>
                  <p className="">:</p>
                  <p className="">Round Trip </p>
                </div>
                <div className="flex gap-3">
                  <p className="lg:w-20">passenger </p>
                  <p className="">:</p>
                  <p className="">2 orang </p>
                </div>
                <div className="flex gap-3">
                  <p className="lg:w-20">Date</p>
                  <p className="">:</p>
                  <p className="">2 Desember 2022 </p>
                </div>

                <a className="" href="/detail/order/id">
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-2 mr-2 mb-2 mt-5">
                    Detail
                  </button>
                </a>
              </div>
            </div>
            
            
           
          </div>
        </div>
      </div>
    </div>
  );
}
