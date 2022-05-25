import ItemList from "@components/item-list";
import Layout from "@components/layout";
import { NextPage } from "next";

const Bought: NextPage = () => {
  return (
    <Layout seoTitle="Bought" title="Bought" canGoBack>
      <div className="flex flex-col space-y-5 divide-y  pb-10">
        <ItemList kind="purchases" />
      </div>
    </Layout>
  );
};

export default Bought;
