
import { CardRepository } from "./CardRepository";
import { MongoDbCardRepository } from "./MongoDbCardRepository";
import { MongoDbUserRepository } from "./MongoDbUserRepository";
import { UserRepository } from "./UserRepository";

export const userRepository: UserRepository = new MongoDbUserRepository();
export type { UserRepository };

export const cardRepository: CardRepository = new MongoDbCardRepository();
export type { CardRepository };
