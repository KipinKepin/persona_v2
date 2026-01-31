import { useState } from "react";
import Layout from "./Layout";
import Filter from "../components/Filter";
import ListCustomer from "../components/ListCustomer";

const CustomerList = () => {
  return (
    <Layout>
      <div />
      <div className="flex flex-col gap-3">
        <div className="">
          <ListCustomer />
        </div>
      </div>
    </Layout>
  );
};

export default CustomerList;
