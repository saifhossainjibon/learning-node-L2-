import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parsebody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  //   console.log("Request", req);
  const url = req.url;
  const method = req.method;
  const urlParts = url?.split("/");
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
  // console.log('this is the actuial id', id)
  // console.log(urlParts)
  if (url === "/products" && method === "GET") {
    const products = readProduct();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ massage: "This is products route", data: products }),
    );
  } else if (method === "GET" && id !== null) {
    // get single product
    const products = readProduct();
    const product = products.find((p: IProduct) => p.id === id);
    if (!product) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({ massage: "product not found", data: product }),
      );
    }

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ massage: "This is product route", data: product }),
    );
  } else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);
    const products = readProduct();
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    products.push(newProduct);
    insertProduct(products);
    // console.log("body---", products);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        massage: "This is created successfully",
        data: newProduct,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const products = readProduct();
    const index = products.findIndex((p: IProduct) => p.id === id);
    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          massage: "Product Not Found",
          data: null,
        }),
      );
    }
    // console.log(products[index])
    products[index] = { id: products[index].id, ...body };
    insertProduct(products);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        massage: "Product Updated successfully!!",
        data: products[index],
      }),
    );
  } else if (method === "DELETE" && id !== null) {
    const products = readProduct();
    const index = products.findIndex((p: IProduct) => p.id === id);
    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          massage: "Product Not Found",
          data: null,
        }),
      );
    }
    // const arr=[1,2,3,4]
    // arr.splice(2,1) -> 3 removed
    products.splice(index, 1);
    // console.log(products);
    insertProduct(products);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        massage: "Product Deleted successfully!!",
        data: null,
      }),
    );
  }
};
