import { Movie } from '../entities/Movie';
import {
    NotFoundError,
    DeletionError,
    ValidationError,
  } from '../errors/Errors';
  export class MovieService {
    static async createMovie(data: Partial<Movie>) {
        try {
          if (!data.title || !data.episode_id || !data.director || !data.producer || !data.release_date) {
            throw new ValidationError('Missing fields');
          }
    
          const movie = Movie.create(data);
          return await movie.save();
        } catch (error) {

          throw error;
        }
      }
      
    static async getMovies() {
      try {
        const movies = await Movie.find();
        // Return an empty array if no movies are found
        if (movies.length === 0) {
          return [];
        }
        return movies;
      } catch (error) {
        throw error;
      }
    }
  
    static async getMovieById(id: string) {
      try {
        const movie = await Movie.findOne({ where: { id } });
        if (!movie) {
          throw new NotFoundError('not found');
        }
        return movie;
      } catch (error) {
        throw error;
      }
    }
  
    static async updateMovie(id: string, data: Partial<Movie>) {
      try {
        const movie = await Movie.findOne({ where: { id }, relations: ['people'] });
        if (!movie) {
          throw new NotFoundError('Not found');
        }
        if (data.id || data.created || data.edited) {
          throw new ValidationError('Invalid');
        }
        Object.assign(movie, data);
        return await movie.save();
      } catch (error) {
        throw error;
      }
    }
  
    static async deleteMovie(id: string) {
      try {
          const movie = await Movie.findOne({ where: { id }, relations: ['people'] });
          if (!movie) {
              throw new NotFoundError('Not found');
          }

          movie.people = []; 
          await movie.save();
          

          await movie.remove();
      } catch (error) {
        if(error instanceof Error){
          throw error;
      }
    }
  }
  }