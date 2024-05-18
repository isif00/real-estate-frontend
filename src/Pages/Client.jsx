import React, { useState, useEffect } from 'react';
import ClientCard from '../components/Client/client';
import AddClientPopup from '../components/Client/AddClientPopup';
import axios from 'axios';


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
    
    <div className='flex flex-col w-[calc(100vw-200px)]  '>
     <div className='  py-4 mb-4 w-[1250px] border-b  border-zinc-200 flex flex-row justify-between items-center    '>
     <p className=' mx-8 text-3xl '>Clients</p>
     <div className=" w-[300px] flex  items-center ">
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className=" h-[30px] mt-[7px]  text-black"
          />
        </div>
        <div className=" ">
       
       <button
         className="inline-flex items-center mx-8 rounded-[4px]    bg-[#0023FC] px-4 py-2 text-center text-sm font-medium text-white hover:bg-[#221fe6] focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 h-[30px] dark:focus:ring-cyan-800"
         onClick={() => setShowCreatePopup(true)}
       >
         Add Client <span className='ml-2'> +</span> 
       </button>
       {showCreatePopup && (
         <AddClientPopup onClose={() => setShowCreatePopup(false)} />
       )}
     </div>
     </div>
     
      <div className="flex mx-8 gap-5">
        {filteredClients.map(client => (
          <ClientCard
            className="px-4 py-4"
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
    </div>
  );
}

export default Client;