import { IncomingMessage, ServerResponse } from "http";
import {
  createShoppingList,
  getShoppingListById,
  getAllShoppingList,
  updateShoppingList,
  deleteShoppingList,
} from "../controller/shoppingList";

const shoppingListRoute = async (req: IncomingMessage, res: ServerResponse) => {
  const { url, method } = req;
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      const data = body ? JSON.parse(body) : {};

      // ----- Create list -----
      if (url === "/lists" && method === "POST") {
        const newList = createShoppingList(data);
        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(newList));
      }

      // ----- Get all lists -----
      if (url === "/lists" && method === "GET") {
        const lists = getAllShoppingList();
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(lists));
      }

      // ----- Get list by ID -----
      if (url?.startsWith("/lists/") && method === "GET") {
        const id = url.split("/")[2];
        const list = getShoppingListById(id);
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(list));
      }

      // ----- Update list -----
      if (url?.startsWith("/lists/") && method === "PUT") {
        const id = url.split("/")[2];
        const updatedList = updateShoppingList(id, data);
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(updatedList));
      }

      // ----- Delete list -----
      if (url?.startsWith("/lists/") && method === "DELETE") {
        const id = url.split("/")[2];
        await deleteShoppingList(id);
        res.writeHead(204);
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

export default shoppingListRoute;
