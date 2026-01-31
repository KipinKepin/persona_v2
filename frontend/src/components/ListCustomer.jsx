import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../features/customersSlice";
import { useEffect } from "react";

const customers = [
  {
    id: "CIF001",
    name: "Gina Mandasari",
    email: "customer1@bank.com",
    occupation: "Wiraswasta",
  },
  {
    id: "CIF002",
    name: "Jasmin Thamrin",
    email: "customer2@bank.com",
    occupation: "Pengusaha",
  },
  {
    id: "CIF003",
    name: "Maida Iswahyudi, M.M.",
    email: "customer3@bank.com",
    occupation: "Pegawai Swasta",
  },
  {
    id: "CIF004",
    name: "Jasmin Thamrin",
    email: "customer2@bank.com",
    occupation: "Pengusaha",
  },
  {
    id: "CIF005",
    name: "Maida Iswahyudi, M.M.",
    email: "customer3@bank.com",
    occupation: "Pegawai Swasta",
  },
  {
    id: "CIF006",
    name: "Jasmin Thamrin",
    email: "customer2@bank.com",
    occupation: "Pengusaha",
  },
  {
    id: "CIF007",
    name: "Maida Iswahyudi, M.M.",
    email: "customer3@bank.com",
    occupation: "Pegawai Swasta",
  },
];

export default function ListCustomer() {
  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter((c) =>
    `${c.name} ${c.id} ${c.occupation}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const { custo } = useSelector((state) => state.customers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  console.log(custo);

  return (
    <div className="bg-white rounded-xl shadow p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">
        Affluent Borrower–Investor (Wealth + Leverage)
      </h1>

      <p className="text-gray-600 max-w-4xl mb-5">
        High-income customers with complex financial needs demonstrated by
        investment activity and large borrowing exposure (e.g., mortgage or
        business loans). Suitable for relationship-managed offerings.
      </p>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium">
        {filteredCustomers.length} Nasabah
      </div>

      {/* Search */}
      <div className="relative max-w-xl mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Cari nasabah berdasarkan nama, CIF, pekerjaan, atau lokasi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full h-11 pl-10 pr-4 rounded-lg
            border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
        />
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Menampilkan {filteredCustomers.length} dari {customers.length} nasabah
      </p>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600">
              <th className="px-6 py-4 font-medium">Customer ID</th>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Occupation</th>
              <th className="px-6 py-4 font-medium text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((cust) => (
              <tr
                key={cust.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{cust.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {cust.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{cust.email}</td>
                <td className="px-6 py-4">{cust.occupation}</td>
                <td className="px-6 py-4 text-right">
                  <NavLink
                    to={`/segment-customers/${cust.id}/detail`}
                    className="
                      inline-flex items-center justify-center
                      px-4 py-2 rounded-md
                      bg-[#00DDD8]/80 text-white text-xs font-medium
                      hover:bg-[#00DDD8] transition
                    "
                  >
                    View Detail
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
