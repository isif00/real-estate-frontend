/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { Card } from "flowbite-react";
import UpdateRealEstatePopup from "./UpdateRealEstatePopup";
import { DetailsPopup } from "./ShowDetailsPopup";
import { BuyPopup } from "./BuyRealEstate";

import {
  MdOutlineDelete,
  MdOutlineModeEdit,
  MdOutlinePhone,
  MdOutlineEmail,
  MdOutlineHomeWork,
  MdPersonOutline,
  MdEventAvailable,
  MdAttachMoney ,
  MdOutlineDescription,
  MdOutlineBusinessCenter 

} from "react-icons/md";

export function RealEstateCard({
  id,
  name,
  address,
  city,
  state,
  price,
  availibilty,
  description,
  listingType,
  ownerId,
}) {
  const baseUrl = import.meta.env.VITE_HOST_URL;

  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showBuyPopup, setBuyPopup] = useState(false);

  const handleDelete = (id) => {
    axios
      .delete(`${baseUrl}/api/v1/real-estate/delete/${id}`)
      .then((response) => {
        console.log("Delete request successful:", response);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting client:", error);
      });
  };

  const realEstate = {
    id,
    name,
    address,
    city,
    state,
    price,
    availibilty,
    description,
    listingType,
    ownerId,
  };

  return (
    <Card className="w-[340px] 	shadow-white  border-zinc-200 	  ">
      <div className="flex flex-col gap-6  py-1 ">
        <div className="flex  justify-between ">
          <h5 className="mb-1 text-2xl items-center text-gray-900 dark:text-white">
            {name}
          </h5>
          <div className="flex flex-row-reverse gap-1">
            <button
              onClick={() => handleDelete(id)}
              className="rounded-xl items-center  justify-center bg-[#e30000] px-4 py-2 text-center text-md flex font-medium text-white hover:bg-[#f05656]  focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              <MdOutlineDelete className="text-xl items-center font-semibold" />
            </button>
            <button
              onClick={() => setShowUpdatePopup(true)}
              className="rounded-xl items-center  justify-center bg-[#0023FC] px-4 py-2 text-center text-md flex font-medium text-white hover:bg-[#221fe6]  focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              <MdOutlineModeEdit className="text-xl items-center font-semibold" />
            </button>
            {showUpdatePopup && (
              <UpdateRealEstatePopup
                id={id}
                onClose={() => setShowUpdatePopup(false)}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-md flex items-center text-gray-500 dark:text-gray-400">
            <MdEventAvailable className="text-xl items-center font-semibold mr-3" />{" "}
            {availibilty}
          </span>
          <span className="text-md flex items-center text-gray-500 dark:text-gray-400">
            <MdAttachMoney  className="text-xl items-center font-semibold mr-3" />{" "}
            {price}
          </span>

          <span className="text-md flex items-center text-gray-500 dark:text-gray-400">
            <MdOutlineHomeWork className="text-2xl items-center font-semibold mr-3" />{" "}
            {city}
          </span>
          <span className="text-md flex items-center text-gray-500 dark:text-gray-400">
            <MdOutlineHomeWork className="text-xl items-center font-semibold mr-3 " />{" "}
            {address}
          </span>
          <span className="text-md flex items-center text-gray-500 dark:text-gray-400">
            <MdOutlineHomeWork className="text-xl items-center font-semibold mr-3 " />{" "}
            {state}
          </span>
          <span className="text-md flex items-center text-gray-500 dark:text-gray-400">
            <MdOutlineDescription  className="text-xl items-center font-semibold mr-3 " />{" "}
            {description}
          </span>
          <span className="text-md flex items-center text-gray-500 dark:text-gray-400">
            <MdOutlineBusinessCenter  className="text-xl items-center font-semibold mr-3 " />{" "}
            {listingType}
          </span>
        </div>

        <div className=" flex flex-col gap-2  w-full ">
          <button
            onClick={() => setBuyPopup(true)}
            className="inline-flex  rounded-xl  border w-full justify-center  border-gray-300 bg-white  py-2 text-center text-md items-center font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Transaction
          </button>
          {showBuyPopup && (
            <BuyPopup realEstate={realEstate} onClose={() => setBuyPopup(false)} />
          )}
          <button
            onClick={() => setShowDetailsPopup(true)}
            className="rounded-xl border w-full justify-center  border-gray-300 bg-white  py-2 text-center text-md flex items-center font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Show details
          </button>
          {showDetailsPopup && (
            <DetailsPopup
              ownerId={ownerId}
              onClose={() => setShowDetailsPopup(false)}
            />
          )}{" "}
        </div>
      </div>
    </Card>
  );
}

export default RealEstateCard;
