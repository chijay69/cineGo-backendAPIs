import { AppDataSource } from "../data-source";
import { EntityTarget, Repository } from "typeorm";
import { User } from "../entity/User";

export const userRepository = (entity: EntityTarget<User>): Repository<User> => {
    return AppDataSource.getRepository(entity);
};
