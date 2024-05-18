import React, { useEffect, useState } from "react";
import axios from "axios";
import RealEstateCard from "../components/RealEstate/RealEstate";
import "./Client.css";

function RealEstate() {
  const baseUrl = import.meta.env.VITE_HOST_URL;

  const [RealEstate, setRealEstate] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get(`${baseUrl}/api/v1/real-estate/all`).then((response) => {
      setRealEstate(response.data);
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
    <div className="flex flex-col w-[calc(100vw-200px)] ">
      <div className="  py-4 mb-4 w-[1250px] border-b  border-zinc-200 flex flex-row     ">
        <p className=" mx-8 text-3xl ">Real Estate</p>
        <div className=" w-[300px] flex  items-center ">
          <input
            type="text"
            placeholder="Search Real Estate..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=" h-[30px] ml-16  text-black mt-[5px]"
          />
        </div>
      </div>
      <div className=" flex mx-8 gap-5">
                {filteredRealEstate.map(realEstate => (
                    <RealEstateCard
                        id={realEstate.id}
                        key={realEstate.id}
                        name={realEstate.name}
                        address={realEstate.address}
                        city={realEstate.city}
                        state={realEstate.state}
                        price={realEstate.price}
                        description= {realEstate.description}
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
