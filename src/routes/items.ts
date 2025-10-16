import { IncomingMessage, ServerResponse } from "http";
import {
  addItem,
  getAllItem,
  getItemById,
  updateItem,
  deleteItem,
  getAllItemsFromAllLists,
} from "../controller/items";

const itemsRoute = async (req: IncomingMessage, res: ServerResponse) => {
  const { url, method } = req;
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      const data = body ? JSON.parse(body) : {};

      // ----- Add item to a shopping list -----
      if (url === "/items" && method === "POST") {
        if (!data.shoppingListId) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({ error: "shoppingListId is required" })
          );
        }
        const newItem = addItem(data);
        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(newItem));
      }

      //get all items
      if (url === "/items" && method === "GET") {
        const items = getAllItemsFromAllLists(); 
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(items));
      }

      // ----- Get all items for a specific shopping list -----
      if (url?.startsWith("/items/") && method === "GET") {
        const parts = url.split("/");
        const shoppingListId = parts[2];
        if (parts.length === 3) {
          // GET all items
          const items = getAllItem(shoppingListId);
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(items));
        } else if (parts.length === 4) {
          // GET single item by ID
          const itemId = parts[3];
          const item = getItemById(shoppingListId, itemId);
          res.writeHead(item ? 200 : 404, {
            "Content-Type": "application/json",
          });
          return res.end(JSON.stringify(item || { error: "Item not found" }));
        }
      }

      // ----- Update item -----
      if (url?.startsWith("/items/") && method === "PUT") {
        const parts = url.split("/");
        const shoppingListId = parts[2];
        const itemId = parts[3];
        const updatedItem = updateItem(shoppingListId, itemId, data);
        res.writeHead(updatedItem ? 200 : 404, {
          "Content-Type": "application/json",
        });
        return res.end(
          JSON.stringify(updatedItem || { error: "Item not found" })
        );
      }

      // ----- Delete item -----
      if (url?.startsWith("/items/") && method === "DELETE") {
        const parts = url.split("/");
        const shoppingListId = parts[2];
        const itemId = parts[3];
        const deleted = deleteItem(shoppingListId, itemId);
        res.writeHead(deleted ? 204 : 404);
        return res.end();
      }

      // ----- 404 for unmatched routes -----
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Route not found" }));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid request or server error" }));
    }
  });
};

export default itemsRoute;
