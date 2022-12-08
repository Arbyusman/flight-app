import { forwardRef } from "react";
import Link from "next/link";
import { BiHomeAlt, BiCard, BiUser } from "react-icons/bi";
import { useRouter } from "next/router";
import Image from "next/image";
import LogoImage from "../../public/images/TakeOff.png";
const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();

  return (
    <div ref={ref} className=" fixed w-56 h-full bg-white shadow-xl">
      <div className="flex justify-center  mb-5">
        <picture>
          <Image src={LogoImage} className="w-20 h-20"/>
        </picture>
      </div>

      <div className="flex flex-col">
        <Link href="/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "admin"
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
        <Link href="account">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "account"
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
        <Link href="billing">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname === "/billing"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-600 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <BiCard className="h-5 w-5" />
            </div>
            <div>
              <p>Billing</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;