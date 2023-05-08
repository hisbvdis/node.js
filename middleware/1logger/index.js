// ===========================================================================
// 1. IMPORT
// ===========================================================================
import express from "express";
import { logger } from "./logger.js";



// ===========================================================================
// 2. EXPRESS APPLICATION
// ===========================================================================
// 2.1. Create and config app
const app = express();
app.listen(3000);

// 2.2. Use "logger" middleware for all requests
app.use(logger);
