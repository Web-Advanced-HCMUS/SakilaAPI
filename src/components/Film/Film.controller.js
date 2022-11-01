import * as FilmService from './Film.service.js';

export async function getAllFilmController(req, res) {
  try {
    const payload = await FilmService.getAllFilmService();

    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}
