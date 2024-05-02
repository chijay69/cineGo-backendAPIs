import { AppDataSource } from "../data-source";
import { EntityTarget, Repository } from "typeorm";
import { Movie } from "../entity/Movie";

export const MovieRepository = (entity: EntityTarget<Movie>): Repository<Movie> => {
    return AppDataSource.getRepository(entity);
};
