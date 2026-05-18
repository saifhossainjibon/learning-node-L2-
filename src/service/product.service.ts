import fs from "fs";
import path from "path";
const filePath = path.join(process.cwd(), "./src/database/db.json"); // amder je main directory ta ace and "src/database/db.json"
// je file patha ace saita join dilam,
// aiter maddhome amra main directory ta pabo "process.cwd()" and baki part likhe dilam

export const readProduct = () => {
  const products = fs.readFileSync(filePath, "utf-8");//fs-> file system, ai line er maddhome amra file ta read korbo
  return JSON.parse(products);// JSON.parse kore dilam karon amra "product.contoller.ts" e stringify kore nici
};

export const insertProduct = (payLoad: any) => {
    fs.writeFileSync(filePath, JSON.stringify(payLoad))
};
