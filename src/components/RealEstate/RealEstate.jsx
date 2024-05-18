import React, { useState } from "react";
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

  return (
    <Card className="w-[340px] 	shadow-white  border-zinc-200 	  ">
      <div className="flex flex-col gap-6  py-1 ">
        <div className="flex  justify-between ">
          <h5 className="mb-1 text-2xl items-center  font-semibold font-medium text-gray-900 dark:text-white">
            {name}
          </h5>
          <div className="flex flex-row-reverse gap-1">
            <button
              onClick={() => handleDelete(id)}
              className="inline-flex items-center rounded-xl items-center  justify-center  border border-gray-300 bg-[#e30000]   px-4 py-2 text-center text-md flex items-center font-medium text-white hover:bg-[#f05656] focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              <MdOutlineDelete className="text-xl items-center font-semibold" />
            </button>
            <button
              onClick={() => setShowUpdatePopup(true)}
              className="inline-flex items-center rounded-xl items-center  justify-center bg-[#0023FC] px-4 py-2 text-center text-md flex items-center font-medium text-white hover:bg-[#221fe6]  focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
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
            <MdOutlinePhone className="text-xl items-center font-semibold mr-3" />{" "}
            {availibilty}
          </span>
          <span className="text-md flex items-center text-gray-500 dark:text-gray-400">
            <MdOutlineEmail className="text-xl items-center font-semibold mr-3" />{" "}
            {price}
          </span>

          <span className="text-md flex items-center text-gray-500 dark:text-gray-400">
            <MdOutlineHomeWork className="text-2xl items-center font-semibold mr-3" />{" "}
            {city}
          </span>
          <span className="text-md flex items-center text-gray-500 dark:text-gray-400">
            <MdPersonOutline className="text-xl items-center font-semibold mr-3 " />{" "}
            {address}
          </span>
          <span className="text-md flex items-center text-gray-500 dark:text-gray-400">
            <MdPersonOutline className="text-xl items-center font-semibold mr-3 " />{" "}
            {state}
          </span>
          <span className="text-md flex items-center text-gray-500 dark:text-gray-400">
            <MdPersonOutline className="text-xl items-center font-semibold mr-3 " />{" "}
            {description}
          </span>
          <span className="text-md flex items-center text-gray-500 dark:text-gray-400">
            <MdPersonOutline className="text-xl items-center font-semibold mr-3 " />{" "}
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
            <BuyPopup id={id} onClose={() => setBuyPopup(false)} />
          )}
          <button
            onClick={() => setShowDetailsPopup(true)}
            className="inline-flex items-center rounded-xl items-center border w-full justify-center  border-gray-300 bg-white  py-2 text-center text-md flex items-center font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
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
    /* <Card className="max-w-sm">
            <div className="flex flex-col items-center pb-10">
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{address}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{city}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{stat}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{price}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{price}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{zip}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{availibilty}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{listingType}</span>
                <div className="mt-4 flex space-x-3 lg:mt-6">
                    <button
                        onClick={() => setShowUpdatePopup(true)}
                        className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                    >
                        Update
                    </button>
                    {showUpdatePopup && (
                        <UpdateRealEstatePopup id={id} onClose={() => (setShowUpdatePopup(false))} />
                    )}
                    <button
                        onClick={() => handleDelete(id)}
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => setShowDetailsPopup(true)}
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                        Show Details
                    </button>
                    {showDetailsPopup && (
                        <DetailsPopup id={id} ownerId={ownerId} onClose={() => (setShowDetailsPopup(false))} />
                    )}                    
                    <button
                        onClick={() => setBuyPopup(true)}
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                        Transaction
                    </button>
                    {showBuyPopup && (
                        <BuyPopup id={id} onClose={() => (setBuyPopup(false))} />
                    )}
                </div>
            </div>
        </Card>*/
  );
}

export default RealEstateCard;
