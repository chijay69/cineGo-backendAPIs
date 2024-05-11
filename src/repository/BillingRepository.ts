import { AppDataSource } from "../data-source";
import { EntityTarget, Repository } from "typeorm";
import { Billing } from "../entity/Billing";

export const BillingRepository = (entity: EntityTarget<Billing>): Repository<Billing> => {
    return AppDataSource.getRepository(entity);
};
