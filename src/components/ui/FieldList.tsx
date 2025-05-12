import { addToastQueue } from "@/components/ui/GlobalToastRegion";
import type { ReactNode } from "react";
import { useListData } from "react-stately";

interface BaseItem {
  id: string | number | null;
  _destroy?: boolean | undefined;
}

type WithIndex<T extends BaseItem> = T & { index: number };

interface UseFieldListProps<T extends BaseItem> {
  items: T[];
  initialSelectedKeys?: string[];
  min?: number;
  max?: number;
}

export function useFieldList<T extends BaseItem>(props: UseFieldListProps<T>) {
  const itemsWithIndex: WithIndex<T>[] = props.items.map((item, index) => ({
    ...item,
    index,
  }));

  const list = useListData<WithIndex<T>>({
    initialItems: itemsWithIndex,
    initialSelectedKeys: props.initialSelectedKeys ?? [],
    getKey: (item) => item.index,
  });

  const activeItems = list.items.filter((item) => !item._destroy);

  const canAppend =
    activeItems.length < (props.max ?? Number.POSITIVE_INFINITY);
  const append = (item: T) => {
    if (!canAppend) {
      addToastQueue({
        message: `最大${props.max}個までです`,
        status: "error",
      });
      return;
    }
    list.append({ ...item, index: list.items.length });
  };

  const canRemove = activeItems.length > (props.min ?? 0);
  const remove = (index: number) => {
    if (!canRemove) {
      addToastQueue({
        message: `最小${props.min}個は必要です`,
        status: "error",
      });
      return;
    }
    const item = list.getItem(index);
    if (!item) return;
    list.update(index, { ...item, _destroy: true });
  };

  return {
    list,
    append,
    remove,
    canAppend,
    canRemove,
    FieldList,
  };
}

interface FieldListProps<T extends BaseItem & { index: number }> {
  name: string;
  items: T[];
  children: (item: T) => ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function FieldList<T extends BaseItem & { index: number }>({
  name,
  items,
  children,
  ...props
}: FieldListProps<T>) {
  const destroyItems = items.filter((item) => item._destroy);
  const activeItems = items.filter((item) => !item._destroy);

  return (
    <div>
      {destroyItems.map((item) => (
        <div key={item.index}>
          <BaseFields item={item} name={name} />
        </div>
      ))}
      <div {...props}>
        {activeItems.map((item) => (
          <div key={item.index}>
            <BaseFields item={item} name={name} />
            {children(item)}
          </div>
        ))}
      </div>
    </div>
  );
}

function BaseFields<T extends BaseItem & { index: number }>({
  item,
  name,
}: { item: T; name: string }) {
  return (
    <>
      <input
        type="hidden"
        name={`${name}[${item.index}].id`}
        value={`${item.id}`}
      />
      <input
        type="hidden"
        name={`${name}[${item.index}]._destroy`}
        value={`${item._destroy}`}
      />
    </>
  );
}
