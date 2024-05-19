/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import "./UpdateClientPopup.css";

function AddClientPopup({ onClose }) {
  const baseUrl = import.meta.env.VITE_HOST_URL;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [clientType, setClientType] = useState("");

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();


  const handleAdding = async () => {
    const newData = {
      name,
      phone,
      email,
      city,
      clientType,
      realEstateIds: [],
      transactionIds: [],
    };
  
    try {
      const createClientResponse = await axios.post(`${baseUrl}/api/v1/client/add`, newData);
      console.log("Client Created", createClientResponse);
      onClose();
  
      const historyResponse = await axios.get(`${baseUrl}/api/v1/history/get-history/66494efb39ef7903ac3a9d05`);
      const history = historyResponse.data;
  
      history.numberOfTransactionsPerMonth[currentMonth] += 1;
  
      const updateHistoryResponse = await axios.put(`${baseUrl}/api/v1/history/update/66494efb39ef7903ac3a9d05`, history);
      console.log("History Updated", updateHistoryResponse);
  
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="popup-container">
      <div className="popup-content">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
        />
        <select
          value={clientType}
          onChange={(e) => setClientType(e.target.value)}
        >
          <option value="">Select client type</option>
          <option value="SELLER">SELLER</option>
          <option value="BUYER">BUYER</option>
          <option value="LANDLORD">LANDLORD</option>
          <option value="TENANT">TENANT</option>
        </select>
        <button onClick={handleAdding}>Add Client</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default AddClientPopup;
