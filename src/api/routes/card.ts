import { Router } from "express";
import asyncHandler from "express-async-handler";

import { cardRepository } from "../../infrastructure/data/repositories";
import { CardController } from "../controllers";

const router = Router();
const cardController = new CardController(cardRepository);

router.get("/", asyncHandler(cardController.getCards));

export default router;
