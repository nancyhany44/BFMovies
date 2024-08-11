import axios from 'axios';
import { ValidationError } from 'class-validator';

export const fetchMoviesFromSwapi = async () => {
  try {
    const response = await axios.get('https://swapi.dev/api/films/');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies from SWAPI:', error);
    return [];
  }
};

export const fetchPeopleFromSwapi = async () => {
    try {
      const response = await axios.get('https://swapi.dev/api/people/');
      return response.data.results;
    } catch (error) {
      return [];
    }
  };