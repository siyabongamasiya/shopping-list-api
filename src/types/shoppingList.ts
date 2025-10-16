import { Item } from "./items";

export interface ShoppingList {
  id: string;
  title: string;
  items: Item[];
  createdAt: string;
  updatedAt: string;
}


