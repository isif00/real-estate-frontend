/* eslint-disable react/prop-types */
import { Card } from "flowbite-react";
import axios from "axios";
import {
  MdOutlineDelete,
  MdOutlinePhone,
  MdOutlineEmail,
  MdOutlineHomeWork,
} from "react-icons/md";

export function AppointmentCard({
  id,
  clientName,
  clientPhoneNumber,
  clientEmail,
}) {
  const baseUrl = import.meta.env.VITE_HOST_URL;

  const handleDelete = (id) => {
    axios
      .delete(`${baseUrl}/api/v1/appointment/delete/${id}`)
      .then((response) => {
        console.log("Delete appointment successful:", response);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting appointment:", error);
      });
  };

  return (
    <Card className="w-[340px] h-[200px] 	shadow-white  border-zinc-200 	  ">
      <div className="flex flex-col   text-xl">
        <div className="flex w-full justify-between">
          {" "}
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {clientName}
          </h5>{" "}
          <button
            onClick={() => handleDelete(id)}
            className="rounded-xl  justify-center  border border-gray-300 bg-[#e30000]   px-4 py-2 text-center text-md flex items-center font-medium text-white hover:bg-[#f05656] focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            <MdOutlineDelete className="text-xl items-center font-semibold" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-md flex items-center text-gray-500 dark:text-gray-400">
            <MdOutlinePhone className="text-xl items-center font-semibold mr-3" />{" "}
            {clientPhoneNumber}
          </span>
          <span className="text-md flex items-center text-gray-500 dark:text-gray-400">
            <MdOutlineEmail className="text-xl items-center font-semibold mr-3" />{" "}
            {clientEmail}
          </span>

          <span className="text-md flex items-center text-gray-500 dark:text-gray-400">
            <MdOutlineHomeWork className="text-2xl items-center font-semibold mr-3" />{" "}
            {clientName}
          </span>
        </div>
        <div className="mt-4 flex space-x-3 lg:mt-6"></div>
      </div>
    </Card>
  );
}

export default AppointmentCard;
