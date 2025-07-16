import { Router } from "express";

import { UserController } from "../controllers";
import { userRepository } from "../../infrastructure/data/repositories";

const router = Router();
const userController = new UserController(userRepository);

router.post("/", userController.addUser);
router.get("/:id", userController.getUser);

router.patch("/:id/statistics", userController.updateStatistics);
router.get("/:id/statistics", userController.getStatistics);

router.patch("/:id/achievements", userController.updateAchievements);
router.get("/:id/achievements", userController.getAchievements);

router.delete("/:id/mistakes", userController.deleteMistakes);
router.post("/:id/mistakes", userController.addMistakes);
router.get("/:id/mistakes", userController.getMistakes);

router.post("/:id/answers", userController.addAnswers);

export default router;
