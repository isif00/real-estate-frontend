import { useState, useEffect } from "react";
import StatCard from "../components/Statistics/StatCard";
import axios from "axios";
import {
  MdPersonOutline,
  MdOutlineHomeWork,
  MdOutlineHandshake,
} from "react-icons/md";

import ApexChart from "../components/charts/ApexChart";

function Dashboard() {
  const baseUrl = import.meta.env.VITE_HOST_URL;
  const [realEstateNumber, setRealEstateNumber] = useState();
  const [clientNumber, setClientNumber] = useState();
  const [transactionNumber, setTransactionNumber] = useState();
  const [seriesData, setSeriesData] = useState([{}]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get(`${baseUrl}/api/v1/client/all`).then((response) => {
      setClientNumber(response.data.length);
      setLoading(false);

    });
  }, [baseUrl]);

  useEffect(() => {
    axios.get(`${baseUrl}/api/v1/transaction/all`).then((response) => {
      setTransactionNumber(response.data.length);
      setLoading(false);
    });
  }, [baseUrl]);

  useEffect(() => {
    axios.get(`${baseUrl}/api/v1/real-estate/all`).then((response) => {
      setRealEstateNumber(response.data.length);
      setLoading(false);

    });
  }, [baseUrl]);

  useEffect(() => {
    axios.get(`${baseUrl}/api/v1/history/all`)
      .then((response) => {
        const transformedData = response.data.map(item => ({
          name: item.operation === "TRANSACTION" ? "Transactions" :
                item.operation === "CLIENT" ? "Clients" :
                item.operation === "REAL_ESTATE" ? "Real Estates" : "Unknown",
          data: item.numberOfTransactionsPerMonth
        }));
        setSeriesData(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching history data:", error);
      });
  }, []);
  
  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="py-4 mb-4 w-full border-b border-zinc-200 flex justify-between items-center">
        <p className="mx-8 text-3xl">Statistics</p>
      </div>
      <div className="flex mx-11 my-3 gap-8 justify-center">
        <StatCard
          loading={loading}
          number={clientNumber}
          icon={<MdPersonOutline />}
          title="Clients"
        />
        <StatCard
          loading={loading}
          number={realEstateNumber}
          icon={<MdOutlineHomeWork />}
          title="Real Estates"
        />
        <StatCard
          loading={loading}
          number={transactionNumber}
          icon={<MdOutlineHandshake />}
          title="Transaction Made"
        />
      </div>
      <div className="flex justify-center mb-8">
        <div className="w-full mx-8 py-8   h-[500px]  border-zinc-400  ">
          <ApexChart series={seriesData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;