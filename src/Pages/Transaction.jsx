import React, {useState, useEffect} from 'react'
import { List, Table } from "flowbite-react";
import axios from 'axios'
import "./Client.css"



function Transaction() {
  const baseUrl = import.meta.env.VITE_HOST_URL;
  const [transactions, setTransactions] = useState([]);
  const [buyerNames, setBuyerNames] = useState({});

  useEffect(() => {
    axios.get(`${baseUrl}/api/v1/transaction/all`)
      .then(response => {
        setTransactions(response.data);
        console.log(response.data);
        const buyerIds = [...new Set(response.data.map(transaction => transaction.buyerId))];
        buyerIds.forEach(buyerId => {
          axios.get(`${baseUrl}/api/v1/client/get-client/${buyerId}`)
            .then(response => {
              setBuyerNames(prevState => ({
                ...prevState,
                [buyerId]: response.data.name
              }));
            })
            .catch(error => {
              console.error('Error fetching buyer name:', error);
            });
        });
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  }, []);

  return (
    <div className="transaction-container">
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Transaction Id</Table.HeadCell>
            <Table.HeadCell>Buyer</Table.HeadCell>
            <Table.HeadCell>RealEstate</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Print</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {transactions.map(transaction => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={transaction.id}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{transaction.id}</Table.Cell>
                <Table.Cell>{buyerNames[transaction.buyerId]}</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell>{transaction.transactionFee}</Table.Cell>
                <Table.Cell>{transaction.transactionType}</Table.Cell>
                <Table.Cell>
                  <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    Print
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default Transaction;
