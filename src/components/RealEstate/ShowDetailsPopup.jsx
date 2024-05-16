import React, { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import axios from 'axios';

export function DetailsPopup({ onClose, ownerId }) {
    const baseUrl = import.meta.env.VITE_HOST_URL;
    const [ownerName, setOwnerName] = useState('');
    const [ownerPhone, setOwnerPhone] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');

    useEffect(() => {
        axios.get(`${baseUrl}/api/v1/client/get-client/${ownerId}`)
            .then(response => {
                setOwnerName(response.data.name);
                setOwnerPhone(response.data.phone);
                setOwnerEmail(response.data.email);
            });
    });

    return (
        <Modal
            show={true}
        >
            <Modal.Header>Real Estate Details</Modal.Header>
            <Modal.Body>
                <div className="space-y-6 p-6">
                    <li className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        <ul>Owner Details: </ul>
                        <ul>Owner Name: {ownerName} </ul>
                        <ul>Owner Phone: {ownerPhone} </ul>
                        <ul>Owner Email: {ownerEmail}</ul>
                    </li>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>OK</Button>
            </Modal.Footer>
        </Modal>
    );
}
