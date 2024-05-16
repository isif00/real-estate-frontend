import React, { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import axios from 'axios';
import "./ClientsDropDown.css";

export function BuyPopup({ onClose, id }) {
    const baseUrl = import.meta.env.VITE_HOST_URL;
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [clients, setClients] = useState([]);
    const [price, setPrice] = useState('');
    const [transactionType, setTransactionType] = useState('');

    useEffect(() => {
        axios.get(`${baseUrl}/api/v1/client/all`)
            .then(response => {
                setClients(response.data);
            })
            .catch(error => {
                console.error('Error fetching clients:', error);
            });
    }, []);

    const userNamesWithIds = clients.map(({ id, name }) => ({ id, name }));

    const filteredUsers = userNamesWithIds.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectUser = (user) => {
        console.log('Selected user:', user);
        setSelectedUser(user);
        setIsOpen(false);
    };

    const handleTransaction = () => {
        const newTransaction = {
            realEstateId: id,
            buyerId: selectedUser.id,
            transactionType,
            transactionFee: price,
        };

        axios.post(`${baseUrl}/api/v1/transaction/add`, newTransaction)
            .then(response => {
                console.log('Transaction Created', response);
                onClose();
            })
            .catch(error => {
                console.error('Error creating transaction:', error);
            });
    }

    return (
        <Modal show={true}>
            <Modal.Header>make a transaction</Modal.Header>
            <Modal.Body>
                <div className="space-y-10 p-10">
                    <div className="dropdown">
                        <div className="dropdown-selected" onClick={() => setIsOpen(true)}>
                            {selectedUser ? selectedUser.name : "Select a user"}
                        </div>
                        <div className="dropdown-content" style={{ display: isOpen ? "block" : "none" }}>
                            {filteredUsers.length > 0 ? (
                                <ul>
                                    {filteredUsers.map((user, index) => (
                                        <li key={index} onClick={() => handleSelectUser(user)}>
                                            {user.name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div>No matching users</div>
                            )}
                        </div>
                    </div>
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                    <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
                        <option value="">Select client type</option>
                        <option value="BUY">BUY</option>
                        <option value="RENT">RENT</option>
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleTransaction}>OK</Button>
                <Button onClick={onClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}
