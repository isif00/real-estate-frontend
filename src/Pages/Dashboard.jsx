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

  const [loading, setLoading] = useState(true);

  const seriesData = [
    {
      name: "Transactions",
      data: [28, 29, 33, 36, 32, 32, 33]
    },
    {
      name: "Clients",
      data: [12, 11, 14, 18, 17, 13, 13]
    },
    {
      name: "Real Estates",
      data: [0, 3, 2, 5, 8, 10, 9]
    }
  ];
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
        <div className="w-[1000px] h-[500px]">
          <ApexChart series={seriesData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;