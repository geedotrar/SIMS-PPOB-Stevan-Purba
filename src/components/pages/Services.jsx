import React from "react";
import { NavLink } from "react-router-dom";

export default function Services({ services }) {
  return (
    <div className="flex space-x-4 my-10 mb-20">
      {services.map((data, index) => (
        <div key={index} className="w-32 h-16">
          <button>
            <NavLink to={`/ServicePayment/${data.service_code}`} state={{ serviceCode: data.service_code, serviceName: data.service_name, serviceIcon: data.service_icon, serviceTarif: data.service_tariff }}>
              <img src={data.service_icon} className="w-full h-full object-cover" />
            </NavLink>
          </button>
          <p className="items-center text-sm text-center">{data.service_name}</p>
        </div>
      ))}
    </div>
  );
}
