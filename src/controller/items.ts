import { Item } from "../types/items"

import { items } from "../data/database";

// Add item to a specific shopping list
export const addItem = (item: Item, shoppingListId: string): Item => {
  const now = new Date().toISOString();
  const newItem: Item = {
    ...item,
    id: (Math.random() * 1000000).toFixed(0),
    createdAt: now,
    updatedAt: now,
    purchased: item.purchased || false
  };
  newItem.shoppingListId = shoppingListId;
  items.push(newItem);
  return newItem;
};

// Get all items for a specific shopping list
export const getAllItem = (shoppingListId: string): Item[] => {
  return items.filter(item => item.shoppingListId === shoppingListId);
};

// Get a single item by ID and list ID
export const getItemById = (shoppingListId: string, itemId: string): Item | undefined => {
  return items.find(item => item.id === itemId && item.shoppingListId === shoppingListId);
};

// Update an item
export const updateItem = (shoppingListId: string, itemId: string, updatedItem: Item): Item | undefined => {
  const index = items.findIndex(item => item.id === itemId && item.shoppingListId === shoppingListId);
  if (index === -1) return undefined;

  const now = new Date().toISOString();
  items[index] = {
    ...items[index],
    ...updatedItem,
    updatedAt: now
  };
  return items[index];
};

// Delete an item
export const deleteItem = (shoppingListId: string, itemId: string): boolean => {
  const index = items.findIndex(item => item.id === itemId && item.shoppingListId === shoppingListId);
  if (index === -1) return false;

  items.splice(index, 1);
  return true;
};
