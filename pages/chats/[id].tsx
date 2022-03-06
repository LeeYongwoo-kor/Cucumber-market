import type { NextPage } from "next";

const ChatDetail: NextPage = () => {
  return (
    <div className="space-y-4 py-10 px-4">
      <div className="flex items-start space-x-2">
        <div className="aspect-square w-8 rounded-full bg-slate-400" />
        <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
          <p>Hi how much are you selling them for?</p>
        </div>
      </div>
      <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
        <div className="aspect-square w-8 rounded-full bg-slate-400" />
        <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
          <p>I want $20,000</p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <div className="aspect-square w-8 rounded-full bg-slate-400" />
        <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
          <p>sibalnoma</p>
        </div>
      </div>
      <div className="fixed bottom-4 mx-auto w-full max-w-md">
        <div className="relative flex items-center">
          <input
            type="text"
            className="w-full rounded-full border-gray-300 shadow-sm focus:border-green-600 focus:outline-none focus:ring-green-600"
          />
          <div className="absolute inset-y-0 right-1 flex py-1.5 pr-1.5">
            <button className="flex select-none items-center rounded-full bg-green-600 px-3 text-sm text-white hover:bg-green-700">
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
