import { Router } from "express";
import asyncHandler from "express-async-handler";

import { CARD_REPOSITORY } from "../../infrastructure/data/repositories";
import { CardController } from "../controllers";

const router: Router = Router();
const cardController: CardController = new CardController(CARD_REPOSITORY);

router.get("/", asyncHandler(cardController.getCards));

export default router;
