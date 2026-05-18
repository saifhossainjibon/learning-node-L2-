import { ServerResponse } from "http";

export const sendResponse = (
  res: ServerResponse,
  statusCode:number,
  success: boolean,
  massage: string,
  data?: any,
) => {
  const respose = {
    success,
    massage,
    data,
  };
  res.writeHead(statusCode, { "content-type": "application/json" });
  res.end(JSON.stringify(respose));
};
