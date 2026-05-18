import { createServer, IncomingMessage, Server } from "http";
import { routeHandler } from "./routes/route";
import config from "./config";

const server: Server = createServer((req: IncomingMessage, res) => {
  // here we have create the server and declare the type"Server"
  // file strucrure valo kore organized korar jonno aikhne code gulo routes/route.ts e diya dise
  /*
    const url = req.url; // aikhne url e "/" , "/users" ,"/product" aigula aste pare
  const method = req.method; // aikhne method e "GET", "PUT", "POST", "DELETE" aigula aste pare
  if (url === "/" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ massage: "This is root route" }));
  }
  else if(url?.startsWith("/products")){
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ massage: "This is products route" }));
  }
  else{
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ massage: "Root not found" }));
  }
  */
  routeHandler(req, res); // routes/route.ts theke aita import korsi  
});

// aikhen server ta listen kortesi
server.listen(config.port, () => {
  console.log("server is ruinning on the port",config.port);
});
