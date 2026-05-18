import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parsebody";
import { sendResponse } from "../utility/sendResponse";
// res.writeHead(200, { "content-type": "application/json" });
// res.end(
//   JSON.stringify({
//     massage: "This is created successfully",
//     data: newProduct,
//   }),
// );
export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url; // aikhne url e "/" , "/users" ,"/product" aigula aste pare
  const method = req.method; // aikhne method e "GET", "PUT", "POST", "DELETE" aigula aste pare
  const urlParts = url?.split("/");
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
  // console.log('this is the actuial id', id)
  // get all product
  if (method === "GET" && url === "/products") {
    try {
      const products = readProduct(); // ai "readProduct()" er maddhome amra db.json theke product gulo read korbo
      return sendResponse(
        res,
        200,
        true,
        "This is created successfully",
        products,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong", error);
    }
  }
  // get single product
  else if (method === "GET" && id !== null) {
    try {
      const products = readProduct(); // aber aikhne sob product load kore nicci
      const product = products.find((p: IProduct) => p.id === id);
      if (!product) {
        return sendResponse(res, 404, false, "product not found");
      }
      return sendResponse(
        res,
        200,
        true,
        "This is retrived successfully",
        product,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong", error);
    }
  }
  // add a product
  else if (method === "POST" && url === "/products") {
    try {
      const body = await parseBody(req);
      const products = readProduct(); //[{},{},{}] aikhne db.json theke 3 ta product read korece
      const newProduct = {
        id: Date.now(),
        ...body,
      };
      products.push(newProduct); //[{},{},{},{new}] aikhne new product push korece
      insertProduct(products); //aikhne new product soho ager products insert korece
      sendResponse(res, 200, true, "This is created successfully", newProduct); // akdom upore code ta bar bar use hoccilo tai aita use korlam
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong", error);
    }
  }
  // update a product
  else if (method === "PUT" && id !== null) {
    try {
      const body = await parseBody(req);
      const products = readProduct();
      const index = products.findIndex((p: IProduct) => p.id === id);
      if (index < 0) {
        return sendResponse(res, 404, false, "Product Not Found");
      }
      products[index] = { id: products[index].id, ...body };
      insertProduct(products);
      return sendResponse(
        res,
        200,
        true,
        "Product Updated successfully!!",
        products[index],
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong", error);
    }
  }
  // delete a product
  else if (method === "DELETE" && id !== null) {
    try {
      const products = readProduct();
      const index = products.findIndex((p: IProduct) => p.id === id);
      if (index < 0) {
        return sendResponse(res, 404, false, "Product Not Found");
      }
      // const arr=[1,2,3,4]
      // arr.splice(2,1) -> 3 removed
      products.splice(index, 1);
      insertProduct(products);
      return sendResponse(res, 200, true, "Product Deleted successfully!!");
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong", error);
    }
  }
};
