import { Request, Response } from "express";
import { MovieRepository } from '../../repository/MovieRepository'
import { userRepository } from '../../repository/UserRepository'
import { Movie } from "../../entity/Movie";
import * as cache from "memory-cache";
import { User } from "../../entity/User";

export class MovieController {
  static async getAllMovies(req: Request, res: Response) {
    try {
      let moviesData = cache.get("moviesdata");
      if (!moviesData) {
        console.log("serving from db");
        moviesData = await MovieRepository(Movie).find();
        cache.put("moviesdata", moviesData, 6000);
      } else {
        console.log("serving from cache");
      }

      return res.status(200).json({ moviesData });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getMoviesByUser(req: Request, res: Response) {
    try {
      const { ids } = req.body;
      const user = await userRepository(User).findOne({ where: { id: ids } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      let moviesData = cache.get(`moviesdata_${id}`);
      if (!moviesData) {
        console.log("serving from db");
        let movies = await MovieRepository(Movie).find();
        if (user.type === "freemium") {
          movies = movies.filter(movie => movie.isAllowed);
        }
        cache.put(`moviesdata_${id}`, movies, 6000);
        moviesData = movies;
      } else {
        console.log("serving from cache");
      }
      return res.status(200).json({ moviesData });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async createMovie(req: Request, res: Response) {
    try {
      const { title, description, url, director, year, rating, image, cast } = req.body;
      const movieRepo = MovieRepository(Movie);
      const movie = new Movie();
      movie.title = title || movie.title;
      movie.description = description || movie.description;
      movie.url = url || movie.url;
      movie.director = director || movie.director;
      movie.year = year || movie.year;
      movie.rating = rating || movie.rating;
      movie.image = image || movie.image;
      movie.cast = cast || movie.cast;

      await movieRepo.save(movie);
      return res.status(201).json({ message: "Movie created successfully", movie });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateMovie(req: Request, res: Response) {
    try {
      const { ids } = req.params;
      const { title, description, url, director, year, rating, image, cast } = req.body;
      const movieRepo = MovieRepository(Movie);
      const id = parseInt(ids);
      let movie = await movieRepo.findOne({
        where: {id}
      });

      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      movie.title = title || movie.title;
      movie.description = description || movie.description;
      movie.url = url || movie.url;
      movie.director = director || movie.director;
      movie.year = year || movie.year;
      movie.rating = rating || movie.rating;
      movie.image = image || movie.image;
      movie.cast = cast || movie.cast;

      await movieRepo.save(movie);
      return res.status(200).json({ message: "Movie updated", movie });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteMovie(req: Request, res: Response) {
    try {
      const { ids } = req.params;
      const id = parseInt(ids);
      const movieRepo = MovieRepository(Movie);
      const movie = await movieRepo.findOneOrFail({where:{id}});

      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      await movieRepo.remove(movie);
      return res.status(200).json({ message: "Movie deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
