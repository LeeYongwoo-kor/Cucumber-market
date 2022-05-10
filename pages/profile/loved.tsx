import { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import ItemList from "@components/item-list";

const Loved: NextPage = () => {
  return (
    <Layout title="Favorite" canGoBack>
      <div className="flex flex-col space-y-5 divide-y pb-10">
        <ItemList kind="favs" />
      </div>
    </Layout>
  );
};

export default Loved;
