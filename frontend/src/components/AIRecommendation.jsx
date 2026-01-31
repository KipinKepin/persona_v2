import React from "react";
import { Sparkles, ThumbsUp, ThumbsDown } from "lucide-react";

const recommendations = [
  {
    id: 1,
    title: "Retirement Plan",
    description:
      "At age 42, Andi is in a prime window to formalize long-term wealth accumulation beyond ad-hoc investing. A retirement plan complements the existing Investment Portfolio by creating disciplined, goal-based contributions to secure future income while balancing leverage exposure.",
  },
  {
    id: 2,
    title: "Mortgage Restructuring",
    description:
      "Given the current mortgage exposure and stable income, restructuring the mortgage tenor could improve monthly cash flow while maintaining long-term asset ownership. This can reduce liquidity pressure without increasing overall risk.",
  },
  {
    id: 3,
    title: "Business Expansion Credit Line",
    description:
      "As a business owner with strong transaction flows, a revolving credit line can support short-term working capital needs. This allows flexibility in managing seasonal cash flow fluctuations without tapping personal savings.",
  },
  //   {
  //     id: 4,
  //     title: "Wealth Diversification Strategy",
  //     description:
  //       "Current investments appear concentrated in a limited number of asset classes. Diversifying into fixed income and alternative instruments can help stabilize portfolio volatility and protect net worth during market downturns.",
  //   },
  //   {
  //     id: 5,
  //     title: "Insurance Coverage Optimization",
  //     description:
  //       "Reviewing existing insurance policies may reveal coverage gaps relative to income and liabilities. Optimized protection ensures business continuity and safeguards family wealth against unexpected events.",
  //   },
  //   {
  //     id: 6,
  //     title: "Structured Investment Plan",
  //     description:
  //       "Transitioning from ad-hoc investments to a structured, periodic investment plan can enhance discipline and reduce timing risk, ensuring more consistent long-term portfolio growth.",
  //   },
];

const AIRecommendation = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Rekomendasi</h3>

        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-600">
          <Sparkles className="w-4 h-4" />
          AI
        </span>
      </div>

      <div className="space-y-4">
        {recommendations.map((item) => (
          <div
            key={item.id}
            className="
              rounded-xl border border-indigo-100
              bg-indigo-50/40 p-6
            "
          >
            <h4 className="font-semibold text-gray-900 mb-3">{item.title}</h4>

            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              {item.description}
            </p>

            <div className="flex gap-4">
              <button
                className="
                  flex items-center gap-2 px-5 py-2
                  rounded-lg bg-green-600 text-white
                  text-sm font-medium hover:bg-green-700 transition cursor-pointer
                "
              >
                <ThumbsUp className="w-4 h-4" />
                Terima
              </button>

              <button
                className="
                  flex items-center gap-2 px-5 py-2
                  rounded-lg border border-red-300
                  text-red-600 text-sm font-medium
                  hover:bg-red-50 transition cursor-pointer
                "
              >
                <ThumbsDown className="w-4 h-4" />
                Tolak
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendation;
