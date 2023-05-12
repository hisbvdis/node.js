// ===========================================================================
// 1. IMPORTS
// ===========================================================================
// 1.1. Express
import express from "express";
// 1.2. Middlewares
import cors from "cors";
import bodyParser from "body-parser";
import loggerMW from "./middleware/logger.js";
import errorMW from "./middleware/error.js";
import globalerrorMW from "./middleware/globalError.js";
import multer from "multer";
// 1.3. Routes
import homeRouter from "./routes/home.js";
import usersRouter from "./routes/users.js";
import loginRouter from "./routes/login.js";
// 1.4. Other
import path from "node:path";
import { fileURLToPath } from 'url';



// ===========================================================================
// 2. PREPARING
// ===========================================================================
export const rootPath = path.dirname(fileURLToPath(import.meta.url));
const dirPath = path.dirname(fileURLToPath(import.meta.url));
const staticPath = path.join(dirPath, "public");


// ===========================================================================
// 3. EXPRESS APPLICATION
// ===========================================================================
const app = express();
app.listen(3000, () => console.log(`Server is on http://localhost:3000/`));



// ===========================================================================
// 4. MIDDLEWARES
// ===========================================================================
// 4.1. CORS politics
app.use(cors());
// 4.2. Request body parsers
app.use(bodyParser.json());                       // application/json
app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded
// app.use(multer().none());                         // multipart/form-data
// 4.3. All requests logger
app.use(loggerMW);



// ===========================================================================
// 5. ROUTING
// ===========================================================================
// 5.1. Home
app.use("/", homeRouter);
// 5.2. Users
app.use("/api/users", usersRouter);
// 5.3. Login
app.use("/api/user/login", loginRouter);
// 5.4. Static files path
app.use("/public", express.static(staticPath));



// ===========================================================================
// 6. ERROR MIDDLEWARES  (After routing)
// ===========================================================================
// 6.1. If requests haven't been processed by other handlers, they are considered as errors
app.use(errorMW);
// 6.2. A handler for global errors
app.use(globalerrorMW);
