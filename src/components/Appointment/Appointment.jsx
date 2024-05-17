import React from "react";
import { Card } from "flowbite-react";
import axios from 'axios';


export function AppointmentCard({ id, clientName, clientId, clientPhoneNumber, clientEmail, date}) {
    const baseUrl = import.meta.env.VITE_HOST_URL;


    const handleDelete = (id) => {
        axios.delete(`${baseUrl}/api/v1/appointment/delete/${id}`)
            .then(response => {
                console.log('Delete appointment successful:', response);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error deleting appointment:', error);
            });
    };

    return (
        <Card className="max-w-sm">
            <div className="flex flex-col items-center pb-10">
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{clientName}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{clientPhoneNumber}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{clientEmail}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{date}</span>
                <div className="mt-4 flex space-x-3 lg:mt-6">
                    <button
                        onClick={() => handleDelete(id)}
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Card>
    );
}

export default AppointmentCard;