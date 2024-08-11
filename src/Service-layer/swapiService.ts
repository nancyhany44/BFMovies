import axios from 'axios';
import { getManager } from 'typeorm';
import { Movie } from '../entities/Movie';
import { People } from '../entities/People';
const SWAPI_BASE_URL = 'https://swapi.dev/api';
import { AppDataSource } from '../data-source';
import { fetchMoviesFromSwapi } from './dbService';
import { fetchPeopleFromSwapi } from './dbService';
/**
 * Fetches a list of all Star Wars films from the SWAPI.
 * @returns {Promise<any[]>} A promise that resolves to an array of films.
 */
export const getAllFilms = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${SWAPI_BASE_URL}/films/`);
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to fetch all films');
  }
};
/** 
* @returns {Promise<any[]>} A promise that resolves to an array of films.
*/
export const getAllPeople = async (): Promise<any[]> => {
    try {
      let allPeople: any[] = [];
      let nextPage = `${SWAPI_BASE_URL}/people/`;
      
      while (nextPage) {
        const response = await axios.get(nextPage);
        allPeople = allPeople.concat(response.data.results);
        nextPage = response.data.next;
      }
      
      return allPeople;
    } catch (error) {
      throw new Error('Failed to fetch all people');
    }
  };

  export const importMoviesFromSwapi = async (): Promise<void> => {
    try {
      const films = await fetchMoviesFromSwapi();
  
      if (!films || films.length === 0) {
        return;
      }
  
      const entityManager = AppDataSource.manager;
  
      for (const film of films) {
        const newMovie = new Movie();
        newMovie.title = film.title;
        newMovie.episode_id = film.episode_id;
        newMovie.description = film.opening_crawl;
        newMovie.director = film.director;
        newMovie.producer = film.producer;
        newMovie.release_date = new Date(film.release_date);
        newMovie.url = film.url;
        newMovie.created = new Date(film.created);
        newMovie.edited = new Date(film.edited);
  
        await entityManager.save(newMovie);
      }
  
    } catch (error) {
      console.error('Error inserting movies into the database:', error);
    }
  };
  export const importPeopleFromSwapi = async (): Promise<void> => {
    try {
      const people = await fetchPeopleFromSwapi();
  
      if (!people || people.length === 0) {
        return;
      }
  
      const entityManager = AppDataSource.manager;
  
      for (const personData of people) {
        // Check if a person with the same URL already exists
        const existingPerson = await entityManager.findOne(People, {
          where: { url: personData.url },
        });
  
        if (existingPerson) {
          continue; // Skip to the next iteration if the person exists
        }
  
        // Create and save new person
        const newPerson = new People();
        newPerson.name = personData.name || 'Unknown';
        newPerson.birth_year = personData.birth_year || 'Unknown';
        newPerson.eye_color = personData.eye_color || 'Unknown';
        newPerson.gender = personData.gender || 'unknown';
        newPerson.hair_color = personData.hair_color || 'Unknown';
        newPerson.height = personData.height || 'Unknown';
        newPerson.mass = personData.mass || 'Unknown';
        newPerson.skin_color = personData.skin_color || 'Unknown';
        newPerson.homeworld = personData.homeworld || 'Unknown';
        newPerson.url = personData.url;
  
        await entityManager.save(newPerson);
      }
  
    } catch (error) {
    }
  };