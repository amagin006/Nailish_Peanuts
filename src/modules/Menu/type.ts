export interface MenuItemType {
  id?: string;
  menuName: string;
  color: string;
  price: string;
}

export interface MenuListItemType extends MenuItemType {
  amount: number;
}

export type ChangeAmountType = "ADD" | "MINUS"
