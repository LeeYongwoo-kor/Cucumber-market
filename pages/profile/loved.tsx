import ItemList from "@components/item-list";
import Layout from "@components/layout";
import { NextPage } from "next";

const Loved: NextPage = () => {
  return (
    <Layout seoTitle="Favorite" title="Favorite" canGoBack>
      <div className="flex flex-col space-y-5 divide-y pb-10">
        <ItemList kind="favs" />
      </div>
    </Layout>
  );
};

export default Loved;
