import { HiChartPie, HiUser, HiViewBoards } from "react-icons/hi";
import { FaHouse } from "react-icons/fa6";

import "./SideNavBar.css";

{/* <div className="flexs">
    <div className="flex">
        <a href="/" className="flex text-white items-center">
            <HiChartPie className="icon mr-4" />
            Dashboard
        </a>
    </div>
    <div className="flex">
        <a href="/client" className="flex text-white items-center">
            <HiUser className="icon mr-4" />
            Clients
        </a>
    </div>
    <div className="flex">
        <a href="/real-estate" className="flex text-white items-center">
            <FaHouse className="icon mr-4" />
            RealEstates
        </a>
    </div>
    <div className="flex">
        <a href="/transaction" className="flex text-white items-center">
            <HiViewBoards className="icon mr-4" />
            Transactions
        </a>
    </div>
    <div className="flex">
        <a href="/appointements" className="flex text-white items-center">
            <HiViewBoards className="icon mr-4" />
            Appointements
        </a>
    </div>
</div> */}

export default function SideNavBar() {
    
    return (
        <div className="w-60 h-[100vh]  border-r border-white">
            <div className="flex flex-col px-5 pt-8 gap-5 text-xl" style={{ color: "white" }}>
                <div className="flex">
                    <a href="/" className="flex text-white items-center">
                        <HiChartPie className="icon mr-4" />
                        Dashboard
                    </a>
                </div>
                <div className="flex">
                    <a href="/client" className="flex text-white items-center">
                        <HiUser className="icon mr-4" />
                        Clients
                    </a>
                </div>
                <div className="flex">
                    <a href="/real-estate" className="flex text-white items-center">
                        <FaHouse className="icon mr-4" />
                        RealEstates
                    </a>
                </div>
                <div className="flex">
                    <a href="/transaction" className="flex text-white items-center">
                        <HiViewBoards className="icon mr-4" />
                        Transactions
                    </a>
                </div>
                <div className="flex">
                    <a href="/appointements" className="flex text-white items-center">
                        <HiViewBoards className="icon mr-4" />
                        Appointements
                    </a>
                </div>
            </div>
        </div>

    );
}
