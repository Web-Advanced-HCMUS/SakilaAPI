import * as AuthorizeService from './Authorize.service.js';

export async function getAccessTokenController(req, res) {
  try {
    const { username, password, role } = req.body;
    const token = await AuthorizeService.getAccessTokenService(username, password, role);

    res.RH.success(token);
  } catch (error) {
    res.RH.error(error);
  }
}

export async function createNewTokenController(req, res) {
  try {
    const { refreshToken } = req.body;
    const token = await AuthorizeService.createNewTokenService(refreshToken);

    return res.RH.success(token);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function removeRefreshTokenController(req, res) {
  try {
    const { refreshToken } = req.body;
    const result = await AuthorizeService.removeRefreshTokenService(refreshToken);

    return res.RH.success(result);
  } catch (error) {
    return res.RH.error(error);
  }
}
