import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/product.controller";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url; // aikhne url e "/" , "/users" ,"/product" aigula aste pare
  const method = req.method; // aikhne method e "GET", "PUT", "POST", "DELETE" aigula aste pare
  if (url === "/" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ massage: "This is root route" }));
  }
  else if (url?.startsWith("/products")) { // amra to route take sundor kore handle korlam akhon product
    // take sundor kore handle korte hobe karon amra product er vitore giya sob product deakhete pari, single 
    // product deakhte pari, product update korte pari , delete korte pari.. aigula ki sob akta file e korbo??
    // Nah !! akta file e korbo na tar jonno akta product controller create korbo "controller/product.controller.ts"
    productController(req, res); // aikhne "controller/product.controller.ts" theke import korsi
  }
  else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ massage: "Route not found" }));
  }
  // uporer code ta first e server.ts e cilo pore aikhen niya asci better file structure er jonno
};
