// middleware/requestId.js
const requestIdMiddleware = (req, res, next) => {
  // take the incoming x-request-id or generate one
  const requestId = req.headers["x-request-id"] || "unknown";

  // add it to response headers
  res.setHeader("x-request-id", requestId);

  // optionally store it for logging
  res.locals.requestId = requestId;

  next();
};

export default requestIdMiddleware;
