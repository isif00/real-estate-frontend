import React, { useState, useEffect } from 'react';
import ClientCard from '../components/Client/client';
import AddClientPopup from '../components/Client/AddClientPopup';
import axios from 'axios';
import "./Client.css";

function Client() {
  const hostUrl = import.meta.env.VITE_HOST_URL;

  const [clients, setClients] = useState([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get(`${hostUrl}/api/v1/client/all`)
      .then(response => {
        setClients(response.data);
        console.log(response.data);
      });
  }, [hostUrl]);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.clientType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="page-header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <button
          className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          onClick={() => setShowCreatePopup(true)}
        >
          Add Client
        </button>
        {showCreatePopup && (
          <AddClientPopup onClose={() => setShowCreatePopup(false)} />
        )}
      </div>
      <div className="client-container">
        {filteredClients.map(client => (
          <ClientCard
            id={client.id}
            key={client.id}
            name={client.name}
            phone={client.phone}
            email={client.email}
            city={client.city}
            clientType={client.clientType}
          />
        ))}
      </div>
    </>
  );
}

export default Client;