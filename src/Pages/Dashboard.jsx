import { useState } from "react";
import StatCard from "../components/Statistics/StatCard";
import {
  MdPersonOutline,
  MdOutlineHomeWork,
  MdOutlineHandshake,
} from "react-icons/md";
import { Line } from "react-chartjs-2";

function Dashboard() {
  const Data = [
    { id: 1, month: "January", transactions: 10 },
    { id: 2, month: "February", transactions: 20 },
    { id: 3, month: "March", transactions: 30 },
    { id: 4, month: "April", transactions: 40 },
    { id: 5, month: "May", transactions: 50 },
    { id: 6, month: "June", transactions: 60 },
    { id: 7, month: "July", transactions: 70 },
    { id: 8, month: "August", transactions: 80 },
    { id: 9, month: "September", transactions: 90 },
    { id: 10, month: "October", transactions: 100 },
    { id: 11, month: "November", transactions: 110 },
    { id: 12, month: "December", transactions: 120 },
  ];

  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.month),
    datasets: [
      {
        label: "Transactions Per Month",
        data: Data.map((data) => data.transactions),
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  });

  // Generate a unique key to force re-render of Line component
  const [chartKey, setChartKey] = useState(0);

  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="py-4 mb-4 w-full border-b border-zinc-200 flex justify-between items-center">
        <p className="mx-8 text-3xl">Statistics</p>
      </div>
      <div className="flex mx-11 my-3 gap-8 justify-center">
        <StatCard number={99} icon={<MdPersonOutline />} title="Clients" />
        <StatCard
          number={99}
          icon={<MdOutlineHomeWork />}
          title="Real Estates"
        />
        <StatCard
          number={99}
          icon={<MdOutlineHandshake />}
          title="Transaction Made"
        />
      </div>
      <div className="flex justify-center mb-8">
        <div className="w-[1000px] h-[500px]">
          <Line
            key={chartKey} // Add key prop
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Transactions Per Month",
                },
                legend: {
                  display: false,
                },
              },
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
      {/* Button to trigger re-render */}
      <button onClick={() => setChartKey((prevKey) => prevKey + 1)}>
        Render New Chart
      </button>
    </div>
  );
}

export default Dashboard;

// TODO: Implement Dashboard (backend and frontend)
// TODO: update the client transactions (backend and frontend)
// TODO: display the client transactions
// TODO: add the name of the client and the realestate to the transaction
// TODO: update the owner of the realestate when buying (backend and frontend)
// TODO: implement the agents authentifications (backend and frontend)
