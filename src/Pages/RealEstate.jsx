import { useEffect, useState } from "react";
import axios from "axios";
import RealEstateCard from "../components/RealEstate/RealEstate";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

function RealEstate() {
  const baseUrl = import.meta.env.VITE_HOST_URL;

  const [RealEstate, setRealEstate] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`${baseUrl}/api/v1/real-estate/all`).then((response) => {
      setRealEstate(response.data);
      setLoading(false);
      console.log(response.data);
    });
  }, [baseUrl]);

  const filteredRealEstate = RealEstate.filter(
    (realEstate) =>
      realEstate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      realEstate.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      realEstate.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      realEstate.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="py-4 mb-4 w-[1250px] border-b  border-zinc-200 flex items-center">
        <p className=" mx-8 text-3xl ">Real Estate</p>
        <div className=" w-[300px] flex  items-center ">
          <input
            type="text"
            placeholder="Search Real Estate..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-[30px] text-black border p-2 rounded-md"
          />
        </div>
      </div>
      <div className=" flex mx-8 gap-5">
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        {filteredRealEstate.map((realEstate) => (
          <RealEstateCard
            id={realEstate.id}
            key={realEstate.id}
            name={realEstate.name}
            address={realEstate.address}
            city={realEstate.city}
            state={realEstate.state}
            price={realEstate.price}
            description={realEstate.description}
            availibilty={realEstate.availability}
            listingType={realEstate.listingType}
            ownerId={realEstate.ownerId}
          />
        ))}
      </div>
    </div>
  );
}

export default RealEstate;
