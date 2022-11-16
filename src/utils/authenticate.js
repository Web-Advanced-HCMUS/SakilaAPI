import jwt from 'jsonwebtoken';

const { ACCESS_SECRET_KEY } = process.env;

export default function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) return res.status(401).send('Unauthorize!');

  jwt.verify(token, ACCESS_SECRET_KEY, (error, user) => {
    if (error) return res.status(403).send(error.toString());
    req.user = user;
    return next();
  });
}
