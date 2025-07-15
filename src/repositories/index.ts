import { UserRepository } from "./UserRepository";
import { MongoDbUserRepository } from "./MongoDbUserRepository";

import { CardRepository } from "./CardRepository";
import { MongoDbCardRepository } from "./MongoDbCardRepository";

export const userRepository: UserRepository = new MongoDbUserRepository();
export type { UserRepository };

export const cardRepository: CardRepository = new MongoDbCardRepository();
export type { CardRepository };
