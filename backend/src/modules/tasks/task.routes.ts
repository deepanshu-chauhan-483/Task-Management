import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import * as controller from "./task.controller";

const router = Router();

router.use(authenticate);

router.get("/", controller.getTasks);
router.post("/", controller.createTask);
router.get("/:id", controller.getTask);
router.patch("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);
router.patch("/:id/toggle", controller.toggleTask);

export default router;
