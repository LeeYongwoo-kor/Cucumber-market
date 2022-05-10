import ItemList from "@components/item-list";
import Layout from "@components/layout";
import { NextPage } from "next";

const Sold: NextPage = () => {
  return (
    <Layout title="Sales List" canGoBack>
      <div className="flex flex-col space-y-5 divide-y pb-10">
        <ItemList kind="sales" />
      </div>
    </Layout>
  );
};

export default Sold;
