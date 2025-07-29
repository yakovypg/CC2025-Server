import { Router } from "express";
import asyncHandler from "express-async-handler";

import { userRepository } from "../../infrastructure/data/repositories";
import { UserController } from "../controllers";

const router: Router = Router();
const userController: UserController = new UserController(userRepository);

router.post("/", asyncHandler(userController.addUser));
router.get("/:id", asyncHandler(userController.getUser));

router.patch("/:id/statistics", asyncHandler(userController.updateStatistics));
router.get("/:id/statistics", asyncHandler(userController.getStatistics));

router.patch("/:id/achievements", asyncHandler(userController.updateAchievements));
router.get("/:id/achievements", asyncHandler(userController.getAchievements));

router.delete("/:id/mistakes", asyncHandler(userController.deleteMistakes));
router.post("/:id/mistakes", asyncHandler(userController.addMistakes));
router.get("/:id/mistakes", asyncHandler(userController.getMistakes));

router.post("/:id/answers", asyncHandler(userController.addAnswers));

export default router;
