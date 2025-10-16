import { ShoppingList} from "../types/shoppingList"
import { shoppingLists } from "../data/database";

// Get all shopping lists
export const getAllShoppingList = (): ShoppingList[] => {
  return shoppingLists;
};

// Get a shopping list by ID
export const getShoppingListById = (id: string): ShoppingList | undefined => {
  return shoppingLists.find(list => list.id === id);
};

// Create a new shopping list
export const createShoppingList = (shoppingList: ShoppingList): ShoppingList => {
  const now = new Date().toISOString();
  const newList: ShoppingList = {
    ...shoppingList,
    id: (Math.random() * 1000000).toFixed(0),
    createdAt: now,
    updatedAt: now,
    items: []
  };
  shoppingLists.push(newList);
  return newList;
};

// Update a shopping list
export const updateShoppingList = (id: string, shoppingList: ShoppingList): ShoppingList | undefined => {
  const index = shoppingLists.findIndex(list => list.id === id);
  if (index === -1) return undefined;

  const now = new Date().toISOString();
  shoppingLists[index] = {
    ...shoppingLists[index],
    ...shoppingList,
    updatedAt: now
  };
  return shoppingLists[index];
};

// Delete a shopping list
export const deleteShoppingList = (id: string): boolean => {
  const index = shoppingLists.findIndex(list => list.id === id);
  if (index === -1) return false;

  shoppingLists.splice(index, 1);
  return true;
};
