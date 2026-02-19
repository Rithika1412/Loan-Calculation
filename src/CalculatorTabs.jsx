import { NavLink } from "react-router-dom";

const tabs = [
  { name: "Borrowing  Calculator", path: "/borrowing" },
  { name: "Repayment Calculator", path: "/repayment" },
  { name: "Stamp duty Calculator", path: "/stamp" },
  { name: "Refinance Calculator", path: "/refinance" },
];

export default function CalculatorTabs() {
  return (
    <div className="border border-gray-300 flex w-full">
      {tabs.map((tab) => (
        <NavLink
          key={tab.name}
          to={tab.path}
          className={({ isActive }) =>
            `flex-1 text-center py-3 font-medium border-r last:border-r-0
             ${isActive
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-100"
            }`
          }
        >
          {tab.name}
        </NavLink>
      ))}
    </div>
  );
}

