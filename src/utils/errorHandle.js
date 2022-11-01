export default function (error, req, res, next) {
  const status = error.status || 500;
  const payload = status === 500 ? 'Internal server error' : error.errors || error.message || 'Internal server error';

  if (typeof payload === 'string') {
    res.status(status).send(payload);
  } else {
    res.status(status).json({
      success: false,
      errors: payload
    });
  }
}
