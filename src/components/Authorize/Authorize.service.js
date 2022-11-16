import jwt from 'jsonwebtoken';
import { errorMessage } from '../../utils/error.js';

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

let refreshTokens = [];

function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_SECRET_KEY, { expiresIn: '20s' });
}

export async function getAccessTokenService(username, password, role) {
  try {
    if (username !== 'admin' && password !== 'admin') {
      return errorMessage(406, 'Wrong Username or Password!');
    }

    const user = { username, password, role };

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, REFRESH_SECRET_KEY);
    refreshTokens.push(refreshToken);

    return { accessToken, refreshToken };
  } catch (error) {
    return errorMessage(500, error.toString());
  }
}

export async function createNewTokenService(refreshToken) {
  try {
    if (!refreshToken) return errorMessage(401, 'Unauthorize!');
    if (!refreshTokens.includes(refreshToken)) return errorMessage(403, 'Forbidden Access!');

    const user = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
    const accessToken = generateAccessToken(user);

    return accessToken;
  } catch (error) {
    return errorMessage(500, error.toString());
  }
}

export async function removeRefreshTokenService(token) {
  try {
    refreshTokens = refreshTokens.filter((thisToken) => thisToken !== token);

    return true;
  } catch (error) {
    return errorMessage(500, error.toString());
  }
}
