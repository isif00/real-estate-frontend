import { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import axios from "axios";
import generatePDF from "../components/Transaction/TransactionTemplate";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function Transaction() {
  const baseUrl = import.meta.env.VITE_HOST_URL;
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/transaction/all`)
      .then((response) => {
        setTransactions(response.data);
        setLoading(false);
      }, [baseUrl]);
  });

  const handlePrintClick = async (transaction) => {
    const buyerName = transaction.realEstate.name;
    const pdfUrl = await generatePDF(transaction, buyerName);
    window.open(pdfUrl, "_blank");
  };

  const handleDelete = (id) => {
    axios
      .delete(`${baseUrl}/api/v1/transaction/delete/${id}`)
      .then((response) => {
        console.log("Delete request successful:", response);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting transaction:", error);
      });
  };

  const filtredTransactions = transactions.filter(
    (transaction) =>
      transaction.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.realEstate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.transactionType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.transactionFee.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="py-4 mb-4 w-[1250px] border-b  border-zinc-200 flex items-center">
        <p className=" mx-8 text-3xl ">Transactions</p>
        <div className=" w-[300px] flex  items-center ">
          <input
            type="text"
            placeholder="Search Transaction..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-[30px] text-black border p-2 rounded-md"
          />
        </div>
      </div>
      <div className="overflow-x-auto ">
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        <div className="flex flex-col gap-5 mx-8">
          <Table>
            <Table.Head className="bg-white border border-zinc-200">
              <Table.HeadCell className="bg-white ">
                Transaction Id
              </Table.HeadCell>
              <Table.HeadCell className="bg-white">Buyer</Table.HeadCell>
              <Table.HeadCell className="bg-white">RealEstate</Table.HeadCell>
              <Table.HeadCell className="bg-white">Price</Table.HeadCell>
              <Table.HeadCell className="bg-white">Type</Table.HeadCell>
              <Table.HeadCell className="bg-white">Action 1</Table.HeadCell>
              <Table.HeadCell className="bg-white">Action 2</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {filtredTransactions.map((transaction) => (
                <Table.Row
                  className="bg-white border border-zinc-200 dark:border-gray-700 dark:bg-gray-800"
                  key={transaction.id}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {transaction.id}
                  </Table.Cell>
                  <Table.Cell>{transaction.client.name}</Table.Cell>
                  <Table.Cell>
                    {transaction.realEstate.name}
                  </Table.Cell>
                  <Table.Cell>{transaction.transactionFee}</Table.Cell>
                  <Table.Cell>{transaction.transactionType}</Table.Cell>
                  <Table.Cell>
                    <button
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => handlePrintClick(transaction)}
                    >
                      Print
                    </button>
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      className="font-medium text-[#c23838] hover:underline dark:text-red-500"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}