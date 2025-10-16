import http, { IncomingMessage, ServerResponse } from "http";
import shoppingListRoute from "./routes/shoppingList";
import itemsRoute from "./routes/items";

const PORT = 3000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith("/lists")) {
    shoppingListRoute(req, res);
  }else if (req.url?.startsWith("/items")) {
    itemsRoute(req, res)
  }else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
