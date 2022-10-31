import * as ActorService from './Actor.service.js';

export async function getListAllController(req, res) {
  try {
    const payload = await ActorService.getListAllService();

    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function findOneByIdController(req, res) {
  try {
    const { id } = req.params;
    const result = await ActorService.findOneByIdService(id);

    return res.RH.success(result);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function addActorController(req, res) {
  try {
    const { body } = req;
    const result = await ActorService.addActorService(body);

    return res.RH.success(result);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function deleteOneActorController(req, res) {
  try {
    const { id } = req.params;
    const result = await ActorService.deleteOneActorService(id);

    return res.RH.success(result);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function updateOneActorController(req, res) {
  try {
    const { body } = req;
    const result = await ActorService.updateOneActorService(body);

    return res.RH.success(result);
  } catch (error) {
    return res.RH.error(error);
  }
}
