// ===========================================================================
// 1. IMPORT
// ===========================================================================
// 1.1. "FS" (File System) module — for writing in file
import { open } from "node:fs/promises";
// 1.2. "OS" (Operation system) module
import os from "node:os";



// ===========================================================================
// 2. "LOGGER" MIDDLEWARE
// ===========================================================================
export const logger = async (req, res, next) => {
  // 2.1. Get request and system info
  const now = new Date().toISOString();
  const { method, url } = req;
  const userAgent = req.get("user-agent");
  
  // 2.2. Create data string
  const data = `${now} ${method}: ${url} user-agent: ${userAgent}`;

  // 2.3. Append to file
  const fileHandle = await open("./server.log", "a");
  fileHandle.write(data + os.EOL);

  // 2.4. Pass request to the next handlers
  next();
}
