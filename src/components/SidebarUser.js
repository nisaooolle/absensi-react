import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightFromBracket,
  faBusinessTime,
  faClock,
  faCube,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <a
              href="/user/dashboard"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                icon={faCube}
              />
              <span className="ms-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="/user/history_absen"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                icon={faClock}
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Absen</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                icon={faCalendarDays}
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Cuti</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                icon={faBusinessTime}
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Lembur</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                icon={faArrowRightFromBracket}
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
