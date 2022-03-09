import { NextPage } from "next";
import Layout from "../../components/layout";

const Chats: NextPage = () => {
  return (
    <Layout hasTabBar title="Chat">
      <div className="divide-y-[1px] py-10">
        <div className="flex items-center space-x-3 px-4 py-3">
          <div className="aspect-square w-12 rounded-full bg-slate-300" />
          <div className="cursor-pointer">
            <p className="text-gray-700">Mr Lee</p>
            <p className="text-sm text-gray-600">
              See you tomorrow in the corner at 2pm!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chats;
