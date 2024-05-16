import React, { useState } from 'react';
import axios from 'axios';
import '../Client/UpdateClientPopup.css';

function AddRealEstate({ id, onClose}) {
    const baseUrl = import.meta.env.VITE_HOST_URL;

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState('');
    const [listingType, setListingType] = useState('');


    const handleCreating = async () => {
        console.log(id);
        const newData = { name, city, address, description, state, price, availability, listingType, ownerId: id};
        try {
            const response = await axios.post(`${baseUrl}/api/v1/real-estate/add`, newData);
            console.log('Real Estate Created', response.data);
            return response.data;
        } catch (error) {
            console.error('Error creating Real Estate:', error);
            throw error;
        }
    };

    const handleAddingToClient = () => {
        console.log('Adding Real Estate to Client');
        handleCreating()
            .then(realEstateId => {
                const RealEstateId = { realEstateId: realEstateId };
                console.log(RealEstateId);
                return axios.put(`${baseUrl}/api/v1/client/add-real-estate/${id}`, RealEstateId);
            })
            .then(response => {
                console.log(`Real Estate Created and Added to ${id}`, response);
                onClose();
            })
            .catch(error => {
                console.error('Error creating and adding Real Estate:', error);
            });
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
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
                <button onClick={() => {
                    handleAddingToClient();
                }}>Create</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default AddRealEstate;
