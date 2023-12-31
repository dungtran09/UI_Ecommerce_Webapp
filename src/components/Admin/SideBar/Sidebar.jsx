import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import {
  AiOutlineShoppingCart,
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineStock,
} from "react-icons/ai";
import { FiShoppingBag, FiPieChart, FiSettings } from "react-icons/fi";
import { BsFillChatDotsFill } from "react-icons/bs";
import { IoMdContacts } from "react-icons/io";
import { FaBlog } from "react-icons/fa";
import { RiContactsLine, RiStockLine } from "react-icons/ri";
import { GiLouvrePyramid } from "react-icons/gi";
import { useStateContext } from "../../../contexts/ContextProvider";

const SideBar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const links = [
    {
      title: "Dashboard",
      links: [
        {
          name: "ecommerce",
          icon: <FiShoppingBag />,
        },
      ],
    },

    {
      title: "Pages",
      links: [
        {
          name: "orders",
          icon: <AiOutlineShoppingCart />,
        },
        {
          name: "employees",
          icon: <IoMdContacts />,
        },
        {
          name: "customers",
          icon: <RiContactsLine />,
        },
        {
          name: "settings",
          icon: <FiSettings />,
        },
        {
          name: "chat",
          icon: <BsFillChatDotsFill />,
        },
        {
          name: "blogs-control",
          icon: <FaBlog />,
        },
      ],
    },
    {
      title: "Charts",
      links: [
        {
          name: "line",
          icon: <AiOutlineStock />,
        },
        {
          name: "area",
          icon: <AiOutlineAreaChart />,
        },

        {
          name: "bar",
          icon: <AiOutlineBarChart />,
        },
        {
          name: "pie",
          icon: <FiPieChart />,
        },
        {
          name: "financial",
          icon: <RiStockLine />,
        },
        {
          name: "pyramid",
          icon: <GiLouvrePyramid />,
        },
        {
          name: "stacked",
          icon: <AiOutlineBarChart />,
        },
      ],
    },
  ];

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg bg-gray-500 text-white text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  const linksEls = links.map((item, index) => (
    <div className="" key={index}>
      <p className="text-gray-400 mt-4 uppercase">{item.title}</p>
      {item.links.map((link) => (
        <NavLink
          to={`/admin/${link.name}`}
          key={link.name}
          onClick={handleCloseSideBar}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          {link.icon}
          <span className="capitalize">{link.name}</span>
        </NavLink>
      ))}
    </div>
  ));
  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>E-Ecommerce</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">{linksEls}</div>
        </>
      )}
    </div>
  );
};

export default SideBar;
