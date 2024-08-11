// import { Router } from 'express';
// import { getAllFilms } from '../Service-layer/swapiService';
// const router = Router();
// /** 
// *@swagger
// * /api/movies:
// *   get:
// *     summary: Retrieve a list of all Star Wars films
// *     responses:
// *       200:
// *         description: A list of all Star Wars films
// *         content:
// *           application/json:
// *             schema:
// *               type: array
// *               items:
// *                 type: object
// *                 properties:
// *                   title:
// *                     type: string
// *                   episode_id:
// *                     type: integer
// *                   opening_crawl:
// *                     type: string
// *                   director:
// *                     type: string
// *                   producer:
// *                     type: string
// *                   release_date:
// *                     type: string
// */

// router.get('/movies', async (req, res) => {
//     try {
//       const films = await getAllFilms();
//       res.json(films);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch films' });
//     }
//   });

// export default router;

import { Router, Request, Response } from 'express';
import { MovieService } from '../Service-layer/MoviesService';
const router = Router();

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies
 *     responses:
 *       200:
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/Movie'
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const movies = await MovieService.getMovies();
    return res.status(200).json({message:'Sucess'});
  } catch (error) {
    return res.status(500).json({ message: 'Failed' });
  }
});

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/MovieInput'
 *  
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const movie = await MovieService.createMovie(req.body);
    return res.status(201).json({message:'Sucess'});
  } catch (error) {
    return res.status(500).json({ message: 'Failed'});
  }
});

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID
 *     responses:
 *       200:
 *         description: A movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 */
router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id.match(/^[0-9a-fA-F-]{36}$/)) {
    return res.status(400).json({ message: 'Invalid movie ID' });
  }

  try {
    const movie = await MovieService.getMovieById(id);
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ message: 'Failed'});
  }
});

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update a movie by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/MovieInput'
 *     responses:
 *       200:
 *         description: Movie updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 */
router.put('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id.match(/^[0-9a-fA-F-]{36}$/)) {
    return res.status(400).json({ message: 'Invalid' });
  }

  try {
    const movie = await MovieService.updateMovie(id, req.body);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.status(200).json({message:'Sucess'});
  } catch (error) {
    return res.status(500).json({ message: 'Failed' });
  }
});

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id.match(/^[0-9a-fA-F-]{36}$/)) {
      return res.status(400).json({ message: 'Invalid' });
  }

  try {
      await MovieService.deleteMovie(id);
      return res.status(200).send({message:'Sucess'});
  } catch (error) {
      return res.status(500).json({ message: 'Failed' });
  }
});


export default router;
