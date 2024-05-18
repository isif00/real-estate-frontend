/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import axios from "axios";

export function BuyPopup({ onClose, id }) {
  const baseUrl = import.meta.env.VITE_HOST_URL;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [price, setPrice] = useState("");
  const [transactionType, setTransactionType] = useState("");

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/client/all`)
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, [baseUrl]);

  const userNamesWithIds = clients.map(({ id, name }) => ({ id, name }));

  const filteredUsers = userNamesWithIds.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectUser = (user) => {
    console.log("Selected user:", user);
    setSelectedUser(user);
    setIsOpen(false);
  };

  const handleTransaction = () => {
    if (!selectedUser || !transactionType || !price) {
      alert("Please fill all the fields.");
      return;
    }

    
    const newTransaction = {
      realEstateId: id,
      buyerId: selectedUser.id,
      transactionType,
      transactionFee: price,
    };

    axios
      .post(`${baseUrl}/api/v1/transaction/add`, newTransaction)
      .then((response) => {
        console.log("Transaction Created", response);
        handleAddTransactionToClient(response.data.id);
        onClose();
      })
      .catch((error) => {
        console.error("Error creating transaction:", error);
      });
  };

  const handleAddTransactionToClient = () => {
    console.log("Adding transaction to client");
    console.log("----->", id);
    axios.put(`${baseUrl}/api/v1/client/add-transaction/${selectedUser.id}`, {
      transactionId: id,
    });
    console.log("Transaction added to client");
  }

  return (
    <Modal show={true} onClose={onClose}>
      <Modal.Header>Make a Transaction</Modal.Header>
      <Modal.Body>
        <div className="space-y-6 p-6">
          <div className="relative">
            <div
              className="bg-white border rounded-md p-2 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {selectedUser ? selectedUser.name : "Select a user"}
            </div>
            {isOpen && (
              <div className="absolute mt-1 w-full bg-white border rounded-md z-10">
                <input
                  type="text"
                  placeholder="Type to search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border-b rounded-md z-10"
                  onClick={(e) => e.stopPropagation()}
                />
                {filteredUsers.length > 0 ? (
                  <ul className="max-h-48 overflow-y-auto">
                    {filteredUsers.map((user) => (
                      <li
                        key={user.id}
                        onClick={() => handleSelectUser(user)}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {user.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-2 text-gray-500">No matching users</div>
                )}
              </div>
            )}
          </div>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="w-full p-2 border rounded-md"
          />
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select transaction type</option>
            <option value="BUY">BUY</option>
            <option value="RENT">RENT</option>
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="text-black" onClick={handleTransaction}>
          OK
        </Button>
        <Button className="text-black" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
