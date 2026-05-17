import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/product.controller";

export const routeHandler =(req: IncomingMessage, res: ServerResponse)=>{
    const method =req.method
    const url =req.url
    if(url==="/" && method==="GET"){
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify({massage: "This is root route"}))
    }
    else if(url?.startsWith('/products') ){
        productController(req,res)
    }
    else{
        res.writeHead(404, {"content-type": "application/json"})
        res.end(JSON.stringify({massage: "Route not found"}))
    }
}