import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "./src/database/db.json");
export const readProduct = () => {
  // console.log(filePath)
  const products = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(products);
  // console.log(products.toString())
};

export const insertProduct = (payLoad: any) => {
    fs.writeFileSync(filePath, JSON.stringify(payLoad))
};
