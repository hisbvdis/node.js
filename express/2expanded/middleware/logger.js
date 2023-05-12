import { open } from "node:fs/promises";
import os from "node:os";

export default async (req, res, next) => {
  const now = new Date().toISOString();
  const { method, url } = req;
  const userAgent = req.get("user-agent");
  const data = `${now} ${method}: ${url} user-agent: ${userAgent}`;

  const fileHandle = await open("./server.log", "a");
  fileHandle.write(data + os.EOL);
  fileHandle.close();
  next();
}
