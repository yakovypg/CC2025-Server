import { Router } from "express";

import { CardController } from "../controllers";
import { cardRepository } from "../repositories";

const router = Router();
const cardController = new CardController(cardRepository);

router.get("/", cardController.getCards);

export default router;
