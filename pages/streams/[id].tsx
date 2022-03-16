import { NextPage } from "next";
import Layout from "../../components/layout";
import Message from "../../components/message";

const StreamDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="space-y-4 py-10 px-4">
        <div className="aspect-video w-full rounded-md bg-slate-300 shadow-sm" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">Cucumber Phone</h1>
          <span className="mt-3 block text-2xl text-gray-900">$300</span>
          <p className=" my-6 text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
            tenetur? Dolorum voluptate dolorem laborum totam rerum, velit, iste
            dolore perspiciatis praesentium, perferendis voluptates quibusdam
            quam blanditiis. Aperiam aliquid voluptatum harum? Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Quas omnis magnam odio.
            Beatae, assumenda. Provident dignissimos, dolorem iure minima itaque
            natus aspernatur non quia blanditiis sit eveniet? Accusamus, commodi
            libero.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <div className="h-[50vh] space-y-4 overflow-y-scroll py-10 px-4 pb-16">
            <Message message="Hi how much are you selling them for?" />
            <Message message="I want $20,000" reversed />
            <Message message="gesekkiya" />
          </div>
          <div className="fixed inset-x-0 bottom-0 bg-white py-2">
            <div className="relative mx-auto flex w-full items-center">
              <input
                type="text"
                className="w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-green-600 focus:outline-none focus:ring-green-600"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <button className="flex items-center rounded-full bg-green-600 px-3 text-sm text-white hover:bg-green-700">
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
