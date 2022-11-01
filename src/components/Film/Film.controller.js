import * as FilmService from './Film.service.js';

export async function getAllFilmController(req, res) {
  try {
    const payload = await FilmService.getAllFilmService();

    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getOneFilmByNameController(req, res) {
  try {
    const { name } = req.params;
    const payload = await FilmService.getOneFilmByNameService(name);

    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function addOneFilmController(req, res) {
  try {
    const { body } = req;
    const result = await FilmService.addOneFilmService(body);

    return res.RH.success(result);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function deleteOneByIdController(req, res) {
  try {
    const { id } = req.params;
    const result = await FilmService.deleteOneByIdService(id);

    return res.RH.success(result);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function updateOneByIdController(req, res) {
  try {
    const { body } = req;
    const { id } = req.params;
    const result = await FilmService.updateOneByIdService(id, body);

    return res.RH.success(result);
  } catch (error) {
    return res.RH.error(error);
  }
}
