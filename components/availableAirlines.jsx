import Image from "next/image";
import batik from "../public/images/batik.png";
import airasia from "../public/images/air_asia.png";
import garuda from "../public/images/garuda.png";
import lion from "../public/images/lion.png";
import qatar from "../public/images/Qatar.png";
import wings from "../public/images/wings.png";
import singapore from "../public/images/singapore.png";
import sriwijaya from "../public/images/sriwijaya.png";

export default function Airline() {
  return (
    <div className="flex justify-center items-center  my-8 ">
      <div className="lg:w-8/12 md:w-10/12 justify-center items-center flex-row ">
        <div className="flex justify-center items-center my-3 ">
          <h1 className="text-xl flex font-semibold antialiased tracking-wide text-gray-700">
            Available Airlines
          </h1>
        </div>
        <div className="md:flex-row grid-cols-4 gap-5 grid md:flex items-center justify-center text-center md:gap-7">
          <figure className="max-w-md">
            <Image
              width={100}
              height={100}
              src={batik}
              alt="logo batik air"
            ></Image>
            <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              Batik Air
            </figcaption>
          </figure>
          <figure className="max-w-md">
            <Image
              width={100}
              height={100}
              src={airasia}
              alt="logo air-asia"
            ></Image>
            <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              Air Asia
            </figcaption>
          </figure>
          <figure className="max-w-md">
            <Image
              width={100}
              height={100}
              src={garuda}
              alt="logo garuda indonesia"
            ></Image>
            <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              Garuda Indonesia
            </figcaption>
          </figure>
          <figure className="max-w-md">
            <Image
              width={100}
              height={100}
              src={lion}
              alt="logo lion air"
            ></Image>
            <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              Lion Air
            </figcaption>
          </figure>
          <figure className="max-w-md">
            <Image
              width={100}
              height={100}
              src={qatar}
              alt="logo batik air"
            ></Image>
            <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              Qatar Airways
            </figcaption>
          </figure>
          <figure className="max-w-md">
            <Image
              width={100}
              height={100}
              src={wings}
              alt="logo wings air"
            ></Image>
            <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              Wings Air
            </figcaption>
          </figure>
          <figure className="max-w-md">
            <Image
              width={100}
              height={100}
              src={sriwijaya}
              alt="logo sriwijaya air"
            ></Image>
            <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              Sriwijaya Air
            </figcaption>
          </figure>
          <figure className="max-w-md">
            <Image
              width={100}
              height={100}
              src={singapore}
              alt="logo singapore air"
            ></Image>
            <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              Singapore Airlines
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}
