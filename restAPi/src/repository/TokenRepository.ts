import { AppDataSource } from "../data-source";
import { EntityTarget, Repository } from "typeorm";
import { Token } from "../entity/Token";

export const TokenRepository = (entity: EntityTarget<Token>): Repository<Token> => {
    return AppDataSource.getRepository(entity);
};
