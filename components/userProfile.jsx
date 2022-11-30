import { useState } from "react";
import Profile from "./personalinformation";
import {RiUserSettingsLine} from "react-icons/ri";
import {GrHistory} from "react-icons/gr"

export default function UserProfile() {
  const [profil, setProfile] = useState(false);
  return (
    <div className="flex justify-center bg-slate-50">
      <div className=" container justify-center flex">
        <div className="flex my-10 py-5 gap-4 ">
          <div className="flex-row bg-white shadow-lg rounded-md py-5 px-5">
            <div className="flex items-center hover:bg-gray-200 focus:bg-gray-500 focus:text-white">
              <RiUserSettingsLine className="w-10" />
              <button
                type="button"
                className=" py-2.5 px-5 w-full mr-2  text-sm font-medium  text-left"
                onClick={() => setProfile(true)}
              >
                Profile
              </button>
            </div>
            <div className="flex items-center hover:bg-gray-200 focus:bg-gray-500 focus:text-white">
              <GrHistory  className="w-10"/>
              <button
                type="button"
                className=" py-2.5 px-5 w-full mr-2  text-sm font-medium text-left "
                onClick={() => setProfile(true)}
              >
                Booking History
              </button>
            </div>
           
          </div>
          <div className="mt-5 flex py-5 w-100 px-5 bg-white shadow-lg md:mt-0 ">
            <Profile openProfile={profil} />
          </div>
        </div>
      </div>
    </div>
  );
}
