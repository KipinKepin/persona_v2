import { useState } from "react";

const Filter = () => {
  const sortByOptions = [
    "All Criteria",
    "Name",
    "Description",
    "Customer Count",
  ];
  const sortTypeOptions = ["Ascending", "Descending"];

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("All Criteria");
  const [sortType, setSortType] = useState("Ascending");

  const [openDropdown, setOpenDropdown] = useState(null);
  // openDropdown: "sortBy" | "sortType" | null

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-6">Filters</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        {/* Search */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Search</label>

          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>

            <input
              type="text"
              placeholder="Search segment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full h-11 pl-10 rounded-lg
                border border-gray-300
                focus:outline-none focus:ring-2
                focus:ring-indigo-500
              "
            />
          </div>
        </div>

        {/* Sort By */}
        <div className="flex flex-col gap-2 relative">
          <label className="text-sm font-medium text-gray-600">Sort By</label>

          <button
            onClick={() =>
              setOpenDropdown(openDropdown === "sortBy" ? null : "sortBy")
            }
            className="w-full h-11 px-4 rounded-lg border border-gray-300 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
          >
            <span>{sortBy}</span>
            <span
              className={`transition ${
                openDropdown === "sortBy" ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {openDropdown === "sortBy" && (
            <ul className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {sortByOptions.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      setSortBy(item);
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-indigo-500 hover:text-white rounded-lg cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Sort Type */}
        <div className="flex flex-col gap-2 relative">
          <label className="text-sm font-medium text-gray-600">Sort Type</label>

          <button
            onClick={() =>
              setOpenDropdown(openDropdown === "sortType" ? null : "sortType")
            }
            className="w-full h-11 px-4 rounded-lg border border-gray-300 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
          >
            <span>{sortType}</span>
            <span
              className={`transition ${
                openDropdown === "sortType" ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {openDropdown === "sortType" && (
            <ul className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {sortTypeOptions.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      setSortType(item);
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-indigo-500 hover:text-white rounded-lg cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
