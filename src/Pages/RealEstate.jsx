import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RealEstateCard from '../components/RealEstate/RealEstate';
import "./Client.css"


function RealEstate() {
    const baseUrl = import.meta.env.VITE_HOST_URL;

    const [RealEstate, setRealEstate] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios.get(`${baseUrl}/api/v1/real-estate/all`)
            .then(response => {
                setRealEstate(response.data);
                console.log(response.data);
            });
    }, [baseUrl]);

    const filteredRealEstate = RealEstate.filter(realEstate =>
        realEstate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        realEstate.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        realEstate.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        realEstate.state.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="page-header">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search real estates..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>
            <div className="client-container">
                {filteredRealEstate.map(realEstate => (
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
        </>
    )
}

export default RealEstate;