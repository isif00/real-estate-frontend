import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RealEstateCard from '../components/RealEstate/RealEstate';
import AddRealEstate from '../components/RealEstate/AddRealEstate';
import "./Client.css"


function RealEstate() {
    const baseUrl = import.meta.env.VITE_HOST_URL;

    const [RealEstate, setRealEstate] = useState([]);
    const [showCreatePopup, setShowCreatePopup] = useState(false);

    useEffect(() => {
        axios.get(`${baseUrl}/api/v1/real-estate/all`)
            .then(response => {
                setRealEstate(response.data);
                console.log(response.data);
            });
    }, []);

    return (
        <div className="client-container">
            <button
                onClick={() => setShowCreatePopup(true)}
                className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
                Add Real Estate
            </button>
            {showCreatePopup && (
                <AddRealEstate onClose={() => setShowCreatePopup(false)} />
            )}
            {RealEstate.map(realEstate => (
                <RealEstateCard
                    id={realEstate.id}
                    key={realEstate.id}
                    name={realEstate.name}
                    address={realEstate.address}
                    city={realEstate.city}
                    state={realEstate.state}
                    price={realEstate.price}
                    zip={realEstate.zip}
                    availibilty={realEstate.availability}
                    listingType={realEstate.listingType}
                />
            ))}
        </div>
    )
}

export default RealEstate;