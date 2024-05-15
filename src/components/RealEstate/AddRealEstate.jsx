import React, { useState } from 'react';
import axios from 'axios';
import '../Client/UpdateClientPopup.css';


function AddRealEstate({ onClose }) {
    const baseUrl = import.meta.env.VITE_HOST_URL;

    const [name, setName] = useState('');
    const [address, setAdress] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState('');
    const [listingType, setListingType] = useState('');


    const handleAdding = () => {
        const newData = { name, city, address, description, state, price, availability, listingType };
        axios.post(`${baseUrl}/api/v1/real-estate/add`, newData)
            .then(response => {
                console.log('Real Estate Created', response);
                onClose();
                window.location.reload();
            })
            .catch(error => {
                console.error('Error creating Real Estate:', error);
            });
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <input type="text" value={address} onChange={(e) => setAdress(e.target.value)} placeholder="Adress" />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
                    <option value="">Select Availability</option>
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="NOT_AVAILABLE">NOT_AVAILABLE</option>
                </select>

                <select value={listingType} onChange={(e) => setListingType(e.target.value)}>
                    <option value="">Select Listing Type</option>
                    <option value="FOR_SALE">FOR_SALE</option>
                    <option value="FOR_RENT">FOR_RENT</option>
                </select>
                <button onClick={handleAdding}>Create</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default AddRealEstate;