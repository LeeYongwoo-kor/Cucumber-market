import type { NextPage } from "next";

const Create: NextPage = () => {
  return (
    <div className=" space-y-5 py-10 px-4">
      <div>
        <label
          className="mb-1 block text-sm font-medium text-gray-700"
          htmlFor="name"
        >
          Name
        </label>
        <div className="relative flex items-center  rounded-md shadow-sm">
          <input
            id="name"
            type="email"
            className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-600 focus:outline-none focus:ring-green-600"
            required
          />
        </div>
      </div>
      <div>
        <label
          className="mb-1 block text-sm font-medium text-gray-700"
          htmlFor="price"
        >
          Price
        </label>
        <div className="relative flex items-center  rounded-md shadow-sm">
          <div className="pointer-events-none absolute left-0 flex items-center justify-center pl-3">
            <span className="text-sm text-gray-500">$</span>
          </div>
          <input
            id="price"
            className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pl-7 placeholder-gray-400 shadow-sm focus:border-green-600 focus:outline-none focus:ring-green-600"
            type="text"
            placeholder="0.00"
          />
          <div className="pointer-events-none absolute right-0 flex items-center pr-3">
            <span className="text-gray-500">USD</span>
          </div>
        </div>
      </div>
      <div>
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
          rows={4}
        />
      </div>
      <button className=" w-full rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
        Go Live
      </button>
    </div>
  );
};

export default Create;