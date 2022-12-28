import { forwardRef } from "react";
import { Dropdown } from "flowbite-react";
import Link from "next/link";
import { BiHomeAlt, BiCard, BiUser } from "react-icons/bi";
import { FaTicketAlt, FaPlane } from "react-icons/fa";
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
              router.pathname == "dashboard" ? "bg-orange-100 text-orange-500" : "text-gray-600 hover:bg-orange-100 hover:text-orange-500"
            }`}>
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
              router.pathname == "user" ? "bg-orange-100 text-orange-500" : "text-gray-600 hover:bg-orange-100 hover:text-orange-500"
            }`}>
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
              router.pathname === "/airport" ? "bg-orange-100 text-orange-500" : "text-gray-600 hover:bg-orange-100 hover:text-orange-500"
            }`}>
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
              router.pathname === "/plane" ? "bg-orange-100 text-orange-500" : "text-gray-600 hover:bg-orange-100 hover:text-orange-500"
            }`}>
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
              router.pathname === "/flight" ? "bg-orange-100 text-orange-500" : "text-gray-600 hover:bg-orange-100 hover:text-orange-500"
            }`}>
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
              router.pathname === "/promo" ? "bg-orange-100 text-orange-500" : "text-gray-600 hover:bg-orange-100 hover:text-orange-500"
            }`}>
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
              router.pathname === "/ticket" ? "bg-orange-100 text-orange-500" : "text-gray-600 hover:bg-orange-100 hover:text-orange-500"
            }`}>
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

// <!-- This is an example component -->
// <div className="max-w-2xl mx-auto">

// 	<aside className="w-64" aria-label="Sidebar">
// 		<div className="px-3 py-4 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800">
// 			<ul className="space-y-2">
// 				<li>
// 					<a href="#"
// 						className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
// 						<svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
// 							fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
// 							<path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
// 							<path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
// 						</svg>
// 						<span className="ml-3">Dashboard</span>
// 					</a>
// 				</li>
// 				<li>
// 					<button type="button" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
//                   <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
//                   <span className="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>E-commerce</span>
//                   <svg sidebar-toggle-item className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
//             </button>
// 					<ul id="dropdown-example" className="hidden py-2 space-y-2">
// 						<li>
// 							<a href="#"
// 								className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Products</a>
// 						</li>
// 						<li>
// 							<a href="#"
// 								className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Billing</a>
// 						</li>
// 						<li>
// 							<a href="#"
// 								className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Invoice</a>
// 						</li>
// 					</ul>
// 				</li>
// 				<li>
// 					<a href="#"
// 						className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
// 						<svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
// 							fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
// 							<path
// 								d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
// 							</path>
// 						</svg>
// 						<span className="flex-1 ml-3 whitespace-nowrap">Kanban</span>
// 						<span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
// 					</a>
// 				</li>
// 				<li>
// 					<a href="#"
// 						className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
// 						<svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
// 							fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
// 							<path
// 								d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z">
// 							</path>
// 							<path
// 								d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z">
// 							</path>
// 						</svg>
// 						<span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
// 						<span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span>
// 					</a>
// 				</li>
// 				<li>
// 					<a href="#"
// 						className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
// 						<svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
// 							fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
// 							<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
// 								clip-rule="evenodd"></path>
// 						</svg>
// 						<span className="flex-1 ml-3 whitespace-nowrap">Users</span>
// 					</a>
// 				</li>
// 				<li>
// 					<a href="#"
// 						className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
// 						<svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
// 							fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
// 							<path fill-rule="evenodd"
// 								d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
// 								clip-rule="evenodd"></path>
// 						</svg>
// 						<span className="flex-1 ml-3 whitespace-nowrap">Products</span>
// 					</a>
// 				</li>
// 				<li>
// 					<a href="#"
// 						className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
// 						<svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
// 							fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
// 							<path fill-rule="evenodd"
// 								d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
// 								clip-rule="evenodd"></path>
// 						</svg>
// 						<span className="flex-1 ml-3 whitespace-nowrap">Sign In</span>
// 					</a>
// 				</li>
// 				<li>
// 					<a href="#"
// 						className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
// 						<svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
// 							fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
// 							<path fill-rule="evenodd"
// 								d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
// 								clip-rule="evenodd"></path>
// 						</svg>
// 						<span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
// 					</a>
// 				</li>
// 			</ul>
// 		</div>
// 	</aside>

// 	<p className="mt-5">This sidebar component is part of a larger, open-source library of Tailwind CSS components. Learn
// 		more
// 		by going to the official <a className="text-blue-600 hover:underline"
// 			href="#" target="_blank">Flowbite Documentation</a>.
// 	</p>
//     <script src="https://unpkg.com/flowbite@1.3.4/dist/flowbite.js"></script>
// </div>
