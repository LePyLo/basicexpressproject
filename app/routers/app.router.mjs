import express from "express"
const router = express.Router();
import appController from '../controllers/app.controller.mjs'

router.get("/",appController.index);
router.get("/about",appController.info);

export default router;