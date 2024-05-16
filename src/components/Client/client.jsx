import React, { useState } from "react";
import { Card } from "flowbite-react";
import axios from 'axios';
import UpdateClientPopup from './UpdateClientPopup';
import AddRealEstate from "../RealEstate/AddRealEstate";

export function ClientCard({ id, name, phone, email, city, clientType }) {
    const baseUrl = import.meta.env.VITE_HOST_URL;

    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    const [showAddRealEstatePopup, setShowAddRealEstatePopup] = useState(false);

    const handleDelete = (id) => {
        axios.delete(`${baseUrl}/api/v1/client/delete/${id}`)
            .then(response => {
                console.log('Delete request successful:', response);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error deleting client:', error);
            });
    };

    return (
        <Card className="max-w-sm">
            <div className="flex flex-col items-center pb-10">
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{phone}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{email}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{city}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{clientType}</span>
                <div className="mt-4 flex space-x-3 lg:mt-6">
                    <button
                        onClick={() => setShowUpdatePopup(true)}
                        className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                    >
                        Update
                    </button>
                    {showUpdatePopup && (
                        <UpdateClientPopup id={id} onClose={() => (setShowUpdatePopup(false))} />
                    )}
                    <button
                        onClick={() => handleDelete(id)}
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => setShowAddRealEstatePopup(true)}
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                        Add Real Estate
                    </button>
                    {showAddRealEstatePopup && (
                        <AddRealEstate id={id} onClose={() => setShowAddRealEstatePopup(false)} />
                    )}
                </div>
            </div>
        </Card>
    );
}

export default ClientCard;