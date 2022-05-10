import { ItemWithCount } from "pages";
import useSWR from "swr";
import Item from "./item";

interface ItemListProps {
  kind: "favs" | "sales" | "purchases";
}

interface Record {
  id: number;
  item: ItemWithCount;
}

interface ItemListResponse {
  [key: string]: Record[];
}

export default function ItemList({ kind }: ItemListProps) {
  const { data } = useSWR<ItemListResponse>(`/api/users/me/${kind}`);
  return data ? (
    <>
      {data[kind]?.map((record) => (
        <Item
          id={record.item.id}
          key={record.id}
          title={record.item.name}
          price={record.item.price}
          hearts={record.item._count.favs}
        />
      ))}
    </>
  ) : null;
}
