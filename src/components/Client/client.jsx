/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card } from "flowbite-react";
import axios from "axios";
import UpdateClientPopup from "./UpdateClientPopup";
import AddRealEstate from "../RealEstate/AddRealEstate";
import AddAppointmentPopup from "../Appointment/AddAppointment";

import {
  MdOutlineDelete,
  MdOutlineModeEdit,
  MdOutlinePhone,
  MdOutlineEmail,
  MdOutlineHomeWork,
  MdPersonOutline,
} from "react-icons/md";

export function ClientCard({ id, name, phone, email, city, clientType }) {
  const baseUrl = import.meta.env.VITE_HOST_URL;

  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showAddRealEstatePopup, setShowAddRealEstatePopup] = useState(false);
  const [showAddAppointmentPopup, setShowAddAppointmentPopup] = useState(false);

  const handleDelete = (id) => {
    axios
      .delete(`${baseUrl}/api/v1/client/delete/${id}`)
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
          <h5 className="mb-1 text-2xl items-center  text-gray-900 dark:text-white">
            {name}
          </h5>
          <div className="flex flex-row-reverse gap-1">
            <button
              onClick={() => handleDelete(id)}
              className=" rounded-xl justify-center bg-[#e30000]   px-4 py-2 text-center text-md flex items-center font-medium text-white hover:bg-[#f05656] focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              <MdOutlineDelete className="text-xl items-center font-semibold" />
            </button>
            <button
              onClick={() => setShowUpdatePopup(true)}
              className="rounded-xl justify-center bg-[#0023FC] px-4 py-2 text-center text-md flex items-center font-medium text-white hover:bg-[#221fe6]  focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              <MdOutlineModeEdit className="text-xl items-center font-semibold" />
            </button>
            {showUpdatePopup && (
              <UpdateClientPopup
                id={id}
                onClose={() => setShowUpdatePopup(false)}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-md flex items-center text-gray-500 dark:text-gray-400">
            <MdOutlinePhone className="text-xl items-center font-semibold mr-3" />{" "}
            {phone}
          </span>
          <span className="text-md flex items-center text-gray-500 dark:text-gray-400">
            <MdOutlineEmail className="text-xl items-center font-semibold mr-3" />{" "}
            {email}
          </span>

          <span className="text-md flex items-center text-gray-500 dark:text-gray-400">
            <MdOutlineHomeWork className="text-2xl items-center font-semibold mr-3" />{" "}
            {city}
          </span>
          <span className="text-md flex items-center text-gray-500 dark:text-gray-400">
            <MdPersonOutline className="text-xl items-center font-semibold mr-3 " />{" "}
            {clientType}
          </span>
        </div>

        <div className=" flex flex-col gap-2  w-full ">
          <button
            onClick={() => setShowAddRealEstatePopup(true)}
            className="inline-flex  rounded-xl  border w-full justify-center  border-gray-300 bg-white  py-2 text-center text-md items-center font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Add Real Estate
          </button>
          {showAddRealEstatePopup && (
            <AddRealEstate
              id={id}
              onClose={() => setShowAddRealEstatePopup(false)}
            />
          )}
          <button
            onClick={() => setShowAddAppointmentPopup(true)}
            className="rounded-xl border w-full justify-center  border-gray-300 bg-white  py-2 text-center text-md flex items-center font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Add Appointment
          </button>
          {showAddAppointmentPopup && (
            <AddAppointmentPopup
              id={id}
              onClose={() => setShowAddAppointmentPopup(false)}
            />
          )}{" "}
        </div>
      </div>
    </Card>
  );
}

export default ClientCard;
