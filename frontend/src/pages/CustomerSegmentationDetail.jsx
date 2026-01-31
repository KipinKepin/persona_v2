import React from "react";
import Layout from "./Layout";
import CustomerInformation from "../components/CustomerInformation";
import RecentTransactions from "../components/RecentTransactions";
import AIRecommendation from "../components/AIRecommendation";

const CustomerSegmentationDetail = () => {
  return (
    <Layout>
      <div />
      <div className="flex flex-col gap-3">
        <CustomerInformation />
        <div className="mt-6 flex flex-col gap-6">
          <AIRecommendation />
          <RecentTransactions />
        </div>
      </div>
    </Layout>
  );
};

export default CustomerSegmentationDetail;
