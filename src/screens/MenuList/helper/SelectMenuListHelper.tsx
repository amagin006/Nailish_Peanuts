import { MenuItemType, MenuListItemType, ChangeAmountType } from '@src/modules/Menu/type';

// Initialaze amount
export const InitializeItemAmount = (items: MenuItemType[]): MenuListItemType[] => {
  if (!items || !Array.isArray(items)) return [];
  const listItems = items.map(item => {
    return {
      amount: 0,
      ...item,
    };
  });
  return listItems;
};

// change amount of menuItem
export function ChangeItemAmount(
  item: MenuListItemType,
  type: ChangeAmountType,
  currentItems: MenuListItemType[],
): MenuListItemType[] {
  const newItems = currentItems.map(listItem => {
    if (listItem.id === item.id) {
      if (type === 'ADD') {
        return {
          ...listItem,
          amount: listItem.amount + 1,
        };
      } else if (type === 'MINUS' && listItem.amount > 0) {
        return {
          ...listItem,
          amount: listItem.amount - 1,
        };
      }
    }
    return listItem;
  });
  return newItems;
};

// to update SelectMenuList items
export const UpdateMenuList = (items: MenuItemType[], menuItems: MenuListItemType[]): MenuListItemType[] => {
  return items.map(item => {
    const newItem = menuItems.find(currentListItem => currentListItem.id === item.id);
    // if already listed, return previous list item
    if (newItem) {
      return newItem;
    } else {
      // if new item, return amount 0
      return {
        ...item,
        amount: 0,
      };
    }
  });
};

