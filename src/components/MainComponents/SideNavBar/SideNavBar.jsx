import { HiChartPie, HiUser, HiViewBoards } from "react-icons/hi";
import { FaHouse } from "react-icons/fa6";

import "./SideNavBar.css";

export default function SideNavBar() {
  return (
  <div className="sidebar-container">
      <div aria-label="Default sidebar example" className="sidebar" style={{ color: "white" }}>
          <div className="sidebar-items">
              <div className="sidebar-item">
                  <a href="/" className="text-white">
                      <HiChartPie className="icon" />
                      Dashboard
                  </a>
              </div>
              <div className="sidebar-item">
                  <a href="/client" className="text-white">
                      <HiUser className="icon" />
                      Clients
                  </a>
              </div>
              <div className="sidebar-item">
                  <a href="/real-estate" className="text-white">
                      <FaHouse className="icon" />
                      RealEstates
                  </a>
              </div>
              <div className="sidebar-item">
                  <a href="/transaction" className="text-white">
                      <HiViewBoards className="icon" />
                      Transactions
                  </a>
              </div>
          </div>
      </div>
  </div>

  );
}
