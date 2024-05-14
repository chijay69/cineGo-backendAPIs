import { AppDataSource } from "../data-source";
import { EntityTarget, Repository } from "typeorm";
import { CreditCard } from "../entity/CreditCard";

export const creditCardRepository = (entity: EntityTarget<CreditCard>): Repository<CreditCard> => {
    return AppDataSource.getRepository(entity);
};
