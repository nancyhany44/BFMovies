import { Router, Request, Response } from 'express';
import { validate as isUUID } from 'uuid';
import { MovieService } from '../../Service-layer/MoviesService';


const router = Router();
router.post('/', async (req: Request, res: Response) => {
    try {
      const movie = await MovieService.createMovie(req.body);
      return res.status(201).json(movie);
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
          });
    }
  });

router.get('/',async (req:Request, res:Response) => {
    try{
        const movies = await MovieService.getMovies();
        return res.status(200).json(movies);

    }catch(error){
        return res.status(500).json({
            message: 'Error',
          });
    }
    
})

router.get('/:id',async (req:Request, res:Response) => {
    const id = req.params.id;
    if (!isUUID(id)) {
      return res.status(400).json({ message: 'Error' });
    }
    try{
        const movie = await MovieService.getMovieById(id);
        return res.status(200).json(movie);

    }catch(error){
        return res.status(500).json({
            message: 'Error',
          });
    }
    
})

router.put('/:id',async (req:Request, res:Response) => {
    const id = req.params.id;
    if (!isUUID(id)) {
      return res.status(400).json({ message: 'Error' });
    }
    try{
        const movie = await MovieService.updateMovie(id,req.body);
        return res.status(200).json(movie);

    }catch(error){
        return res.status(500).json({
            message: 'Error',
          });
    }
    
})

router.delete('/:id',async (req:Request, res:Response) => {
    const id = req.params.id;
    if (!isUUID(id)) {
      return res.status(400).json({ message: 'Error' });
    }
    try{
        const movie = await MovieService.deleteMovie(id);
        return res.status(204).send()

    }catch(error){
        return res.status(500).json({
            message: 'Error',
          });
    }
    
})
export default router;
