import {
  MdInsertChartOutlined,
  MdPersonOutline,
  MdOutlineHomeWork,
  MdOutlineHandshake,
  MdCalendarMonth,
} from "react-icons/md";

export default function SideNavBar() {
  return (
    <div className="w-60 h-[100vh]  border-r border-zinc-200 ">
      <div
        className="flex flex-col px-5 pt-8 gap-5 text-xl"
        style={{ color: "white" }}
      >
        <div className="flex">
          <a
            href="/"
            className="flex text-black items-center  hover:text-[#0023FC]  focu:text-[#0023FC]  "
          >
            <MdInsertChartOutlined className="mr-4 " />
            Dashboard
          </a>
        </div>
        <div className="flex">
          <a
            href="/client"
            className="flex text-black items-center  hover:text-[#0023FC]  active:text-[#0023FC]  "
          >
            <MdPersonOutline className=" mr-4" />
            Clients
          </a>
        </div>
        <div className="flex">
          <a
            href="/real-estate"
            className="flex text-black items-center  hover:text-[#0023FC]  active:text-[#0023FC] "
          >
            <MdOutlineHomeWork className="icon mr-4" />
            RealEstates
          </a>
        </div>
        <div className="flex">
          <a
            href="/transaction"
            className="flex text-black items-center  hover:text-[#0023FC]  active:text-[#0023FC] "
          >
            <MdOutlineHandshake className="icon mr-4" />
            Transactions
          </a>
        </div>
        <div className="flex">
          <a
            href="/appointements"
            className="flex text-black items-center  hover:text-[#0023FC]  active:text-[]"
          >
            <MdCalendarMonth className="icon mr-4" />
            Appointements
          </a>
        </div>
      </div>
    </div>
  );
}
