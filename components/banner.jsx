import Image from "next/image";
import goglePlayImage from "../public/images/google-play-badge.png";
export default function Banner() {
  return (
    <div className="bg-blue-700 justify-center items-center flex ">
      <div className="container  flex flex-col md:flex-row md:my-5 justify-center">
        <div className="flex items-center justify-center">
          <img
            src="https://cdn.airpaz.com/images/mockups/en.png "
            className="mt-5 "
          />
        </div>
        <div className="bg-blue-800 shadow-md sm:rounded-md justify-center py-10 px-3  items-center md:items-start md:bg-inherit md:shadow-none flex flex-col">
          <p className="font-medium text-white text-center md:ml-3">
            Download TakeOff App Now, Book flight ticket now
          </p>
          <Image src={goglePlayImage} className="w-52 " />
        </div>
      </div>
    </div>
  );
}
