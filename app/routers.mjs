/**
 * Este archivo centraliza todos los enrutamientos
 */

import express from "express"
const router = express.Router();

import appRouter from "./routers/app.router.mjs"

router.use("/",appRouter);

export default router;