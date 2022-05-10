import { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import ItemList from "@components/item-list";

const Bought: NextPage = () => {
  return (
    <Layout title="Bought" canGoBack>
      <div className="flex flex-col space-y-5 divide-y  pb-10">
        <ItemList kind="purchases" />
      </div>
    </Layout>
  );
};

export default Bought;
