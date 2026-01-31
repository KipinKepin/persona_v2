import { Users } from "lucide-react";
import { NavLink } from "react-router-dom";

const segments = [
  {
    title: "Affluent Multi-Product Active (Deposit + Credit)",
    count: 1,
    description:
      "High-income, urban professionals who actively use multiple retail banking products—typically large deposits and credit usage.",
    criteria:
      "Income_level = High; ≥ 2 product categories (Savings + Credit); at least one sizable deposit.",
  },
  {
    title: "Affluent Borrower–Investor (Wealth + Leverage)",
    count: 1,
    description:
      "High-income customers with complex financial needs demonstrated by investment activity and large borrowing exposure.",
    criteria:
      "Income_level = High; has Investment & Loan transaction; loan ≥ 250,000,000.",
  },
  {
    title: "Single-Product Savers (Deposit-Only)",
    count: 3,
    description:
      "Customers primarily using savings deposits with no evidence of credit, investment, insurance, or loan usage.",
    criteria:
      "Only Deposit transaction_type; product category limited to Savings.",
  },
  {
    title: "Single-Product Savers (Deposit-Only)",
    count: 3,
    description:
      "Customers primarily using savings deposits with no evidence of credit, investment, insurance, or loan usage.",
    criteria:
      "Only Deposit transaction_type; product category limited to Savings.",
  },
  {
    title: "Single-Product Savers (Deposit-Only)",
    count: 3,
    description:
      "Customers primarily using savings deposits with no evidence of credit, investment, insurance, or loan usage.",
    criteria:
      "Only Deposit transaction_type; product category limited to Savings.",
  },
];

function SegmentCard({ title, count, description, criteria }) {
  return (
    <NavLink
      to={"/segment-customers/2"}
      className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-100">
          <Users className="text-indigo-600 w-6 h-6" />
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{count}</p>
          <p className="text-sm text-gray-500">nasabah</p>
        </div>
      </div>

      <h3 className="font-semibold text-gray-900 text-lg mb-2">{title}</h3>

      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{description}</p>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">Kriteria:</p>
        <p className="text-sm text-gray-500 line-clamp-3">{criteria}</p>
      </div>
    </NavLink>
  );
}

export default function ListSegment() {
  return (
    <>
      <p className="text-sm text-gray-500 mb-4">
        Menampilkan {segments.length} dari {segments.length} segmen
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {segments.map((segment, index) => (
          <SegmentCard key={index} {...segment} />
        ))}
      </div>
    </>
  );
}
