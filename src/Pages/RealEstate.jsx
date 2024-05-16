import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RealEstateCard from '../components/RealEstate/RealEstate';
import "./Client.css"


function RealEstate() {
    const baseUrl = import.meta.env.VITE_HOST_URL;

    const [RealEstate, setRealEstate] = useState([]);

    useEffect(() => {
        axios.get(`${baseUrl}/api/v1/real-estate/all`)
            .then(response => {
                setRealEstate(response.data);
                console.log(response.data);
            });
    }, []);

    return (
        <div className="client-container">
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
                    ownerId={realEstate.ownerId}
                />
            ))}
        </div>
    )
}

export default RealEstate;