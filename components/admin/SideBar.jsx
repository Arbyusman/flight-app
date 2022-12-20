import { forwardRef } from "react";
import { Dropdown } from "flowbite-react";
import Link from "next/link";
import { BiHomeAlt, BiCard, BiUser } from "react-icons/bi";
import { FaTicketAlt,FaPlane } from "react-icons/fa";
import { TbDiscount2 } from "react-icons/tb";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import { GiControlTower } from "react-icons/gi";
import { useRouter } from "next/router";
import Image from "next/image";
import LogoImage from "../../public/images/TakeOff.png";
const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();

  return (
    <div ref={ref} className=" z-40 fixed w-56  h-full bg-blue-900  shadow-xl">
      <div className="flex justify-center  mb-5">
        <picture>
          <Image src={LogoImage} className="w-20 h-20" />
        </picture>
      </div>

      <div className="flex flex-col mx-auto">
        <Link href="/admin">
          <div
            className={`pl-6 py-3 text-white mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "dashboard"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-600 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <BiHomeAlt className="h-5 w-5" />
            </div>
            <div>
              <p>Home</p>
            </div>
          </div>
        </Link>
        <Link href="/admin/user">
          <div
            className={`pl-6 py-3  text-white mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "user"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-600 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <BiUser className="h-5 w-5" />
            </div>
            <div>
              <p>User</p>
            </div>
          </div>
        </Link>
        <Link href="/admin/airport" activeClassName="active">
          <div
            className={`pl-6 py-3 text-white  mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors  ${
              router.pathname === "/airport"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-600 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <GiControlTower className="h-5 w-5" />
            </div>
            <div>
              <p>airport</p>
            </div>
          </div>
        </Link>
        <Link href="/admin/plane" activeClassName="active">
          <div
            className={`pl-6 py-3 text-white  mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors  ${
              router.pathname === "/plane"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-600 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <FaPlane className="h-5 w-5" />
            </div>
            <div>
              <p>plane</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/flight" activeClassName="active">
          <div
            className={`pl-6 py-3 text-white  mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors  ${
              router.pathname === "/flight"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-600 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <MdOutlineFlightTakeoff className="h-5 w-5" />
            </div>
            <div>
              <p>Flight</p>
            </div>
          </div>
        </Link>
        <Link href="/admin/promo" activeClassName="active">
          <div
            className={`pl-6 py-3 text-white  mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors  ${
              router.pathname === "/promo"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-600 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <TbDiscount2 className="h-5 w-5" />
            </div>
            <div>
              <p>Promo</p>
            </div>
          </div>
        </Link>
        <Link href="/admin/ticket" activeClassName="active">
          <div
            className={`pl-6 py-3 text-white  mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors  ${
              router.pathname === "/ticket"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-600 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <FaTicketAlt className="h-5 w-5" />
            </div>

            <div>
              <p>Ticket</p>
            </div>
          </div>
        </Link>
      
       
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
