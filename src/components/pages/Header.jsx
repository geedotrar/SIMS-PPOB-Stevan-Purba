import React, { useState } from "react";
import logo from "../../assets/images/Logo.png";
import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const [navbar, setNavbar] = useState(false);

  const location = useLocation();
  if (location.pathname === "/") {
    return null;
  }

  return (
    <div>
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <h2 className="text-2xl text-gray-700 font-bold">
              <div className="flex">
                <img src={logo} alt="logo" />
                <NavLink to="/home">SIMS PPOB</NavLink>
              </div>
            </h2>
          </div>
        </div>
        <div>
          <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"}`}>
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-gray-700 font-bold text-xl">
                <NavLink to="/topUp" activeClassName="selected-link">
                  Topup
                </NavLink>
              </li>
              <li className="text-gray-700 font-bold text-xl">
                <NavLink to="/transaction" activeClassName="selected-link">
                  Transaction
                </NavLink>
              </li>
              <li className="text-gray-700 font-bold text-xl">
                <NavLink to="/akun" activeClassName="selected-link">
                  Akun
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="border-2 border-gray-400 cursor-pointer" />
    </div>
  );
}
