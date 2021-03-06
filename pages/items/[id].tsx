import Button from "@components/button";
import Layout from "@components/layout";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import { Item, User } from "@prisma/client";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import client from "@libs/server/client";

interface ItemWithUser extends Item {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  item: ItemWithUser;
  relatedItems: Item[];
  isLiked: boolean;
}

const ItemDetail: NextPage<ItemDetailResponse> = ({
  item,
  relatedItems,
  isLiked,
}) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/items/${router.query.id}` : null
  );
  const [toggleFav] = useMutation(`/api/items/${router.query.id}`);
  const onFavClick = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...data, isLiked: !data.isLiked }, false);
    toggleFav({});
  };
  if (router.isFallback) {
    return (
      <Layout title="Loading..." seoTitle="Loading...">
        Wait a second!
      </Layout>
    );
  }
  return (
    <Layout seoTitle="Item Detail" canGoBack>
      <div className="px-4 py-4">
        <div className="mb-8">
          <div className="relative  pb-80">
            <Image
              src={`https://imagedelivery.net/aSbksvJjax-AUC7qVnaC4A/${data?.product.image}/public`}
              className="bg-slate-300 object-cover"
              layout="fill"
            />
          </div>
          <div className="flex cursor-pointer items-center space-x-3 border-t border-b py-3">
            <div className="cursor-pointer">
              <p className="text-sm font-medium text-gray-700">
                {item?.user?.name}
              </p>
              <Link href={`/users/profiles/${item?.user?.id}`}>
                <a className="text-xs font-medium text-gray-600">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">{item?.name}</h1>
            <span className="mt-3 text-2xl text-gray-900">${item?.price}</span>
            <p className="my-6 text-base text-gray-700">{item?.description}</p>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="Talk to seller" />
              <button
                onClick={onFavClick}
                className={cls(
                  "flex items-center justify-center p-3",
                  isLiked
                    ? "text-red-300 hover:text-red-500"
                    : "text-gray-500 hover:text-gray-300"
                )}
              >
                {isLiked ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                    )
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className="grid grid-cols-2 gap-4">
            {relatedItems.map((item) => (
              <div key={item.id}>
                <div className="mb-4 h-56 w-full bg-slate-300" />
                <h3 className="-mb-1 text-gray-700">{item.name}</h3>
                <span className="text-xs font-medium text-gray-900">
                  ${item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (!ctx?.params?.id) {
    return {
      props: {},
    };
  }
  const item = await client.item.findUnique({
    where: {
      id: +ctx.params.id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  const terms = item?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  const relatedItems = await client.item.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: item?.id,
        },
      },
    },
  });
  // const isLiked = Boolean(
  //   await client.record.findFirst({
  //     where: {
  //       itemId: item?.id,
  //       userId: user?.id,
  //       recordKind: RecordKind.Fav,
  //     },
  //     select: {
  //       id: true,
  //     },
  //   })
  // );
  const isLiked = false;
  return {
    props: {
      item: JSON.parse(JSON.stringify(item)),
      relatedItems: JSON.parse(JSON.stringify(relatedItems)),
      isLiked,
    },
  };
};

export default ItemDetail;
