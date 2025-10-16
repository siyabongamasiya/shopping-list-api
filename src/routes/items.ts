import { IncomingMessage, ServerResponse } from "http";
import {
  addItem,
  getAllItem,
  getItemById,
  updateItem,
  deleteItem,
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

      // Add item to a shopping list
      if (url?.startsWith("/items") && method === "POST") {
        // Expect body to include shoppingListId
        const shoppingListId = data.shoppingListId;
        const newItem = await addItem(data, shoppingListId);
        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(newItem));
      }

      // Get all items for a specific list
      if (url?.startsWith("/items") && method === "GET") {
        const shoppingListId = url.split("/")[2]; // optional: could be query param
        const items = await getAllItem(shoppingListId);
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(items));
      }

      // Get single item by ID
      if (url?.startsWith("/items/") && method === "GET") {
        const parts = url.split("/");
        const shoppingListId = parts[2];
        const itemId = parts[4];
        const item = await getItemById(shoppingListId, itemId);
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(item));
      }

      // Update item
      if (url?.startsWith("/items/") && method === "PUT") {
        const parts = url.split("/");
        const shoppingListId = parts[2];
        const itemId = parts[4];
        const updatedItem = await updateItem(shoppingListId, itemId, data);
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(updatedItem));
      }

      // Delete item
      if (url?.startsWith("/items/") && method === "DELETE") {
        const parts = url.split("/");
        const shoppingListId = parts[2];
        const itemId = parts[4];
        await deleteItem(shoppingListId, itemId);
        res.writeHead(204);
        return res.end();
      }

      // 404 for unmatched routes
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Route not found" }));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid request or server error" }));
    }
  });
};

export default itemsRoute;
