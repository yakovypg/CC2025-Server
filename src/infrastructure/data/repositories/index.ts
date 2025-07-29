import { CardRepository } from "./CardRepository";
import { MongoDbCardRepository } from "./MongoDbCardRepository";
import { MongoDbUserRepository } from "./MongoDbUserRepository";
import { UserRepository } from "./UserRepository";

export const USER_REPOSITORY: UserRepository = new MongoDbUserRepository();
export type { UserRepository };

export const CARD_REPOSITORY: CardRepository = new MongoDbCardRepository();
export type { CardRepository };
